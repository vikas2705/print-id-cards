import React from "react";

import "./IdCard.css";
import NewIdCard from "./NewIdCard";

const IdCard = ({ student, handlePrintTrigger }) => {
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

      <div>{student && <NewIdCard student={student} />}</div>

      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <button
          onClick={() => {
            handlePrintTrigger(student);
          }}
          className="print-button"
        >
          Print ID Card
        </button>
      </div>
    </div>
  );
};

export default IdCard;
