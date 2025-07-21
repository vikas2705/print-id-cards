import React from 'react';
import './App.css';
import IdCardList from './components/IdCardList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Student ID Card Generator</h1>
      </header>
      <main>
        <IdCardList />
      </main>
    </div>
  );
}

export default App; 