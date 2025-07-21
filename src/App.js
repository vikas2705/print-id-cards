import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import IdCard from './components/IdCard';
import IdCardList from './components/IdCardList';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = () => {
    fetch('/sample-data.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setStudents(results.data);
            setLoading(false);
          },
          error: (error) => {
            setError('Error parsing CSV file');
            setLoading(false);
          }
        });
      })
      .catch(error => {
        setError('Error loading CSV file');
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading student data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student ID Card Generator</h1>
      </header>
      <main>
        <IdCardList students={students} />
      </main>
    </div>
  );
}

export default App; 