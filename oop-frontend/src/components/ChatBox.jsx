import './Css/ChatBox.css';

const ChatBox = ({ messages }) => {
  return (
    <div className="chatbox">
      <div className="chatbox-title">KONSEY</div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message chat-${msg.country}`}>
            <strong>{msg.country}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
