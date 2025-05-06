import React from 'react';
import './Css/CountrySelection.css';

const CountrySelection = ({ 
  playerIndex, 
  selectedCountry, 
  onCountryChange, 
  onNext, 
  usedCountries 
}) => {
  const countries = ["A", "B", "C", "D", "E"];
  
  return (
    <div className="country-selection">
      <h2>Oyuncu {playerIndex + 1} - Bir Ülke Seçin.</h2>
      <div className="selection-container">
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="" disabled>
            Bir Ülke Seçin.
          </option>
          {countries.map((country) => (
            <option 
              key={country} 
              value={country}
              disabled={usedCountries.includes(country)}
            >
              {country}
            </option>
          ))}
        </select>
      </div>
      <button 
        onClick={onNext}
        disabled={!selectedCountry}
      >
        Sıradaki
      </button>
    </div>
  );
};

export default CountrySelection;