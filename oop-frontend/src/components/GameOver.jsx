import React from 'react';
import './Css/GameOver.css';

export default function GameOver({ scores }) {
  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const champion = sortedScores[0];

  return (
    <div className="game-over-container">
      <div className="game-over-card">
        <h1 className="game-over-title">Game Over</h1>
        {champion && (
          <div className="champion-section">
            <h2>Şampiyon</h2>
            <div className="champion-info">
              <span className="champion-name">{champion[0]}</span>
              <span className="champion-score">{champion[1]} puan</span>
            </div>
          </div>
        )}
        <div className="scoreboard-section">
          <h3>Skor Tablosu</h3>
          <ul className="scores-list">
            {sortedScores.map(([country, score]) => (
              <li key={country} className="score-item">
                <span className="country">{country}</span>
                <span className="score">{score} puan</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}