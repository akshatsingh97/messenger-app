import React, { useState } from "react";
import { useMessenger } from "../MessengerContext";

const ChatWindow = () => {
  const { selectedFriend, messages, handleSendMessage, currentUser } = useMessenger();
  const [input, setInput] = useState("");

  const chatMessages = messages[currentUser]?.[selectedFriend] || [];

  const sendMessage = () => {
    if (input.trim()) {
      handleSendMessage(selectedFriend, input.trim());
      setInput("");
    }
  };

  return (
    <div className="chat-window">
      <h3>Chat with {selectedFriend}</h3>
      <div className="messages">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "me" ? "my-message" : "their-message"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;