import React, { useEffect, useState } from "react";
import chatProfile from "../../assets/icons/chat-profile.png";
import ChatCheck from "../../assets/icons/chat-check.png";

function ChatMessage({ setOpenReserve, profileImg, msg, to }) {
  const myId = JSON.parse(localStorage.getItem("user")).userId;

  const formatDate = (date) => {
    let d = new Date(date),
      time = "" + d.getHours(),
      minute = "" + d.getMinutes();

    if (time.length < 2) time = "0" + time;
    if (minute.length < 2) minute = "0" + minute;

    return [time, minute].join(":");
  };

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

  const drawMessage = (type) => {
    const author = parseInt(msg.author);

    if (type === "send" || type === "message") {
      // 기본 대화 메시지
      if (author !== myId) {
        // 내 메시지
        return (
          <div className="receive-msg-box">
            <div className="receive-profile-img">
              {profileImg ? (
                <img src={profileImg} alt="profile"></img>
              ) : (
                <img src={chatProfile} alt="profile"></img>
              )}
            </div>
            <div className="receive-msg-content">{msg.message}</div>
            <div className="receive-msg-time">{formatDate(msg.timestamp)}</div>
          </div>
        );
      } else {
        // 상대방 메시지
        return (
          <div className="send-msg-box">
            <div className="send-msg-time">{formatDate(msg.timestamp)}</div>
            <div className="send-msg-content">{msg.message}</div>
          </div>
        );
      }
    } else if (type === "reserve") {
      // 예약 요청 메시지
      if (author !== myId) {
        return (
          <div className="receive-msg-box">
            <div className="receive-profile-img">
              {profileImg ? (
                <img src={profileImg} alt="profile"></img>
              ) : (
                <img src={chatProfile} alt="profile"></img>
              )}
            </div>
            <div className="receive-reserve-content">
              거래를 요청하였습니다.
              <button onClick={openCalendar} className="chat-msg-btn">
                확인하기
              </button>
            </div>
            <div className="receive-msg-time">{formatDate(msg.timestamp)}</div>
          </div>
        );
      } else {
        return (
          <div className="send-msg-box">
            <div className="send-msg-time">{formatDate(msg.timestamp)}</div>
            <div className="send-reserve-content">
              거래를 요청하였습니다.
              {/* <button onClick={openCalendar} className="chat-msg-btn">
                확인하기
              </button> */}
              {/* {msg.message} */}
            </div>
          </div>
        );
      }
    } else if (type === "confirm") {
      // 거래 성사 메시지
      if (author !== myId) {
        return (
          <div>
            <div className="receive-msg-box">
              <div className="receive-profile-img">
                {profileImg ? (
                  <img src={profileImg} alt="profile"></img>
                ) : (
                  <img src={chatProfile} alt="profile"></img>
                )}
              </div>
              <div className="receive-check-content">
                <img alt="chat-check" src={ChatCheck} />
                거래가 수락되었습니다.
              </div>
              <div className="receive-msg-time">{formatDate(msg.timestamp)}</div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="send-msg-box">
            <div className="send-msg-time">{formatDate(msg.timestamp)}</div>
            <div className="send-check-content">
              <img alt="chat-check" src={ChatCheck} />
              거래가 수락되었습니다.
            </div>
          </div>
        );
      }
    } else if (type === "image") {
      if (author !== myId) {
        return (
          <div className="receive-msg-box">
            <div className="receive-profile-img">
              {profileImg ? (
                <img src={profileImg} alt="profile"></img>
              ) : (
                <img src={chatProfile} alt="profile"></img>
              )}
            </div>
            <div className="receive-msg-content">
              <img className="send-img" alt="imagemsg" src={msg.message}></img>
            </div>
            <div className="receive-msg-time">{formatDate(msg.timestamp)}</div>
          </div>
        );
      } else {
        return (
          <div className="send-msg-box">
            <div className="receive-msg-time">{formatDate(msg.timestamp)}</div>

            <div className="send-msg-content">
              <img className="send-img" alt="imagemsg" src={msg.message}></img>
            </div>
          </div>
        );
      }
    }
  };

  return <>{drawMessage(msg.type)}</>;
}

export default ChatMessage;
