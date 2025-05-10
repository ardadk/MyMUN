import React from 'react';
import './Css/GameScreenLayout.css';

export default function GameScreenLayout({ left, right, center, children }) {
  return (
    <div className="game-screen fade-in">
      <div className="game-layout">
        <div className="game-left-panel">{left}</div>
        
        <div className="game-right-panel">{right}</div>
        
        {/* Orta panel - ya center prop'u ya da children kullanılır */}
        <div className="game-center-panel">
          {center || children}
        </div>
      </div>
    </div>
  );
}
