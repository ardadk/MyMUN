import React from 'react';
import './WorldMap.css';

const countries = ["A","B","C","D","E"];
const positions = [
  { top: '40%', left: '46%' },
  { top: '55%', left: '60%' },
  { top: '42%', left: '20%' },
  { top: '65%', left: '50%' },
  { top: '47%', left: '72%' }
];

export default function WorldMap({ selectedCountry, onCountrySelect }) {

  if (selectedCountry) {
    return (
      <div className="map-container">
        <img
          src={`/world-map-${selectedCountry}.png`}
          alt={`Map for ${selectedCountry}`}
          className="map-img"
        />
      </div>
    );
  }

  return (
    <div className="map-container selection-mode">
      {countries.map((code, idx) => (
        <div
          key={code}
          className="map-tile"
          onClick={() => onCountrySelect(code)}
        >
          <img
            src={`/world-map-${code}.png`}
            alt={`Select ${code}`}
            className="map-img"
          />
          <span className="map-label">Ülke {code}</span>
        </div>
      ))}
    </div>
  );
}
