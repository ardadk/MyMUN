import React from 'react';

export default function GameOver({ scores }) {
  // Puanları sıralayarak en yüksek puanı alanı bul
  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const champion = sortedScores[0]; // En yüksek puanı alan

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Game Over</h1>
      {champion && (
        <h2>Şampiyon: {champion[0]} (Puan: {champion[1]})</h2>
      )}
      <h3>Skor Tablosu:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sortedScores.map(([country, score]) => (
          <li key={country} style={{ margin: '10px 0' }}>
            {country}: {score} puan
          </li>
        ))}
      </ul>
    </div>
  );
}