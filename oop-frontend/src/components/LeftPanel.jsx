import React from 'react';
import './Css/LeftPanel.css';

export default function LeftPanel({ playerCountries, onCountrySelect }) {
  return (
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
  );
}
