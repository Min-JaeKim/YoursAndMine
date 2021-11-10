import React, { useEffect } from "react";
import "./ChatDetail.css";
import { Link } from "react-router-dom";

import defaultUserImage from "../../assets/image/defaultuser.png";
// 채팅방 버튼
function ChatDetail(props) {
  const clickHandler = () => {
    props.setChatOpen(props.user);
  };

  return (
    <div className="user-detail" onClick={clickHandler}>
      <div className="profile-img">
        {props.profileImg ? (
          <img src={props.profileImg} alt="profile"></img>
        ) : (
          <img src={defaultUserImage} alt="profile"></img>
        )}
      </div>
      <div className="user-info">
        <div className="user-header">
          <div className="user-name">{props.partner}</div>
        </div>
        {/* <div className="user-footer">{user.msg}</div> */}
      </div>
      {/* <div className="chat-product-img">
          {user.productImg ? (
            <img src={user.productImg} alt="product"></img>
          ) : (
            <img src={defaultUserImage} alt="product"></img>
          )}
        </div> */}
    </div>
  );
}

export default ChatDetail;
