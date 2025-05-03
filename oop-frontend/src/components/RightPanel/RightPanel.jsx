import React from 'react';
import './RightPanel.css';
import ProblemCard from '../Cards/ProblemCard';
import OptionButtons from './OptionButtons';
import Scoreboard from './Scoreboard';
import VoteForm from './VoteForm';

export default function RightPanel({
  problem,
  currentCountry,
  options,
  onSelectOption,
  isScoringPhase,
  voter,
  onVote,
  totalScores,
  voteCounts
}) {
  if (isScoringPhase) {
    return (
      <div className="vote-section">
        <VoteForm voter={voter} onVote={onVote} />
      </div>
    );
  }

  return (
    <div className="right-panel-content">
      <ProblemCard text={problem} />

      <p className="current-speaker">
        Sıradaki konuşmacı: <strong>Ülke {currentCountry}</strong>
      </p>

      <div className="options-card">
        <OptionButtons options={options} onSelect={onSelectOption} />
      </div>

      <Scoreboard totalScores={totalScores} voteCounts={voteCounts} />
    </div>
  );
}
