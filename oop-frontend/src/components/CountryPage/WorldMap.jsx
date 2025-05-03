// src/components/WorldMap.jsx
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

/**
 * selectedCountry: (string|null)—
 *    null ise seçim ekranındayız; tüm country-code haritalarını göster.
 *    bir kod (ör. "A") ise o ülkenin haritasını göster.
 */
export default function WorldMap({ selectedCountry, onCountrySelect }) {
  // Eğer bir ülke seçilmişse onun map’ini, değilse seçim ekranı modunu aç
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

  // Seçim modu: tüm haritaları küçük tile’lar halinde göster
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
