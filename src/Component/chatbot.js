import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import "./chatbot.css";
import SendIcon from "@mui/icons-material/Send";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ChatIcon from "@mui/icons-material/Chat";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [minimized, setMinimized] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const chatContainerRef = useRef();

  useEffect(() => {
    fetch("/messages.json")
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);
  function processUserInput(userMessage) {
    let botResponse = "";
    const lowerCaseMessage = userMessage.toLowerCase();
    if (
      lowerCaseMessage.includes("wedding") ||
      lowerCaseMessage.includes("love and vows")
    ) {
      botResponse =
        "At Love and Vows, we're on a mission to turn your dream wedding into a reality! Our platform connects you with the best wedding shops and stylists, offering endless inspiration. What makes us special? Our exclusive discounts! Use our website coupons to create your dream wedding while staying within your budget, because your love story deserves nothing but the best. Are you ready to experience the magic of Love and Vows today?";
    } else if (
      lowerCaseMessage.includes("hello") ||
      lowerCaseMessage.includes("hi") ||
      lowerCaseMessage.includes("hey")
    ) {
      botResponse =
        "Hello! Congratulations on your upcoming wedding! What can we assist you with?";
    } else if (lowerCaseMessage.includes("coupon")) {
      botResponse =
        "Absolutely! We offer exclusive coupons to help you save on your dream wedding purchases. Explore our website to find amazing discounts from our partner shops.";
    } else if (lowerCaseMessage.includes("shops")) {
      botResponse =
        "You're in luck! Love and Vows connects you with the best wedding shops and stylists. Feel free to browse our platform to discover the perfect shops for your wedding needs.";
    } else if (
      lowerCaseMessage.includes("bride") ||
      lowerCaseMessage.includes("groom") ||
      lowerCaseMessage.includes("love") ||
      lowerCaseMessage.includes("your website") ||
      lowerCaseMessage.includes("website")
    ) {
      botResponse =
        "Congratulations on your upcoming wedding! Our platform is designed to cater to the needs of both brides and grooms. How can we assist you in your wedding preparations?";
    } else if (
      lowerCaseMessage.includes("hair") ||
      lowerCaseMessage.includes("makeup") ||
      lowerCaseMessage.includes("dress") ||
      lowerCaseMessage.includes("outfit") ||
      lowerCaseMessage.includes("spa") ||
      lowerCaseMessage.includes("heels") ||
      lowerCaseMessage.includes("beard") ||
      lowerCaseMessage.includes("watch") ||
      lowerCaseMessage.includes("needs") ||
      lowerCaseMessage.includes("nails") ||
      lowerCaseMessage.includes("photographer")
    ) {
      botResponse =
        "We've got you covered! Love and Vows is your one-stop destination for all your wedding needs.  Use our website coupons to create your dream wedding while staying within your budget. We assure you that our website will cover all your needs before your big day.";
    } else {
      botResponse =
        "I'm sorry, I don't have information on that topic. Please feel free to ask any other questions, or let us know how we can help with your wedding preparations.";
    }

    return botResponse;
  }

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const userMessage = inputMessage.trim();
      const botResponse = processUserInput(userMessage);
      setMessages([
        ...messages,
        { role: "User", message: userMessage },
        { role: "Bot", message: botResponse },
      ]);

      setInputMessage("");
    }
  };
  const chatMessagesRef = useRef(null);

  const toggleChatWindow = () => {
    setMinimized(!minimized);
    setChatOpen(true);
  };
  const closeChatWindow = () => {
    setMinimized(true);
    setChatOpen(false);
  };

  // Render the chat icon, message bubble, and cancel button
  const renderChatHeader = () => {
    return (
      <div className="chat-header">
        <div className="chat-icon" onClick={toggleChatWindow}>
          <ChatIcon fontSize="large" />
        </div>
        {!minimized && (
          <div className="bubble-text">
            <p>
              Hi there{" "}
              <span role="img" aria-label="Wave">
                👋
              </span>{" "}
              How can I help you?
            </p>
          </div>
        )}{" "}
        {chatOpen && (
          <div className="cancel-button" onClick={closeChatWindow}>
            <HighlightOffIcon fontSize="small" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`chat-container ${minimized ? "minimized" : ""}`}>
      {renderChatHeader()}
      {!minimized && (
        <>
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                message={message.message}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={handleInputChange}
            />
            <button type="submit">
              <SendIcon fontSize="medium" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;
