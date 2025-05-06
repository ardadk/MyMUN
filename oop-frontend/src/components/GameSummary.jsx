// src/components/GameSummary.jsx
import React from 'react';
import './Css/GameSummary.css';

export default function GameSummary({ playerCountries, onRestart, onSubmit, isSubmitting }) {
  return (
    <div className="game-summary">
      <h2>Oyuna başlamak için tıklayın</h2>

      <div className="summary-container">
        {playerCountries.map((country, idx) => (
          <div key={idx} className="summary-item">
            <span>Oyuncu {idx + 1}</span>
            <strong>{country}</strong>
          </div>
        ))}
      </div>

      <button
        className="start-game-button"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Yükleniyor…' : 'Start Game'}
      </button>
    </div>
  );
}
