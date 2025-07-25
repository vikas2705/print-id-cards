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
import SearchIcon from "../assets/Search.svg";

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
  const [selectedStudent, setSelectedStudent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const xlsxInputRef = useRef(null);
  const zipInputRef = useRef(null);
  const [xlsxFileName, setXlsxFileName] = useState("");
  const [zipFileName, setZipFileName] = useState("");

  useEffect(() => {
    if (
      selectedStudent &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [selectedStudent]);

  const handleOnBeforeGetContent = useCallback((student) => {
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
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

  const handleXlsxUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);
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
    setError(null);
    setZipFileName(file.name);
    const zip = await JSZip.loadAsync(file);
    let csvData = [];
    const photos = {};
    const signs = {};
    await Promise.all(
      Object.keys(zip.files).map(async (filename) => {
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
      })
    );
    // After parsing, store all student data (including photo and sign as base64) in React state
    const combined = csvData.map((csvRow) => {
      const formNumber = csvRow["Form Number"];
      // Find the matching row in the Excel data
      const xlsxMatch = excelData.find(
        (row) => row["FORM NUMBER"] === formNumber
      );
      // Extract required fields from the Excel row
      const permanent_address = xlsxMatch?.["PERMANENT ADDRESS LINE 1"] || "";
      const correspondence_address =
        xlsxMatch?.["PERMANENT ADDRESS LINE 2"] || "";
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
    setStudents(combined);
    setLoading(false);
  };

  const clearData = () => {
    setStudents([]);
    setExcelData([]);
    setXlsxFileName("");
    setZipFileName("");
    setError(null);
    setSelectedCards([]);
    if (xlsxInputRef.current) xlsxInputRef.current.value = "";
    if (zipInputRef.current) zipInputRef.current.value = "";
  };

  const handlePrintTrigger = (student) => {
    setSelectedStudent({ ...student });
    handlePrint();
  };

  const handlePrintAll = () => {
    students.forEach((student, index) => {
      setTimeout(() => {
        setSelectedStudent({ ...student });
        handlePrint();
      }, index * 1000);
    });
  };

  // Search functionality
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    const name = (student.Name || "").toLowerCase();
    const enrollmentNo = (student["Enrollment No"] || "").toLowerCase();
    return name.includes(searchLower) || enrollmentNo.includes(searchLower);
  });

  // Card selection logic
  const handleSelectCard = (studentId) => {
    setSelectedCards((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCards.length === filteredStudents.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(filteredStudents.map((student) => student.formNumber));
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Upload Data Section */}
      <div className="rounded-lg p-4 bg-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">Upload Data</div>
          <button
            onClick={clearData}
            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <img src={ClearIcon} alt="clear" width={12} height={12} />
            <span>Clear Data</span>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full">
          {/* Excel Upload */}
          <div
            className="h-[250px] bg-white border-2 border-dashed border-gray-400 rounded-lg w-1/2 flex items-center justify-center hover:border-gray-500 transition-colors cursor-pointer"
            onClick={() => xlsxInputRef.current.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <img src={UploadIcon} alt="upload" width={24} height={24} />
              <input
                type="file"
                ref={xlsxInputRef}
                accept=".xlsx"
                onChange={handleXlsxUpload}
                style={{ display: "none" }}
              />
              <div className="text-blue-600 hover:text-blue-700 font-medium">
                {xlsxFileName
                  ? truncateFileName(xlsxFileName)
                  : "Drop your Excel file here or click to browse"}
              </div>
              <div className="text-sm text-gray-600">
                Supported formats: .xlsx
              </div>
            </div>
          </div>

          {/* Zip Upload */}
          <div
            className="h-[250px] bg-white border-2 border-dashed border-gray-400 rounded-lg w-1/2 flex items-center justify-center hover:border-gray-500 transition-colors cursor-pointer"
            onClick={() => zipInputRef.current.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <img src={UploadIcon} alt="upload" width={24} height={24} />
              <input
                type="file"
                ref={zipInputRef}
                accept=".zip"
                onChange={handleZipUpload}
                style={{ display: "none" }}
              />
              <div className="text-blue-600 hover:text-blue-700 font-medium">
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

      {/* Current Uploads Section */}
      <div className="rounded-lg p-4 bg-gray-200 space-y-2">
        <div className="font-semibold text-lg">Current Uploads</div>
        <div className="flex items-center justify-around">
          <div className="flex flex-col gap-1 items-center">
            <div className="text-xl font-semibold">{students.length}</div>
            <div className="text-sm text-gray-600">Total records</div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="text-xl font-semibold">{students.length}</div>
            <div className="text-sm text-gray-600">Generated cards</div>
          </div>
        </div>
      </div>

      {/* Generated Cards Section */}
      <div className="rounded-lg bg-gray-200 space-y-4">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-lg">
            Generated Cards ({students.length})
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-[360px]">
            <img src={SearchIcon} alt="search" width={16} height={16} />
            <input
              type="text"
              placeholder="Search by name or enrollment number..."
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
              Select All
            </button>

            <button
              onClick={handlePrintAll}
              className="flex items-center gap-2 bg-gray-600 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <img src={PrinterIcon} alt="print" width={16} height={16} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <IdCard
                key={index}
                student={student}
                handlePrintTrigger={handlePrintTrigger}
                isSelected={selectedCards.includes(student.formNumber)}
                onSelect={() => handleSelectCard(student.formNumber)}
              />
            ))}
          </div>

          {filteredStudents.length === 0 && students.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              No cards match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Hidden print component */}
      <div style={{ display: "none" }}>
        {selectedStudent && (
          <div className="id-card-main" ref={componentRef}>
            <NewIdCard student={selectedStudent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCardList;
