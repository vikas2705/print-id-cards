import React from "react";
import "./App.css";
import IdCardList from "./components/IdCardList";
import NewIdCard from "./components/NewIdCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Student ID Card Generator</h1>
        <p>New University ID Card Design</p>
      </header>
      <main>
        <IdCardList />
      </main>
    </div>
  );
}

export default App;
