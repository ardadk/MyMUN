import React from 'react';

const GameSummary = ({ playerCountries, onRestart, onSubmit, isSubmitting }) => {
  return (
    <div className="game-container fade-in">
      <h2>Game Setup Complete</h2>
      <div className="selection-container">
        {playerCountries.map((country, index) => (
          <div className="summary-item" key={index}>
            <span>Player {index + 1}</span>
            <strong className="country-flag">{country}</strong>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={onSubmit}
          disabled={isSubmitting}
          style={{ backgroundColor: 'var(--success-color)' }}
        >
          {isSubmitting ? 'Sending...' : 'Send to Server'}
        </button>
        
        <button onClick={onRestart}>
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default GameSummary;