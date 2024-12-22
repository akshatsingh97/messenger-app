import React, { createContext, useState, useEffect, useContext } from "react";

const MessengerContext = createContext();

export const MessengerProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});

  
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || {};
    const savedUser = localStorage.getItem("currentUser");
    setMessages(savedMessages);
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
    if (currentUser) localStorage.setItem("currentUser", currentUser);
  }, [messages, currentUser]);

  const handleSendMessage = (friend, message) => {
    if (!currentUser || !friend || !message.trim()) return;
  
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
  
      if (!updatedMessages[currentUser]) {
        updatedMessages[currentUser] = {};
      }
      if (!updatedMessages[friend]) {
        updatedMessages[friend] = {};
      }
  
      updatedMessages[currentUser][friend] = [
        ...(updatedMessages[currentUser][friend] || []),
        { text: message, sender: "me", timestamp: Date.now() },
      ];
  
      updatedMessages[friend][currentUser] = [
        ...(updatedMessages[friend][currentUser] || []),
        { text: message, sender: currentUser, timestamp: Date.now() },
      ];
  
      return updatedMessages;
    });
  };

  const addFriend = (friend) => {
    if (!friend || messages[currentUser]?.[friend]) {
      return;
    }
  
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
  
      updatedMessages[currentUser] = {
        ...(updatedMessages[currentUser] || {}),
        [friend]: [],
      };
  
      updatedMessages[friend] = {
        ...(updatedMessages[friend] || {}),
        [currentUser]: [],
      };
  
      return updatedMessages;
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("messages");
  };

  return (
    <MessengerContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        selectedFriend,
        setSelectedFriend,
        messages,
        handleSendMessage,
        addFriend,
        handleLogout,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};

export const useMessenger = () => useContext(MessengerContext);