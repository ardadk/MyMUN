import React, { useState, useEffect } from 'react';
import './Css/ChatBox.css';

const ChatBox = ({ messages = [], currentProblem = '', currentPlayer = '', isScoringPhase = false }) => {
  const [savedDecisions, setSavedDecisions] = useState([]);
  
  useEffect(() => {
    // Keep previous decisions and add new ones
    const newDecisions = messages.filter(msg => 
      msg.country && 
      msg.selectedOption && 
      msg.problem &&
      msg.turn
    );
    
    if (newDecisions.length > 0) {
      setSavedDecisions(prev => {
        // Combine previous and new decisions, remove duplicates
        const combined = [...prev, ...newDecisions];
        return combined.filter((decision, index, self) => 
          index === self.findIndex(d => 
            d.country === decision.country && 
            d.turn === decision.turn
          )
        );
      });
    }
  }, [messages]);

  // Get decisions for current player
  const playerDecisions = savedDecisions.filter(msg => msg.country === currentPlayer);

  if (isScoringPhase) return null;

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Ülke {currentPlayer} Geçmiş Kararları</h3>
      </div>
      
      <div className="current-problem">
        <h4>Mevcut Soru:</h4>
        <p>{currentProblem}</p>
      </div>

      <div className="chatbox-messages">
        <h4>Önceki Kararlar:</h4>
        {playerDecisions.map((msg, index) => (
          <div key={`${msg.country}-${msg.turn}-${index}`} className="chat-message">
            <div className="message-header">
              <span className="turn">{msg.turn}. Tur</span>
            </div>
            <div className="message-content">
              <div className="previous-question">
                <strong>Soru:</strong>
                <p>{msg.problem}</p>
              </div>
              <div className="given-answer">
                <strong>Seçilen Cevap:</strong>
                <p>{msg.selectedOption.text}</p>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
