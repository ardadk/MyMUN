// src/components/ChatBox/ChatBox.js
import React from 'react';
import './Css/ChatBox.css';

const ChatBox = ({ messages = [] }) => {
  return (
    <div className="chatbox">
      <div className="chatbox-title">KONSEY</div>
      <div className="chatbox-messages">
        {messages.length > 0 
          ? messages.map((msg, i) => (
              <div key={i} className={`chat-message chat-${msg.country}`}>
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
