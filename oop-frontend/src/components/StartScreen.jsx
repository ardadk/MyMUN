// src/components/StartScreen.jsx
import React from 'react';
import './Css/StartScreen.css';

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      {/* MUN logosunu ekliyoruz */}
      <img
        src="/mun-logo.png"
        alt="MUN Logo"
        className="mun-logo"
      />

      <h1>MyMUN</h1>
      <button onClick={onStart}>Başla</button>
    </div>
  );
}
