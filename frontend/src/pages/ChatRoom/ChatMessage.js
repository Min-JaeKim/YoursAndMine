import React, { useEffect, useState } from "react";
import chatProfile from "../../assets/icons/chat-profile.png";

function ChatMessage({ profileImg, msg, to }) {
  const myId = JSON.parse(localStorage.getItem("user")).userId;

  return (
    <>
      {parseInt(msg.author) !== myId ? ( // 받은 메시지
        <div className="receive-msg-box">
          <div className="receive-profile-img">
            {profileImg ? (
              <img src={profileImg} alt="profile"></img>
            ) : (
              <img src={chatProfile} alt="profile"></img>
            )}
          </div>
          <div className="receive-msg-content">{msg.message}</div>
          <div className="receive-msg-time">{msg.timestamp}</div>
        </div>
      ) : (
        <div className="send-msg-box">
          <div className="send-msg-time">{msg.timestamp}</div>
          <div className="send-msg-content">{msg.message}</div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
