import React, { useState, useEffect } from 'react';
import './App.css';

function Box({ id, toggleClass, isSelected }) {
  return (
    <div
      className={`box ${isSelected ? 'selected' : ''}`}
      id={id}
      onClick={() => toggleClass(id)}
    ></div>
  );
}

function App() {
  const [selectedBoxes, setSelectedBoxes] = useState({});

  const toggleClass = (id) => {
    setSelectedBoxes(prevSelected => ({
      ...prevSelected,
      [id]: !prevSelected[id]
    }));

    const row = Math.floor((id - 1) / 3);
    const col = (id - 1) % 3;

    const adjPositions = [
      { r: row - 1, c: col },
      { r: row, c: col - 1 },
      { r: row + 1, c: col },
      { r: row, c: col + 1 }
    ];

    adjPositions.forEach(({ r, c }) => {
      const adjId = r * 3 + c + 1;
      if (r >= 0 && r < 3 && c >= 0 && c < 3) {
        setSelectedBoxes(prevSelected => ({
          ...prevSelected,
          [adjId]: !prevSelected[adjId]
        }));
      }
    });
  };

  return (
    <div className="container">
      {Array.from({ length: 9 }, (_, index) => (
        <Box
          key={index + 1}
          id={index + 1}
          toggleClass={toggleClass}
          isSelected={selectedBoxes[index + 1]}
        />
      ))}
    </div>
  );
}

export default App;
