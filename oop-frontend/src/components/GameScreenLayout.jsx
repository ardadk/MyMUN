// src/components/GameScreenLayout.jsx
import React, { useState, useEffect } from 'react';
import './Css/GameScreenLayout.css';
import ChatBox from './ChatBox';

export default function GameScreenLayout({ 
  left, 
  right, 
  messages = [], 
  currentProblem = '', 
  currentPlayer = '',
  isScoringPhase = false,
  children 
}) {
  // Seçenekler ve kararlar için ayrı state'ler
  const [options, setOptions] = useState([]);
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    if (messages) {
      // Sadece seçilmiş kararları filtrele (country ve selectedOption'ı olan mesajlar)
      const decisionMessages = messages.filter(msg => 
        msg.country && 
        msg.selectedOption && 
        msg.problem
      );
      
      console.log('GameScreenLayout - Filtered Decisions:', decisionMessages);
      setDecisions(decisionMessages);
    }
  }, [messages]);

  return (
    <div className="game-screen fade-in">
      <div className="game-layout">
        <div className="game-left-panel">{left}</div>
        <div className="game-right-panel">{right}</div>
        <ChatBox 
          messages={decisions}
          currentProblem={currentProblem}
          currentPlayer={currentPlayer}
          isScoringPhase={isScoringPhase}
        />
      </div>
      {children}
    </div>
  );
}
