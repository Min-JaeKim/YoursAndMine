import React from "react";
import "./ChatDetail.css";
import { Link } from "react-router-dom";

import defaultUserImage from "../../assets/image/defaultuser.png";
// 채팅방 버튼
function ChatDetail({ user }) {
  return (
    <Link to={`/chat/` + user.username}>
      <div className="user-detail">
        <div class="profile-img">
          {user.profileImg ? (
            <img src={user.profileImg} alt="profile"></img>
          ) : (
            <img src={defaultUserImage} alt="profile"></img>
          )}
        </div>
        <div className="user-info">
          <div className="user-header">
            <div className="user-name">{user.username}</div>
            <div className="user-location">{user.location}</div>
          </div>
          <div className="user-footer">{user.msg}</div>
        </div>
        <div className="product-img">
          {user.productImg ? (
            <img src={user.productImg} alt="product"></img>
          ) : (
            <img src={defaultUserImage} alt="product"></img>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ChatDetail;
