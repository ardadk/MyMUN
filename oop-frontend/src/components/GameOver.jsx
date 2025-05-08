import React from 'react';
import './Css/GameOver.css';
import Scoreboard from './RightPanel/Scoreboard';

export default function GameOver({ onRestart, totalScores, voteCounts, players }) {
  return (
    <div className="game-over">
      <div className="game-over-content">
        <h1>Oyun Bitti!</h1>
        <p>3 tur tamamladınız. Tebrikler!</p>
        
        <div className="final-scores-container">
          <h2>Final Puanları</h2>
          <Scoreboard totalScores={totalScores} voteCounts={voteCounts} />
          
          <div className="player-stats">
            <h3>Ülke Durumları</h3>
            <div className="stats-grid">
              {players.map(player => (
                <div key={player.countryName} className="player-stat-card">
                  <h4>{player.countryName}</h4>
                  <p>Ekonomi: {player.economyScore}/100</p>
                  <p>Refah: {player.welfareScore}/100</p>
                  <p>Politika: {player.policy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          className="restart-button" 
          onClick={onRestart}
        >
          Yeniden Başlat
        </button>
      </div>
    </div>
  );
}