import React, { useEffect, useState } from "react";
import chatProfile from "../../assets/icons/chat-profile.png";

function ChatMessage({ setOpenReserve, profileImg, msg, to }) {
  const myId = JSON.parse(localStorage.getItem("user")).userId;

  const openCalendar = () => {
    setOpenReserve({
      type: "check",
      selectionRange: {
        startDate: JSON.parse(msg.message).startDate,
        endDate: JSON.parse(msg.message).endDate,
        key: "selection",
      },
    });
  };

  return (
    <>
      {msg.type === "send" || msg.type === "message" ? (
        parseInt(msg.author) !== myId ? ( // 받은 메시지
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
        )
      ) : null}
      {msg.type === "reserve" ? ( // 예약 메시지
        parseInt(msg.author) !== myId ? ( // 예약 요청 수신
          <div className="receive-msg-box">
            <div className="receive-profile-img">
              {profileImg ? (
                <img src={profileImg} alt="profile"></img>
              ) : (
                <img src={chatProfile} alt="profile"></img>
              )}
            </div>
            <div className="receive-msg-content">
              거래를 요청하였습니다.
              <button onClick={openCalendar} className="chat-msg-btn">
                확인하기
              </button>
            </div>
            <div className="receive-msg-time">{msg.timestamp}</div>
          </div>
        ) : (
          // 송신
          <div className="send-msg-box">
            <div className="send-msg-time">{msg.timestamp}</div>
            <div className="send-msg-content">
              거래를 요청하였습니다.
              <button onClick={openCalendar} className="chat-msg-btn">
                확인하기
              </button>
              {/* {msg.message} */}
            </div>
          </div>
        )
      ) : null}
    </>
  );
}

export default ChatMessage;
