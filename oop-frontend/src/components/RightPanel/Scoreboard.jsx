import './Scoreboard.css';

export default function Scoreboard({ totalScores = {}, voteCounts = {} }) {
  const countries = Object.keys(totalScores);

  const averages = countries.map(country => {
    const total = totalScores[country] || 0;
    const count = voteCounts[country] || 1; 
    const avg = (total / count).toFixed(1);
    return [country, avg];
  });

  const sorted = averages.sort((a, b) => b[1] - a[1]);

  return (
    <div className="scoreboard">
      <h3>GÜNCEL ORTALAMA PUANLAR</h3>
      <ul>
        {sorted.map(([country, avg]) => (
          <li key={country} className={country.toLowerCase()}>
            {country} — {avg} / 10
          </li>
        ))}
      </ul>
    </div>
  );
}
