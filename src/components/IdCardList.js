import IdCard from './IdCard';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import './IdCardList.css';
import IdCardTemplate from './IdCardTemplate';

const IdCardList = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState();
  const componentRef = useRef(null); // Initialize with null
  const onBeforeGetContentResolve = useRef(null);


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
      // setSelectedStudent({ ...student });
    });
  }, [selectedStudent, setSelectedStudent]);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: selectedStudent?.Name,
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      onBeforeGetContentResolve.current = null;
      setSelectedStudent(null);
    },
  });

  // Filter out empty rows that might come from CSV parsing
  const validStudents = students.filter(student =>
    student.Name && student.Name.trim() !== ''
  );

  const handlePrintTrigger = (student) => {
    setSelectedStudent({ ...student })
    handlePrint()
  }

  return (
    <div className="id-card-list">
      <div className="list-header">
        <h2> ({validStudents.length} students)</h2>
        <p>Click "Print ID Card" to generate a print preview for each student</p>
      </div>

      <div className="cards-grid">
        {validStudents.map((student, index) => (
          <IdCard key={index} student={student} handlePrintTrigger={handlePrintTrigger} />
        ))}
      </div>

      {validStudents.length === 0 && (
        <div className="no-data">
          <p>No student data found. Please check the CSV file.</p>
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