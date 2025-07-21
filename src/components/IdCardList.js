import IdCard from './IdCard';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Papa from 'papaparse';
import './IdCardList.css';
import IdCardTemplate from './IdCardTemplate';

const IdCardList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (
      selectedStudent &&
      typeof onBeforeGetContentResolve.current === 'function'
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
        size: 7cm 4.4cm;
        margin: 0;
      }
    }`
  });

  const parseCSVFile = (file) => {
    setLoading(true);
    setError(null);
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError('Error parsing CSV file. Please check the file format.');
          setLoading(false);
          return;
        }
        
        // Filter out empty rows that might come from CSV parsing
        const validStudents = results.data.filter(student =>
          student.Name && student.Name.trim() !== ''
        );
        
        setStudents(validStudents);
        setLoading(false);
      },
      error: (error) => {
        setError('Error parsing CSV file');
        setLoading(false);
      }
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    parseCSVFile(file);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        parseCSVFile(file);
      } else {
        setError('Please upload a valid CSV file.');
      }
    }
  };

  const clearData = () => {
    setStudents([]);
    setFileName('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
        
        {/* File Upload Section */}
        <div className="file-upload-section">
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          
          {!fileName ? (
            <div 
              className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
              onClick={handleFileSelect}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-content">
                <i className="upload-icon">📁</i>
                <p>Click to upload CSV file</p>
                <p className="upload-hint">or drag and drop a CSV file here</p>
              </div>
            </div>
          ) : (
            <div className="file-info">
              <p>📄 {fileName}</p>
              <div className="file-actions">
                <button onClick={handleFileSelect} className="btn-secondary">
                  Upload New File
                </button>
                <button onClick={clearData} className="btn-secondary">
                  Clear Data
                </button>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className="loading">
            <p>Processing CSV file...</p>
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
            <p>Click "Print ID Card" to generate a print preview for each student</p>
            <button onClick={handlePrintAll} className="btn-primary">
              Print All ID Cards
            </button>
          </div>
        )}
      </div>

      <div className="cards-grid">
        {students.map((student, index) => (
          <IdCard key={index} student={student} handlePrintTrigger={handlePrintTrigger} />
        ))}
      </div>

      {students.length === 0 && !loading && !error && !fileName && (
        <div className="no-data">
          <p>No student data loaded. Please upload a CSV file to get started.</p>
        </div>
      )}

      {students.length === 0 && fileName && !loading && !error && (
        <div className="no-data">
          <p>No valid student data found in the uploaded file. Please check the CSV format.</p>
        </div>
      )}

      <div>
        {selectedStudent && (
          <div className="id-card-main" ref={componentRef}>
            <IdCardTemplate student={selectedStudent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCardList; 