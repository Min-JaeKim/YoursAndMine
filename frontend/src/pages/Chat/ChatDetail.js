import React, { useEffect } from "react";
import "./ChatDetail.css";
import { Link } from "react-router-dom";
import Newmsg from "../../assets/icons/new-msg.png";

import defaultUserImage from "../../assets/image/defaultuser.png";
// 채팅방 버튼

function ChatDetail(props) {
  const msgTime = Math.floor(
    (new Date().getTime() - Date.parse(props.conversation.timestamp)) / 1000 / 60
  );

  const clickHandler = () => {
    props.setChatOpen(props.user);
  };

  const convertTime = (time) => {
    let lastTime = "";
    if (time < 1) {
      lastTime = "방금 전";
    } else if (time < 60) {
      lastTime = time + "분 전";
    } else if (time < 24 * 60) {
      lastTime = Math.ceil(time / 60) + "시간 전";
    } else {
      lastTime = Math.ceil(time / 24) + "일 전";
    }
    return lastTime;
  };

  return (
    <div className="user-detail" onClick={clickHandler}>
      <div className="profile-img">
        {props.conversation.userImg ? (
          <img src={props.conversation.userImg} alt="profile"></img>
        ) : (
          <img src={defaultUserImage} alt="profile"></img>
        )}
      </div>
      <div className="user-info">
        <div className="user-header">
          <div className="user-name">{props.conversation.name}</div>
          <div className="user-footer">{props.conversation.lastMsg}</div>
        </div>
        <div className="msg-time">
          {props.conversation.newmsg ? <div className="new-msg"></div> : null}
          {convertTime(msgTime)}
        </div>
      </div>

      <div className="chat-product-img">
        <Link to={{ pathname: `/detail/` + props.conversation.itemPk, state: {} }}>
          {props.conversation.itemImg ? (
            <img src={props.conversation.itemImg} alt="product"></img>
          ) : (
            <img src={defaultUserImage} alt="product"></img>
          )}
        </Link>
      </div>
    </div>
  );
}

export default ChatDetail;
