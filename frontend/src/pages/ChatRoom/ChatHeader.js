import React from "react";
import "./ChatRoom.css";
import backIcon from "../../assets/icons/back.png";

function ChatHeader(props) {
  const onClickToChat = () => {
    props.setChatOpen();
  };
  return (
    <div className="chat-header">
      <div className="chat-header-content">
        <img src={backIcon} alt="homeIcon" className="header-icon" onClick={onClickToChat} />
        {props.to} 님과의 대화
      </div>
    </div>
  );
}

export default ChatHeader;
