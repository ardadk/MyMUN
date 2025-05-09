import React from 'react';
import './CountryPage.css';
import EconomicCard from '../Cards/EconomicCard';
import WelfareCard from '../Cards/WelfareCard';
import PoliticsCard from '../Cards/PoliticsCard';
import ProblemCard from '../Cards/ProblemCard';
import Scoreboard from '../RightPanel/Scoreboard';
import WorldMap from './WorldMap';

export default function CountryPage({
  countryCode,
  econ,
  welfare,
  policy,
  problem,
  totalScores,
  voteCounts,
  players,
  gameInfo,
  onBack
}) {
  return (
    <div className="country-page">
      <button className="back-button" onClick={onBack}>
        ← Ülke Seçimine Geri Dön
      </button>

      <div className="info-row">
        <EconomicCard score={econ} />
        <WelfareCard score={welfare} />
        <PoliticsCard text={policy} />
        <ProblemCard text={problem} />
      </div>

      <div className="map-and-score-container">
        <div className="map-wrapper">
          <WorldMap selectedCountry={countryCode} onCountrySelect={() => {}} />
        </div>
       
      </div>
    </div>
  );
}
