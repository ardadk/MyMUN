import React from 'react';
import './Css/GameOver.css';


export default function GameOver({ onRestart, voteCounts, players, gameInfo}) {
  
  const finalScores = players.map(player => {
    const economy = (gameInfo?.econScores?.[player.countryName] || player.economyScore || 0) / 10;
    const welfare = (gameInfo?.welfareScores?.[player.countryName] || player.welfareScore || 0) / 10;
    const votes = (voteCounts[player.countryName] || 0) / 2;
    const totalScore = economy + welfare + votes;

    return {
      country: player.countryName,
      score: totalScore,
      details: {
        economy,
        welfare,
        votes
      }
    };
  });

  
  const sortedScores = [...finalScores].sort((a, b) => b.score - a.score);
  const winner = sortedScores[0];

  return (
    <div className="game-over">
      <div className="game-over-content">
        <h1>Oyun Bitti!</h1>
        <p>10 tur tamamladınız. Tebrikler!</p>
        
        <div className="winner-announcement">
          <h2>🏆 Kazanan: {winner.country}</h2>
          <p>Toplam Puan: {winner.score.toFixed(1)}</p>
        </div>

        <div className="final-scores-container">
          <h2>Final Sıralaması</h2>
          <div className="final-rankings">
            {sortedScores.map((score, index) => (
              <div 
                key={score.country} 
                className={`ranking-card ${index === 0 ? 'winner' : ''}`}
              >
                <h3>#{index + 1} {score.country}</h3>
                <div className="score-breakdown">
                  <p>Toplam Puan: {score.score.toFixed(1)}</p>
                  <p>Ekonomi: {score.details.economy.toFixed(1)}</p>
                  <p>Refah: {score.details.welfare.toFixed(1)}</p>
                  <p>Oylar: {score.details.votes.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="player-stats">
            <h3>Detaylı Ülke Durumları</h3>
            <div className="stats-grid">
              {players.map(player => (
                <div key={player.countryName} className="player-stat-card">
                  <h4>Ülke {player.countryName}</h4>
                  <p>Ekonomi: {gameInfo?.econScores?.[player.countryName] || player.economyScore || 0}/100</p>
                  <p>Refah: {gameInfo?.welfareScores?.[player.countryName] || player.welfareScore || 0}/100</p>
                  <p>Politika: {player.policy || "Belirtilmemiş"}</p>
                  <p>Toplam Oy: {voteCounts[player.countryName] || 0}</p>
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