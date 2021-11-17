import React from "react";
import "./ChatRoom.css";
import backIcon from "../../assets/icons/back.png";

import { useSelector } from "react-redux";

function ChatHeader(props) {
  const clientName = useSelector((state) => state.conversationlist[props.to].name);

  const onClickToChat = () => {
    props.setChatOpen();
  };
  return (
    <div className="chat-header">
      <div className="chat-header-content">
        <img src={backIcon} alt="homeIcon" className="header-icon" onClick={onClickToChat} />
        {clientName}
        <div className="chat-header-text"> 님과의 대화</div>
      </div>
    </div>
  );
}

export default ChatHeader;
