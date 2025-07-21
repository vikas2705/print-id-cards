import React from 'react';
import IdCard from './IdCard';
import './IdCardList.css';

const IdCardList = ({ students }) => {
  // Filter out empty rows that might come from CSV parsing
  const validStudents = students.filter(student => 
    student.Name && student.Name.trim() !== ''
  );

  return (
    <div className="id-card-list">
      <div className="list-header">
        <h2>Student ID Cards ({validStudents.length} students)</h2>
        <p>Click "Print ID Card" to generate a print preview for each student</p>
      </div>
      
      <div className="cards-grid">
        {validStudents.map((student, index) => (
          <IdCard key={index} student={student} />
        ))}
      </div>
      
      {validStudents.length === 0 && (
        <div className="no-data">
          <p>No student data found. Please check the CSV file.</p>
        </div>
      )}
    </div>
  );
};

export default IdCardList; 