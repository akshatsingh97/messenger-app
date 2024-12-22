import React from "react";
import "./App.css"
import { MessengerProvider, useMessenger } from "./MessengerContext";
import FriendList from "./components/FriendList";
import ChatWindow from "./components/ChatWindow";

const AppContent = () => {
  const { currentUser, setCurrentUser, selectedFriend, handleLogout } = useMessenger();

  if (!currentUser) {
    return (
      <div className="login-screen">
        <h1>Welcome to the Messenger App</h1>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Enter your username"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              setCurrentUser(e.target.value.trim());
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="messenger-app">
      <FriendList />
      {selectedFriend ? (
        <ChatWindow />
      ) : (
        <div className="welcome-message">Select a friend to start chatting!</div>
      )}
      <div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

const App = () => (
  <MessengerProvider>
    <AppContent />
  </MessengerProvider>
);

export default App;