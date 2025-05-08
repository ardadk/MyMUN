import './Scoreboard.css';
import { useEffect } from 'react';

export default function Scoreboard({ totalScores = {}, voteCounts= {}, players= [] , gameInfo= {} }) {
  // Bileşenin render edildiğini kontrol et
  console.log("Scoreboard bileşeni render ediliyor");
  
  // Props kontrolü
  console.log("selam")
  console.log("totalScores:", totalScores);
  console.log("voteCounts:", voteCounts);
  console.log("gameInfo:", gameInfo);
  // gameInfo'nun yapısını daha iyi anlamak için:
  console.log("gameInfo detaylı:", JSON.stringify(gameInfo, null, 2));
  
  // Api'den hangi anahtarlar geliyor, kontrol et
  useEffect(() => {
    if (gameInfo) {
      console.log("gameInfo anahtarları:", Object.keys(gameInfo));
    }
  }, [gameInfo]);

  // Ülkeleri al
  const countries = Object.keys(totalScores);
  console.log("Ülkeler:", countries);
  
  // Skorları hesapla
  const combinedScores = countries.map(country => {
    const total = totalScores[country] || 0;
    const count = voteCounts[country] || 1;
    const rating = (total / count);
    
    // GameOver.jsx'teki yaklaşımı burada da kullanalım
    // Önce gameInfo'dan, yoksa players'dan bul
    const player = players.find(p => p.countryName === country);
    const economyScore = gameInfo?.economyScores?.[player?.countryName] || (player?.economyScore) || 0;
    const welfareScore = gameInfo?.welfareScores?.[player?.countryName] || (player?.welfareScore) || 0;
    
    console.log(`${country} için değerler:`, { economyScore, welfareScore, rating });
    
    const combinedScore = ((economyScore / 10) + (welfareScore / 10) + rating).toFixed(1);
    
    return [country, combinedScore, (economyScore / 10).toFixed(1), (welfareScore / 10).toFixed(1), rating.toFixed(1)];
  });
  
  // Sırala
  const sorted = combinedScores.sort((a, b) => b[1] - a[1]);
  console.log("Sıralanmış skorlar:", sorted);

  return (
    <div className="scoreboard">
      <h3>TOPLAM PUANLAR</h3>
      <ul>
        {sorted.map(([country, total, economy, welfare, rating], index) => (
          <li key={country} className={country.toLowerCase()}>
            <div className="country-name">{country}</div>
            <div className="score-breakdown">
              <span className="total-score">{total}</span>
              <div className="score-details">
                <div>Ekon: {economy}</div>
                <div>Refah: {welfare}</div>
                <div>Oy: {rating}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
