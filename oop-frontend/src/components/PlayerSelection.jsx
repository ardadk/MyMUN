import React from 'react';

const PlayerSelection = ({ selectedCount, onCountChange, onContinue }) => {
  const players = [1, 2, 3, 4, 5];
  
  return (
    <div className="game-container fade-in">
      <h2>Select Number of Players</h2>
      <div className="selection-container">
        <select
          value={selectedCount}
          onChange={(e) => onCountChange(parseInt(e.target.value))}
        >
          {players.map((player) => (
            <option key={player} value={player}>
              {player}
            </option>
          ))}
        </select>
      </div>
      <button onClick={onContinue}>Continue</button>
    </div>
  );
};

export default PlayerSelection;