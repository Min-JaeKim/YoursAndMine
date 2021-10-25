import React, { useEffect, useState } from "react";
import chatProfile from "../../assets/icons/chat-profile.png";

function ChatMessage({ profileImg, msg }) {
  return (
    <>
      {msg.type === "message" ? (
        <div className="receive-msg-box">
          <div className="receive-profile-img">
            {profileImg ? (
              <img src={profileImg} alt="profile"></img>
            ) : (
              <img src={chatProfile} alt="profile"></img>
            )}
          </div>
          <div className="receive-msg-content">{msg.content}</div>
          <div className="receive-msg-time">{msg.time}</div>
        </div>
      ) : null}

      {msg.type === "send" ? (
        <div className="send-msg-box">
          <div className="send-msg-time">{msg.time}</div>
          <div className="send-msg-content">{msg.content}</div>
        </div>
      ) : null}
    </>
  );
}

export default ChatMessage;
