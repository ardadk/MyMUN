import React, { useEffect, useState, useRef } from 'react';
import './Css/ChatBox.css';

const ChatBox = ({ problem = "", selectedOptions = [] }) => {
  const [allMessages, setAllMessages] = useState([]);
  const processedOptionsRef = useRef(new Set());
  
  // Bileşen ilk yüklendiğinde tüm seçenekleri işle
  useEffect(() => {
    if (!selectedOptions || selectedOptions.length === 0) return;
    
    const newMessages = [];
    
    // Problem mesajı kaldırıldı
    
    // Tüm seçenekleri ekle (daha önce eklenmemişlerse)
    selectedOptions.forEach(option => {
      const optionId = `${option.voter}-${option.text}`;
      
      if (!processedOptionsRef.current.has(optionId)) {
        processedOptionsRef.current.add(optionId);
        
        newMessages.push({
          country: option.voter || "Sistem",
          text: option.text || "Seçenek seçildi",
          isProblem: false,
          timestamp: new Date().getTime()
        });
      }
    });
    
    if (newMessages.length > 0) {
      setAllMessages(prev => [...prev, ...newMessages]);
    }
  }, [selectedOptions]); // problem dependency'den çıkartıldı

  return (
    <div className="chatbox">
      <div className="chatbox-title">KONSEY</div>
      <div className="chatbox-messages">
        {allMessages.length > 0 
          ? allMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`chat-message chat-${msg.country}`}
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
