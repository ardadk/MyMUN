import './Css/LeftPanel.css';


export default function LeftPanel({ 
  playerCountries, 
  onCountrySelect,
  gameInfo,
  voteCounts,
  players,
}) {
  // Hesaplanan skorlar
  const currentScores = players?.map(player => {
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
  }).sort((a, b) => b.score - a.score) || [];

  return (
    <div className="left-panel-container">
    
      {/* Sağ taraf: Ülke butonları ve Skor tablosu */}
      <div className="left-panel-content">
        <div className="country-buttons-vertical">
          {playerCountries.map(code => (
            <button
              key={code}
              className="country-button"
              onClick={() => onCountrySelect(code)}
            >
              Ülke {code}
            </button>
          ))}
        </div>

        <div className="score-table">
          <h3>Mevcut Puanlar</h3>
          <table>
            <thead>
              <tr>
                <th>Ülke</th>
                <th>Eko.</th>
                <th>Ref.</th>
                <th>Oy</th>
                <th>Top.</th>
              </tr>
            </thead>
            <tbody>
              {currentScores.map(score => (
                <tr key={score.country}>
                  <td>{score.country}</td>
                  <td>{score.details.economy.toFixed(1)}</td>
                  <td>{score.details.welfare.toFixed(1)}</td>
                  <td>{score.details.votes.toFixed(1)}</td>
                  <td><strong>{score.score.toFixed(1)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
