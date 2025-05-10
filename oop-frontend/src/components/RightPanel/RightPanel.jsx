import React, { useEffect } from 'react';
import './RightPanel.css';
import ProblemCard from '../Cards/ProblemCard';
import OptionButtons from './OptionButtons';
import VoteForm from './VoteForm';
import { Player } from '../../models/Player';

const RightPanel = ({ 
  problem, 
  options, 
  onSelectOption, 
  isScoringPhase, 
  voter,
  onVote, 
  gameInfo,
  player,
}) => {
  // gameInfo'yu console'a yazdır (doğru alanı kullanarak)
  console.log("RightPanel - gameInfo:", gameInfo);
  console.log("RightPanel - policies:", gameInfo?.policies); // countryPolicies yerine policies
  
  // Seçenek seçildiğinde console.log işlemi yapan wrapper fonksiyon
  const handleOptionSelect = (option) => {
    console.log("Seçilen seçenek:", option);
    console.log("Seçimi yapan ülke:", voter);
    console.log("Seçim anındaki gameInfo:", gameInfo);
    onSelectOption(option);
  };

  if (isScoringPhase) {
    return (
      <div className="vote-section">
        <VoteForm voter={voter} onVote={onVote} />
      </div>
    );
  }

  // gameInfo içindeki policies'den ülke politikasını al
  const countryPolicy = 
    player?.countryPolicy ||                     
    player?.policy ||                            
    (player?.countryName && gameInfo?.policies?.[player.countryName]) || // countryPolicies yerine policies  
    gameInfo?.policies?.[voter] ||        // countryPolicies yerine policies
    "Politika belirtilmemiş";                    

  return (
    <div className="right-panel">
      <div className="current-player">
        <p className="current-speaker">
          Sıradaki konuşmacı: <strong>{voter || player?.countryName || "..."}</strong>
        </p>
        <p className="current-policy">
          Politika: <strong>{countryPolicy}</strong>
        </p>
      </div>

      <div className="right-panel-content">
        <ProblemCard text={problem} />
        <div className="options-card">
          <OptionButtons options={options} onSelect={handleOptionSelect} />
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
