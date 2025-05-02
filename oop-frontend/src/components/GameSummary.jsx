import React from 'react';

const GameSummary = ({ playerCountries, onRestart, onSubmit, isSubmitting }) => {
  const handleStartGame = async () => {
    // Submit işlemini gerçekleştir ve başarılı olursa oyunu başlat
    await onSubmit();
    // Not: onSubmit fonksiyonu içinde zaten hata yönetimi var
  };

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
      
      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={handleStartGame}
          disabled={isSubmitting}
          style={{ backgroundColor: 'var(--success-color)' }}
        >
          {isSubmitting ? 'Starting Game...' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

export default GameSummary;