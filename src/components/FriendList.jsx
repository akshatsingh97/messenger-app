import React from "react";
import { useMessenger } from "../MessengerContext";

const FriendList = () => {
  const { currentUser, messages, addFriend, selectedFriend, setSelectedFriend } = useMessenger();

  const friends = Object.keys(messages[currentUser] || {});

  return (
    <div className="friend-list">
      <h3>List of {currentUser}'s Friends..</h3>
      <ul>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <li
            key={friend}
            onClick={() => setSelectedFriend(friend)}
            className={friend === selectedFriend ? "active" : ""}
          >
            {friend}
          </li>
        ))
      ): (
        <div>No friends added yet!</div>
        )}
      </ul>
      <input
        type="text"
        placeholder="Add a friend"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addFriend(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default FriendList;