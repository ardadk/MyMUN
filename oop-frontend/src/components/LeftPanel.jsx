import React from 'react';
import './Css/LeftPanel.css';
import ProblemCard from './Cards/ProblemCard';
import OptionButtons from './RightPanel/OptionButtons';

export default function LeftPanel({ 
  playerCountries, 
  onCountrySelect,
  problem,
  options,
  onSelectOption,
  voter
}) {
  return (
    <div className="left-panel">
      <div className="current-player">
        <p className="current-speaker">
          Sıradaki konuşmacı: <strong>{voter || "..."}</strong>
        </p>
      </div>
      
      {/* Country list moved to the top */}
      <div className="country-list">
        <h3>Ülkeler</h3>
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
      </div>
      
      <ProblemCard text={problem} />
      
      <div className="options-container">
        <h3 className="options-title">Seçenekler</h3>
        <OptionButtons options={options} onSelect={onSelectOption} />
      </div>
    </div>
  );
}
