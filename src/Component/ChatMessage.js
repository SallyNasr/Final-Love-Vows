import React from "react";

const ChatMessage = ({ role, message }) => {
  return (
    <div className={`message ${role}`}>
      <div className="messageInput">{message}</div>
    </div>
  );
};

export default ChatMessage;
