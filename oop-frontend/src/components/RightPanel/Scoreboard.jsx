import './Scoreboard.css';
import { useEffect } from 'react';

export default function Scoreboard({ totalScores = {}, voteCounts = {}, players = [], gameInfo = {} }) {
  useEffect(() => {
    console.log("Scoreboard players:", players);
    console.log("Scoreboard gameInfo:", gameInfo);
  }, [players, gameInfo]);

  if (!players || players.length === 0) {
    return <div>Oyuncu verisi yükleniyor...</div>;
  }

  return (
    <div className="scoreboard">
      <div className="scores-grid">
        {players.map(player => (
          <div key={player.countryName} className="score-card">
            <h4>{player.countryName}</h4>
            <p>
              <span> Ekonomi:</span> 
              <span>{gameInfo?.econScores?.[player.countryName] || player.economyScore || 0}</span>
            </p>
            <p>
              <span> Refah:</span> 
              <span>{gameInfo?.welfareScores?.[player.countryName] || player.welfareScore || 0}</span>
            </p>
            <p>
              <span> Oy:</span> 
              <span>{voteCounts[player.countryName] || 0}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
