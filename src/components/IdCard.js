import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
// import ReactToPrint from 'react-to-print';

import './IdCard.css';
import IdCardTemplate from './IdCardTemplate';

const IdCard = ({ student,handlePrintTrigger }) => {


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
        {student && (
         <IdCardTemplate student={student} />
        )}
      </div>

      <button onClick={()=> {
        handlePrintTrigger(student)
      }} className="print-button">Print ID Card</button>
    </div>
  );
};

export default IdCard; 