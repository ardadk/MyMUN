import React from 'react';
import './RightPanel.css';
import Scoreboard from './Scoreboard';
import VoteForm from './VoteForm';
import ChatBox from '../ChatBox';

const RightPanel = ({ 
  isScoringPhase, 
  voter,
  onVote, 
  totalScores, 
  voteCounts, 
  chatMessages,
  players,
  gameInfo
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
      <h2 className="panel-title">Konsey Görüşmeleri</h2>
      
      {/* ChatBox only */}
      <ChatBox messages={chatMessages} />
      
      {/* Only one scoreboard - the floating one */}
      <div className="floating-scoreboard">
        <h3>GÜNCEL ORTALAMA PUANLAR</h3>
        <Scoreboard totalScores={totalScores} voteCounts={voteCounts} players={players} gameInfo={gameInfo} />
      </div>
    </div>
  );
}

export default RightPanel;
