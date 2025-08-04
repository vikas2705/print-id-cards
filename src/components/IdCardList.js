import React, { useState, useCallback, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import Papa from "papaparse";
import JSZip from "jszip";
import * as XLSX from "xlsx";
import "./IdCardList.css";
import IdCard from "./IdCard";
import { openDB } from "idb";
import NewIdCard from "./NewIdCard";
import ClearIcon from "../assets/ClearIcon.svg";
import UploadIcon from "../assets/UploadIcon.svg";
import PrinterIcon from "../assets/PrinterIcon.svg";
import SearchIcon from "./../assets/Search.svg";

// IndexedDB utility functions
const dbPromise = openDB("StudentFilesDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("files")) {
      db.createObjectStore("files");
    }
  },
});

async function storeFileInIndexedDB(file, key) {
  const db = await dbPromise;
  await db.put("files", file, key);
}

async function getFileFromIndexedDB(key) {
  const db = await dbPromise;
  return db.get("files", key);
}

const IdCardList = () => {
  const [students, setStudents] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [excelHeaders, setExcelHeaders] = useState({}); // Map field names to column numbers
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedStudentsForPrint, setSelectedStudentsForPrint] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const componentRef = useRef(null);
  const bulkComponentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const onBeforeGetContentResolveBulk = useRef(null);
  const xlsxInputRef = useRef(null);
  const zipInputRef = useRef(null);
  const [xlsxFileName, setXlsxFileName] = useState("");
  const [zipFileName, setZipFileName] = useState("");
  
  // New state for comprehensive tracking
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState("");
  const [failedCards, setFailedCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFailedCards, setShowFailedCards] = useState(false);
  const [generationStats, setGenerationStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    processing: 0
  });

  useEffect(() => {
    if (
      selectedStudent &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (
      selectedStudentsForPrint &&
      typeof onBeforeGetContentResolveBulk.current === "function"
    ) {
      onBeforeGetContentResolveBulk.current();
    }
  }, [selectedStudentsForPrint]);

  const handleOnBeforeGetContent = useCallback((student) => {
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
    });
  }, []);

  const handleOnBeforeGetContentBulk = useCallback((students) => {
    return new Promise((resolve) => {
      onBeforeGetContentResolveBulk.current = resolve;
    });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: selectedStudent?.Name,
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: () => {
      onBeforeGetContentResolve.current = null;
      setSelectedStudent(null);
    },
    pageStyle: `@media print {
      @page {
        size: 7cm 4.22cm;
        margin: 0;
      }
    }`,
  });

  // Utility function to truncate file names
  const truncateFileName = (name, maxLength = 22) => {
    if (!name) return "";
    return name.length > maxLength
      ? name.slice(0, maxLength - 3) + "..."
      : name;
  };

  // Function to validate and analyze card generation
  const analyzeCardGeneration = (studentData, headers = {}) => {
    const failed = [];
    const successful = [];
    
    // Helper function to get column info for an issue
    const getColumnInfo = (fieldName) => {
      const columnNum = headers[fieldName];
      return columnNum ? ` (Column ${columnNum})` : '';
    };
    
    studentData.forEach((student, index) => {
      const issues = [];
      
      // Check required fields
      if (!student.Name || student.Name.trim() === "") {
        issues.push(`Missing student name${getColumnInfo('Name')}`);
      }
      
      if (!student["Form Number"] && !student.formNumber) {
        const formNumberCol = getColumnInfo('Form Number') || getColumnInfo('formNumber');
        issues.push(`Missing form/registration number${formNumberCol}`);
      }
      
      if (!student.photo) {
        issues.push("Missing photo (from ZIP file)");
      }
      
      if (!student.sign) {
        issues.push("Missing signature (from ZIP file)");
      }
      
      // Check optional but important fields
      if (!student.father_name || student.father_name.trim() === "") {
        issues.push(`Missing father's name${getColumnInfo('father_name')}`);
      }
      
      if (!student.dob || student.dob.trim() === "") {
        issues.push(`Missing date of birth${getColumnInfo('dob')}`);
      }
      
      if (!student.programName || student.programName.trim() === "") {
        issues.push(`Missing program name${getColumnInfo('programName')}`);
      }
      
      if (issues.length > 0) {
        failed.push({
          id: student["Form Number"] || student.formNumber || `row-${index + 1}`,
          name: student.Name || "Unknown",
          formNumber: student["Form Number"] || student.formNumber || "N/A",
          rowNumber: index + 2, // Excel row number (accounting for header row)
          issues: issues,
          studentData: student
        });
      } else {
        successful.push(student);
      }
    });
    
    return { failed, successful };
  };

  const handleXlsxUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      
      // Get the range of the sheet
      const range = XLSX.utils.decode_range(sheet['!ref']);
      
      // Create header mapping to column numbers
      const headerMap = {};
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // First row
        const cell = sheet[cellAddress];
        if (cell && cell.v) {
          headerMap[cell.v] = col + 1; // Column numbers are 1-based for user display
        }
      }
      
      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);
      setExcelHeaders(headerMap);
      setXlsxFileName(file.name);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleZipUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || excelData.length === 0) {
      setError("Please upload the Excel file first.");
      return;
    }
    
    setLoading(true);
    setIsProcessing(true);
    setError(null);
    setZipFileName(file.name);
    setProcessingProgress(0);
    setProcessingStatus("Loading ZIP file...");
    
    try {
      const zip = await JSZip.loadAsync(file);
      setProcessingProgress(10);
      setProcessingStatus("Extracting files...");
      
      let csvData = [];
      const photos = {};
      const signs = {};
      const zipFileEntries = Object.keys(zip.files);
      let processedFiles = 0;
      
      setProcessingStatus("Processing images and data...");
      
      await Promise.all(
        zipFileEntries.map(async (filename) => {
          const fileEntry = zip.files[filename];
          if (filename.startsWith("__MACOSX/")) return;
          
          if (filename.endsWith(".csv")) {
            const text = await fileEntry.async("text");
            const parsed = Papa.parse(text, { header: true }).data;
            csvData = parsed;
          }
          
          // Match any path containing /photo/ and ending with _photo.jpg or _photo.jpeg
          const photoMatch = filename.match(/\/photo\/(.*?)_photo\.(jpg|jpeg)$/i);
          if (photoMatch) {
            const formNumber = photoMatch[1];
            const blob = await fileEntry.async("blob");
            await storeFileInIndexedDB(blob, filename);
            const base64 = await fileEntry.async("base64");
            photos[formNumber] = `data:image/jpeg;base64,${base64}`;
          }
          
          // Match any path containing /signature/ and ending with _sign.jpg or _sign.jpeg
          const signMatch = filename.match(
            /\/signature\/(.*?)_sign\.(jpg|jpeg)$/i
          );
          if (signMatch) {
            const formNumber = signMatch[1];
            const blob = await fileEntry.async("blob");
            await storeFileInIndexedDB(blob, filename);
            const base64 = await fileEntry.async("base64");
            signs[formNumber] = `data:image/jpeg;base64,${base64}`;
          }
          
          processedFiles++;
          const progress = 10 + (processedFiles / zipFileEntries.length) * 50;
          setProcessingProgress(Math.min(progress, 60));
        })
      );
      
      setProcessingProgress(70);
      setProcessingStatus("Combining data sources...");
      
      // After parsing, store all student data (including photo and sign as base64) in React state
      const combined = csvData.map((csvRow, index) => {
        const formNumber = csvRow["Form Number"];
        // Find the matching row in the Excel data
        const xlsxMatch = excelData.find(
          (row) => row["FORM NUMBER"] === formNumber
        );
        
        
        // Extract required fields from the Excel row
        const permanent_address_line1 = xlsxMatch?.["PERMANENT ADDRESS LINE 1"] || "";
        const permanent_address_line2 = xlsxMatch?.["PERMANENT ADDRESS LINE 2"] || "";
        const permanent_address_city = xlsxMatch?.["PERMANENT CITY"] || "";
        const permanent_address_state = xlsxMatch?.["PERMANENT STATE"] || "";
        const permanent_address_pincode = xlsxMatch?.["PERMANENT PINCODE"] || "";
        const correspondence_address_line1 =
          xlsxMatch?.["ADD LINE 1"] || "";
        const correspondence_address_line2 =
          xlsxMatch?.["ADD LINE 2"] || "";
        const correspondence_address_city = xlsxMatch?.["CITY"] || "";
        const correspondence_address_state = xlsxMatch?.["STATE"] || "";
        const correspondence_address_pincode = xlsxMatch?.["PINCODE"] || "";
        const mobile = xlsxMatch?.["MOBILE"] || "";
        const email = xlsxMatch?.["EMAIL"] || "";
        const admission_date = xlsxMatch?.["ADMISSION GRANTED DATE"] || "";
        const father_name = xlsxMatch?.["NAME OF FATHER"] || "";
        
        // Combine DOB fields
        let dob = "";
        if (
          xlsxMatch &&
          xlsxMatch["DOB DAY"] &&
          xlsxMatch["DOB MONTH"] &&
          xlsxMatch["DOB YEAR"]
        ) {
          const day = String(xlsxMatch["DOB DAY"]).padStart(2, "0");
          const month = String(xlsxMatch["DOB MONTH"]).padStart(2, "0");
          const year = String(xlsxMatch["DOB YEAR"]);
          dob = `${day}-${month}-${year}`;
        }
        const programName = xlsxMatch?.["PROGRAMME NAME"] || "";
        
        const progress = 70 + ((index + 1) / csvData.length) * 20;
        setProcessingProgress(Math.min(progress, 90));

        const permanent_address = `${permanent_address_line1} ${permanent_address_city} ${permanent_address_state} ${permanent_address_pincode}`;
        const correspondence_address = `${correspondence_address_line1} ${correspondence_address_city} ${correspondence_address_state} ${correspondence_address_pincode}`;
        console.log({permanent_address})
        return {
          formNumber,
          ...xlsxMatch,
          ...csvRow,
          permanent_address,
          correspondence_address,
          mobile,
          email,
          admission_date,
          father_name,
          dob,
          programName,
          photo: photos[formNumber] || null,
          sign: signs[formNumber] || null,
        };
      });
      
      setProcessingProgress(95);
      setProcessingStatus("Analyzing card generation...");
      
      // Analyze the combined data
      const analysis = analyzeCardGeneration(combined, excelHeaders);
      
      setStudents(combined);
      setFailedCards(analysis.failed);
      setGenerationStats({
        total: combined.length,
        successful: analysis.successful.length,
        failed: analysis.failed.length,
        processing: 0
      });
      
      setProcessingProgress(100);
      setProcessingStatus("Processing complete!");
      
      // Show completion message
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
        setProcessingStatus("");
      }, 1000);
      
    } catch (error) {
      console.error("Error processing ZIP file:", error);
      setError(`Error processing ZIP file: ${error.message}`);
      setIsProcessing(false);
      setProcessingProgress(0);
      setProcessingStatus("");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total records and generated cards using new stats
  const totalRecords = generationStats.total || students.length;
  const generatedCards = generationStats.successful || students.filter((student) => {
    return student.Name && student.formNumber && student.photo && student.sign;
  }).length;

  const clearData = () => {
    setStudents([]);
    setExcelData([]);
    setExcelHeaders({});
    setXlsxFileName("");
    setZipFileName("");
    setError(null);
    setSelectedCards([]);
    setFailedCards([]);
    setProcessingProgress(0);
    setProcessingStatus("");
    setIsProcessing(false);
    setShowFailedCards(false);
    setGenerationStats({
      total: 0,
      successful: 0,
      failed: 0,
      processing: 0
    });
    if (xlsxInputRef.current) xlsxInputRef.current.value = "";
    if (zipInputRef.current) zipInputRef.current.value = "";
  };

  const handlePrintTrigger = (student) => {
    setSelectedStudent({ ...student });
    handlePrint();
  };

  const handlePrintAll = () => {
    const cardsToPrint =
      selectedCards.length > 0
        ? selectedCards
        : filteredStudents.map((student) => student.formNumber);

    const studentsToPrint = students.filter((student) =>
      cardsToPrint.includes(student.formNumber)
    );

    setSelectedStudentsForPrint(studentsToPrint);
    handlePrintAllCards();
  };

  const handlePrintAllCards = useReactToPrint({
    content: () => bulkComponentRef.current,
    documentTitle: "ID Cards - Bulk Print",
    onBeforeGetContent: handleOnBeforeGetContentBulk,
    onAfterPrint: () => {
      onBeforeGetContentResolveBulk.current = null;
      setSelectedStudentsForPrint([]);
    },
    pageStyle: `@media print {
      @page {
        size: 6.9cm 4.1cm;
        margin: 0.25cm 0.25cm;
      }
    }`,
  });

  // Search functionality
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    const name = (student.Name || "").toLowerCase();
    const enrollmentNo = (student["Enrollment No"] || "").toLowerCase();
    const formNumber = (student["Form Number"] || "").toLowerCase();
    const registrationId = (student.formNumber || "").toLowerCase();

    return (
      name.includes(searchLower) ||
      enrollmentNo.includes(searchLower) ||
      formNumber.includes(searchLower) ||
      registrationId.includes(searchLower)
    );
  });

  const handleSelectCard = (e,studentId) => {
    setSelectedCards((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    // Get only the generated cards from filtered students
    const generatedFilteredStudents = filteredStudents.filter(
      (student) =>
        student.Name && student.formNumber && student.photo && student.sign
    );

    if (selectedCards.length === generatedFilteredStudents.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(
        generatedFilteredStudents.map((student) => student.formNumber)
      );
    }
  };

  const getMessageToShow = () => {
    if (!xlsxFileName && !zipFileName) {
      return {
        message:
          "No files uploaded yet. Please upload Excel and Zip files to get started.",
        type: "info",
      };
    }

    if (students.length === 0) {
      return {
        message:
          "No valid student data found in the uploaded files. Please check the formats.",
        type: "warning",
      };
    }

    if (filteredStudents.length === 0 && searchTerm) {
      return {
        message: "No cards match your search criteria.",
        type: "search",
      };
    }

    return null;
  };

  const messageToShow = getMessageToShow();

  return (
    <div className="flex flex-col gap-8 ">
      {/* Upload Data Section */}
      <div className="rounded-lg p-4 bg-gray-200 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">Upload Data</div>
          <button
            onClick={clearData}
            disabled={isProcessing}
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
              isProcessing 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <img src={ClearIcon} alt="clear" width={12} height={12} />
            <span>Clear Data</span>
          </button>
        </div>

        {/* Progress Indicator */}
        {isProcessing && (
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">{processingStatus}</span>
              <span className="text-sm text-blue-600">{Math.round(processingProgress)}%</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Processing your files... This may take a moment on slower machines.
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 w-full">
          {/* Excel Upload */}
          <div
            className={`h-[250px] bg-white border-2 border-dashed rounded-lg w-1/2 flex items-center justify-center transition-colors ${
              isProcessing 
                ? "border-gray-300 cursor-not-allowed" 
                : "border-gray-400 hover:border-gray-500 cursor-pointer"
            }`}
            onClick={() => !isProcessing && xlsxInputRef.current.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <img src={UploadIcon} alt="upload" width={24} height={24} />
              <input
                type="file"
                ref={xlsxInputRef}
                accept=".xlsx,.xls,.csv"
                onChange={handleXlsxUpload}
                style={{ display: "none" }}
                disabled={isProcessing}
              />
              <div className={`font-medium ${
                isProcessing ? "text-gray-400" : "text-blue-600 hover:text-blue-700"
              }`}>
                {xlsxFileName
                  ? truncateFileName(xlsxFileName)
                  : "Drop your Excel file here or click to browse"}
              </div>
              <div className="text-sm text-gray-600">
                Supported formats: .xls, .xlsx, .csv
              </div>
            </div>
          </div>

          {/* Zip Upload */}
          <div
            className={`h-[250px] bg-white border-2 border-dashed rounded-lg w-1/2 flex items-center justify-center transition-colors ${
              isProcessing 
                ? "border-gray-300 cursor-not-allowed" 
                : "border-gray-400 hover:border-gray-500 cursor-pointer"
            }`}
            onClick={() => !isProcessing && zipInputRef.current.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <img src={UploadIcon} alt="upload" width={24} height={24} />
              <input
                type="file"
                ref={zipInputRef}
                accept=".zip"
                onChange={handleZipUpload}
                style={{ display: "none" }}
                disabled={isProcessing}
              />
              <div className={`font-medium ${
                isProcessing ? "text-gray-400" : "text-blue-600 hover:text-blue-700"
              }`}>
                {zipFileName
                  ? truncateFileName(zipFileName)
                  : "Drop your Zip file here or click to browse"}
              </div>
              <div className="text-sm text-gray-600">
                Supported formats: .zip
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Cards Header Section */}
      <div className="rounded-lg bg-gray-200 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-lg font-bold">
            <div className="flex items-center gap-4">
              <div>Total records ({totalRecords})</div>
              <div className="text-green-600">Generated cards ({generatedCards})</div>
              {generationStats.failed > 0 && (
                <div className="text-red-600">Failed card{generationStats.failed > 1 ? 's' : ''} ({generationStats.failed})</div>
              )}
            </div>
            {generationStats.failed > 0 && (
              <button
                onClick={() => setShowFailedCards(!showFailedCards)}
                className="text-sm text-red-600 hover:text-red-700 font-normal mt-1 text-left"
              >
                {showFailedCards ? "Hide" : "Show"} failed card{generationStats.failed > 1 ? 's' : ''} details →
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2 w-[360px]">
            <img src={SearchIcon} alt="search" width={16} height={16} />
            <input
              type="text"
              placeholder="Search by name or registration number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {(() => {
                const generatedFilteredStudents = filteredStudents.filter(
                  (student) =>
                    student.Name &&
                    student.formNumber &&
                    student.photo &&
                    student.sign
                );
                return selectedCards.length ===
                  generatedFilteredStudents.length &&
                  generatedFilteredStudents.length > 0
                  ? "Deselect All"
                  : "Select All";
              })()}
            </button>

            <button
              onClick={handlePrintAll}
              disabled={selectedCards.length === 0}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                selectedCards.length === 0
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              <img src={PrinterIcon} alt="print" width={16} height={16} />
              <span>
                {(() => {
                  const generatedFilteredStudents = filteredStudents.filter(
                    (student) =>
                      student.Name &&
                      student.formNumber &&
                      student.photo &&
                      student.sign
                  );
                  return selectedCards.length ===
                    generatedFilteredStudents.length &&
                    generatedFilteredStudents.length > 0
                    ? `Print All (${generatedFilteredStudents.length})`
                    : selectedCards.length > 0
                    ? `Print (${selectedCards.length})`
                    : "Print";
                })()}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Failed Cards Details Section */}
      {showFailedCards && generationStats.failed > 0 && (
        <div className="rounded-lg bg-gray-200 p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-red-700 font-bold text-lg">⚠️ Failed Card{generationStats.failed > 1 ? 's' : ''}</span>
              <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                {generationStats.failed} card{generationStats.failed > 1 ? 's' : ''} couldn't be generated
              </span>
            </div>
            <button
              onClick={() => setShowFailedCards(false)}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              ✕ Close
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            <div className="grid gap-3">
              {failedCards.map((failedCard, index) => (
                <div key={index} className="bg-white border border-red-300 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {failedCard.name} 
                        <span className="text-gray-500 text-sm ml-2">
                          (Form: {failedCard.formNumber})
                        </span>
                      </div>
                      <div className="mt-1">
                        <div className="text-sm text-red-700 font-medium mb-1">Issues found:</div>
                        <ul className="text-sm text-red-600 space-y-1">
                          {failedCard.issues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="flex items-start gap-1">
                              <span className="text-red-500 mt-0.5">•</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Excel Row {failedCard.rowNumber}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> To fix these issues, please ensure your data files contain all required information:
              <ul className="mt-2 space-y-1 ml-4">
                <li>• Student name, form number, father's name, date of birth</li>
                <li>• Program name and other academic details</li>
                <li>• Photo files in format: [FormNumber]_photo.jpg/jpeg</li>
                <li>• Signature files in format: [FormNumber]_sign.jpg/jpeg</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg">
        <div className="py-4 pl-4">
          <div className="max-h-[600px] overflow-y-auto">
            <div className="pr-4">
              {messageToShow ? (
                <div className="h-64 flex items-center justify-center">
                  <div
                    className={`text-center py-8 px-6 rounded-lg shadow-lg ${
                      messageToShow.type === "info"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : messageToShow.type === "warning"
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        : "bg-gray-50 text-gray-500 border border-gray-200"
                    }`}
                  >
                    <div className="text-lg font-medium mb-2">
                      {messageToShow.type === "info" && "📁 No Files Uploaded"}
                      {messageToShow.type === "warning" && "⚠️ No Data Found"}
                      {messageToShow.type === "search" && "🔍 No Results"}
                    </div>
                    <div className="text-sm">{messageToShow.message}</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStudents.map((student, index) => (
                    <IdCard
                      key={index}
                      student={student}
                      handlePrintTrigger={handlePrintTrigger}
                      isSelected={selectedCards.includes(student.formNumber)}
                      onSelect={(e) => handleSelectCard(e,student.formNumber)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden print component */}
      <div style={{ display: "none" }}>
        {selectedStudent && (
          <div className="id-card-main" ref={componentRef}>
            <NewIdCard student={selectedStudent} />
          </div>
        )}
        {selectedStudentsForPrint.length > 0 && (
          <div className="id-cards-bulk-print" ref={bulkComponentRef}>
              {selectedStudentsForPrint.map((student, index) => (
                <div key={index} style={{ pageBreakInside: 'avoid' }}>
                  <NewIdCard student={student} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCardList;
