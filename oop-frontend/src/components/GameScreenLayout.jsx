// src/components/GameScreenLayout.jsx
import React from 'react';
import './Css/GameScreenLayout.css';

export default function GameScreenLayout({ left, right }) {
  return (
    <div className="game-screen fade-in">
      <div className="game-layout">
        <div className="game-left-panel">{left}</div>
        <div className="game-right-panel">{right}</div>
      </div>
    </div>
  );
}
