import React, { useEffect, useState, useRef } from 'react';
import './Css/ChatBox.css';

const ChatBox = ({ problem = "", selectedOptions = [] }) => {
  const [allMessages, setAllMessages] = useState([]);
  const prevProblemRef = useRef("");
  
  // Problem veya seçenekler değiştiğinde mesajları güncelle
  useEffect(() => {
    // Eğer yeni problem geldiyse ve öncekinden farklıysa ekle
    if (problem && problem !== prevProblemRef.current) {
      const problemMessage = {
        country: "Sistem",
        text: problem,
        isProblem: true,
        timestamp: new Date().getTime()
      };
      
      // Önceki mesajları koru ve problemi sona ekle
      setAllMessages(prev => [...prev, problemMessage]);
      prevProblemRef.current = problem;
    }
  }, [problem]);
  
  // Seçenekler değiştiğinde mesajları güncelle
  useEffect(() => {
    if (!selectedOptions || selectedOptions.length === 0) return;
    
    // En son eklenen seçeneği al
    const latestOption = selectedOptions[selectedOptions.length - 1];
    
    // Eğer bu seçenek henüz mesajlarda yoksa ekle
    if (latestOption && !allMessages.some(msg => 
        msg.text === latestOption.text && 
        msg.country === latestOption.voter)) {
      
      const newMessage = {
        country: latestOption.voter || "Sistem",
        text: latestOption.text || "Seçenek seçildi",
        isProblem: false,
        timestamp: new Date().getTime()
      };
      
      setAllMessages(prev => [...prev, newMessage]);
    }
  }, [selectedOptions, allMessages]);

  return (
    <div className="chatbox">
      <div className="chatbox-title">KONSEY</div>
      <div className="chatbox-messages">
        {allMessages.length > 0 
          ? allMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`chat-message ${msg.isProblem ? 'chat-problem' : `chat-${msg.country}`}`}
              >
                <strong>{msg.country}:</strong> {msg.text}
              </div>
            ))
          : <div className="chat-placeholder">Henüz mesaj yok</div>
        }
      </div>
    </div>
  );
}

export default ChatBox;
