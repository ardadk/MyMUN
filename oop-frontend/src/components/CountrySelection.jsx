import React from 'react';

const CountrySelection = ({ 
  playerIndex, 
  selectedCountry, 
  onCountryChange, 
  onNext, 
  usedCountries 
}) => {
  const countries = ["A", "B", "C", "D", "E"];
  
  return (
    <div className="game-container fade-in">
      <h2>Player {playerIndex + 1} - Select a Country</h2>
      <div className="selection-container">
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="" disabled>
            Choose a country
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
        Next
      </button>
    </div>
  );
};

export default CountrySelection;