// src/components/PlayerSelection.jsx
import './Css/PlayerSelection.css';

export default function PlayerSelection({ selectedCount, onCountChange, onContinue }) {
  return (
    <div className="player-selection">
     <h2>Oyuncu Sayısını Seçiniz.</h2>
      <div className="selection-container">
        <select
          value={selectedCount}
          onChange={(e) => onCountChange(parseInt(e.target.value))}
        >
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <button onClick={onContinue}>Devam</button>
    </div>
  );
}
