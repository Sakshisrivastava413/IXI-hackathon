import React from 'react';
import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import data from './data';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="card-list">
        {
          data.courses.map(info => (
            <Card {...info} />
          ))      
        }
      </div>
    </div>
  );
}

export default App;
