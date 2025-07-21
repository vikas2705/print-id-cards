import IdCard from './IdCard';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import './IdCardList.css';

const IdCardList = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState();
  const componentRef = useRef(null); // Initialize with null
  const onBeforeGetContentResolve = useRef(null);

  const getDummyImage = (name) => {
    const seed = name.split(' ').join('').toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  };

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

  console.log("selectedStudent ", selectedStudent)
  console.log("componentRef ", componentRef)
  console.log("onBeforeGetContentResolve", onBeforeGetContentResolve)


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
        <h2>Student ID Cards ({validStudents.length} students)</h2>
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
              <div className="id-card-header">
                <div className="institution-info">
                  <h2>STUDENT IDENTITY CARD</h2>
                  <p className="institution-name">Shiksha Shastri (B.Ed.) Programme</p>
                </div>
                <div className="logo-section">
                  <div className="logo-placeholder">LOGO</div>
                </div>
              </div>

              <div className="id-card-body">
                <div className="photo-section">
                  <img
                    src={getDummyImage(selectedStudent?.Name)}
                    alt="Student Photo"
                    className="student-photo"
                  />
                </div>

                <div className="student-info">
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">{selectedStudent?.Name || ''}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">User ID:</span>
                    <span className="value">{selectedStudent['User ID'] || ''}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Form No:</span>
                    <span className="value">{selectedStudent['Form Number'] || ''}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Programme:</span>
                    <span className="value">{selectedStudent.Programme || ''}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Status:</span>
                    <span className="value status-granted">{selectedStudent?.Status}</span>
                  </div>
                </div>
              </div>

              <div className="id-card-footer">
                <div className="signature-section">
                  <div className="signature-line"></div>
                  <span className="signature-label">Authorized Signature</span>
                </div>
                <div className="validity">
                  <span>Valid till: 31st Dec 2025</span>
                </div>
              </div>

            </div>
          )}
      </div>
    </div>
  );
};

export default IdCardList; 