import React, { useState, useCallback, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import Papa from "papaparse";
import JSZip from "jszip";
import * as XLSX from "xlsx";
import "./IdCardList.css";
import IdCard from "./IdCard";
import { openDB } from "idb";
import NewIdCard from "./NewIdCard";
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
// Usage: const file = await getFileFromIndexedDB(key);
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
  return (
    <div className="id-card-list">
      <div className="list-header">
        <h2>Student ID Card Generator</h2>
        <div className="file-upload-section">
          <input
            type="file"
            ref={xlsxInputRef}
            accept=".xlsx"
            onChange={handleXlsxUpload}
            style={{ display: "none" }}
          />
          <input
            type="file"
            ref={zipInputRef}
            accept=".zip"
            onChange={handleZipUpload}
            style={{ display: "none" }}
          />
          <div className="file-actions">
            <button
              onClick={() => xlsxInputRef.current.click()}
              className="btn-secondary file-btn"
              title={xlsxFileName || "Upload Excel (.xlsx)"}
              style={{
                maxWidth: 180,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {xlsxFileName
                ? truncateFileName(xlsxFileName)
                : "Upload Excel (.xlsx)"}
            </button>
            <button
              onClick={() => zipInputRef.current.click()}
              className="btn-secondary file-btn"
              title={zipFileName || "Upload Zip (.zip)"}
              style={{
                maxWidth: 180,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {zipFileName
                ? truncateFileName(zipFileName)
                : "Upload Zip (.zip)"}
            </button>
            <button onClick={clearData} className="btn-secondary">
              Clear Data
            </button>
          </div>
        </div>
        {loading && (
          <div className="loading">
            <p>Processing files...</p>
          </div>
        )}
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        {students.length > 0 && (
          <div className="data-info">
            <h3>Loaded {students.length} students</h3>
            <p>
              Click "Print ID Card" to generate a print preview for each student
            </p>
            <button onClick={handlePrintAll} className="btn-primary">
              Print All ID Cards
            </button>
          </div>
        )}
      </div>
      <div className="cards-grid">
        {students.map((student, index) => (
          <IdCard
            key={index}
            student={student}
            handlePrintTrigger={handlePrintTrigger}
          />
        ))}
      </div>
      {students.length === 0 &&
        !loading &&
        !error &&
        !xlsxFileName &&
        !zipFileName && (
          <div className="no-data">
            <p>
              No student data loaded. Please upload the Excel and ZIP files to
              get started.
            </p>
          </div>
        )}
      {students.length === 0 &&
        (xlsxFileName || zipFileName) &&
        !loading &&
        !error && (
          <div className="no-data">
            <p>
              No valid student data found in the uploaded files. Please check
              the formats.
            </p>
          </div>
        )}
      <div>
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
