import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="game-container fade-in">
      <h1>Country Selection Game</h1>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default StartScreen;