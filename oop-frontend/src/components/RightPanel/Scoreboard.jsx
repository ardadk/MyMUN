
import React from 'react';
import './Scoreboard.css';

export default function Scoreboard({ gameInfo, voteCounts }) {
  const { econScores = {}, welfareScores = {} } = gameInfo || {};

  
  const entries = Object.keys(econScores).map((country) => {
    const eko = Number(econScores[country] ?? 0);
    const ref = Number(welfareScores[country] ?? 0);
    const oy  = Number(voteCounts?.[country] ?? 0);
    const top = eko + ref + oy;
    return { country, eko, ref, oy, top };
  });

  
  entries.sort((a, b) => b.top - a.top);

  return (
    <div className="scoreboard-card">
      <h3>Mevcut Puanlar</h3>
      <table className="scoreboard-table">
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
          {entries.map(({ country, eko, ref, oy, top }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>{eko.toFixed(1)}</td>
              <td>{ref.toFixed(1)}</td>
              <td>{oy.toFixed(1)}</td>
              <td className="total-score">{top.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
