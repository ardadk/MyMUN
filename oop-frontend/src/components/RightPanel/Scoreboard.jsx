import './Scoreboard.css';
import { useEffect } from 'react';

export default function Scoreboard({ totalScores = {}, voteCounts = {}, players = [], gameInfo = {} }) {
  useEffect(() => {
    console.log("Scoreboard Debug:", {
      hasPlayers: Boolean(players),
      playersLength: players?.length,
      playersData: players,
      gameInfoExists: Boolean(gameInfo),
      gameInfoData: gameInfo,
      totalScores,
      voteCounts
    });
  }, [players, gameInfo, totalScores, voteCounts]);

  // Check if players data is valid
  if (!Array.isArray(players) || players.length === 0) {
    console.warn("Players data is invalid:", {
      isArray: Array.isArray(players),
      length: players?.length,
      players
    });
    return <div className="scoreboard"><h3>Oyuncu verisi bekleniyor...</h3></div>;
  }

  // Check if gameInfo has required data
  if (!gameInfo?.econScores || !gameInfo?.welfareScores) {
    console.warn("GameInfo is missing required data:", gameInfo);
    return <div className="scoreboard"><h3>Oyun verileri yükleniyor...</h3></div>;
  }

  // Skorları hesapla
  const combinedScores = players.map(player => {
    const economyScore = gameInfo.econScores[player.countryName] || 0;
    const welfareScore = gameInfo.welfareScores[player.countryName] || 0;
    const total = totalScores[player.countryName] || 0;
    const count = voteCounts[player.countryName] || 1;
    const rating = (total / count);

    return {
      country: player.countryName,
      combinedScore: (economyScore + welfareScore + rating).toFixed(1),
      economy: economyScore.toFixed(1),
      welfare: welfareScore.toFixed(1),
      rating: rating.toFixed(1)
    };
  });

  // Skorları sırala
  const sorted = [...combinedScores].sort((a, b) => 
    parseFloat(b.combinedScore) - parseFloat(a.combinedScore)
  );

  return (
    <div className="scoreboard">
      <h3>TOPLAM PUANLAR</h3>
      {sorted.length > 0 ? (
        <ul>
          {sorted.map(({ country, combinedScore, economy, welfare, rating }) => (
            <li key={country}>
              <strong>{country}</strong>
              <div>
                <span>Toplam: {combinedScore} | </span>
                <span>(Ekonomi: {economy}/10 + </span>
                <span>Refah: {welfare}/10 + </span>
                <span>Oy: {rating})</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz puan yok</p>
      )}
    </div>
  );
}