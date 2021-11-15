import React from "react";
import "./ChatItemHeader.css";
import { Link } from "react-router-dom";

function ChatItemHeader(props) {
  return (
    <div className="chat-item-header">
      <img className="chat-item-img" alt="item-img" src={props.itemInfo.itemImg}></img>
      <div className="chat-item-name">
        <p>{props.itemInfo.itemName}</p>
      </div>
      <Link to={{ pathname: `/detail/` + props.itemInfo.itemPk, state: {} }}>
        <div className="chat-item-btn">게시글 보기</div>
      </Link>
    </div>
  );
}

export default ChatItemHeader;
