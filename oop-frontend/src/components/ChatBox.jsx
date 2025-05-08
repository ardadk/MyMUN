import './Css/ChatBox.css';

const ChatBox = ({ messages }) => {
  return (
    <div className="chatbox">
      <div className="chatbox-title">KONSEY KARARLARI</div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-message ${msg.type === 'problem' ? 'chat-problem' : `chat-${msg.country}`}`}
          >
            {msg.type === 'problem' ? (
              <>
                <strong>YENİ PROBLEM:</strong> {msg.text}
              </>
            ) : (
              <>
                <strong>{msg.country} ülkesi:</strong> {msg.text}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
