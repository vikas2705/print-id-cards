import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
// import ReactToPrint from 'react-to-print';

import './IdCard.css';

const IdCard = ({ student }) => {
  const componentRef = useRef(null); // Initialize with null
  const onBeforeGetContentResolve = useRef(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (
      selectedStudent &&
      typeof onBeforeGetContentResolve.current === 'function'
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [selectedStudent]);

  const handleOnBeforeGetContent = useCallback(() => {
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
       setSelectedStudent({ ...student });
    });
  }, [selectedStudent,setSelectedStudent]);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: student.Name,
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



  //   content: () => {
  //     console.log('Print content ref:', componentRef);
  //     if (!componentRef) {
  //       console.error('Ref element is null!');
  //       return null;
  //     }
  //     return componentRef;
  //   },
  //   pageStyle: `
  //     @page {
  //       size: 8.6cm 5.4cm;
  //       margin: 0;
  //     }
  //     @media print {
  //       body {
  //         margin: 0;
  //         padding: 0;
  //       }
  //       .id-card {
  //         width: 8.6cm !important;
  //         height: 5.4cm !important;
  //         margin: 0 !important;
  //         padding: 0.2cm !important;
  //         box-shadow: none !important;
  //       }
  //     }
  //   `,
  //   onBeforeGetContent: () => {
  //     console.log('Before getting content, ref:', componentRef);
  //   },
  //   onAfterPrint: () => {
  //     console.log('Print completed');
  //   },
  //   removeAfterPrint: false
  // });

  // Generate a dummy image URL based on student name
  const getDummyImage = (name) => {
    const seed = name.split(' ').join('').toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  };

  return (
    <div className="id-card-container">
      {/* <div className="id-card">
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
              src={getDummyImage(student.Name)}
              alt="Student Photo"
              className="student-photo"
            />
          </div>

          <div className="student-info">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{student.Name}</span>
            </div>
            <div className="info-row">
              <span className="label">User ID:</span>
              <span className="value">{student['User ID']}</span>
            </div>
            <div className="info-row">
              <span className="label">Form No:</span>
              <span className="value">{student['Form Number']}</span>
            </div>
            <div className="info-row">
              <span className="label">Programme:</span>
              <span className="value">{student.Programme}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className="value status-granted">{student.Status}</span>
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
      </div> */}

      <div  >
        {selectedStudent && (
          <div className="id-card" ref={componentRef}>
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
                  src={getDummyImage(student.Name)}
                  alt="Student Photo"
                  className="student-photo"
                />
              </div>

              <div className="student-info">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{student.Name}</span>
                </div>
                <div className="info-row">
                  <span className="label">User ID:</span>
                  <span className="value">{student['User ID']}</span>
                </div>
                <div className="info-row">
                  <span className="label">Form No:</span>
                  <span className="value">{student['Form Number']}</span>
                </div>
                <div className="info-row">
                  <span className="label">Programme:</span>
                  <span className="value">{student.Programme}</span>
                </div>
                <div className="info-row">
                  <span className="label">Status:</span>
                  <span className="value status-granted">{student.Status}</span>
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

      <button onClick={handlePrint} className="print-button">Print ID Card</button>
    </div>
  );
};

export default IdCard; 