import React from 'react';
import './RightPanel.css';
import ProblemCard from '../Cards/ProblemCard';
import OptionButtons from './OptionButtons';
import VoteForm from './VoteForm';

const RightPanel = ({ 
  problem, 
  options, 
  onSelectOption, 
  isScoringPhase, 
  voter,
  onVote, 
}) => {
  if (isScoringPhase) {
    return (
      <div className="vote-section">
        <VoteForm voter={voter} onVote={onVote} />
      </div>
    );
  }

  return (
    <div className="right-panel">
      <div className="current-player">
        <p className="current-speaker">
          Sıradaki konuşmacı: <strong>{voter || "..."}</strong>
        </p>
      </div>

      <div className="right-panel-content">
        <ProblemCard text={problem} />
        <div className="options-card">
          <OptionButtons options={options} onSelect={onSelectOption} />
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
