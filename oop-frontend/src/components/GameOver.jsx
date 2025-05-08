import React from 'react';
import './Css/GameOver.css';

export default function GameOver({ onRestart }) {
  return (
    <div className="game-over">
      <div className="game-over-content">
        <h1>Oyun Bitti!</h1>
        <p>3 tur tamamladınız. Tebrikler!</p>
        
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