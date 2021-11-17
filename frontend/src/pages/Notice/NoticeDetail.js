import React from "react";
import "./Notice.css";
import defaultUserImage from "../../assets/image/defaultuser.png";

function NoticeDetail({ notice }) {
  return (
    <div className="user-detail">
      <div className="profile-img">
        {notice.profileImg ? (
          <img src={notice.profileImg} alt="profile"></img>
        ) : (
          <img src={defaultUserImage} alt="profile"></img>
        )}
      </div>
      <div className="user-info">
        <div className="user-header">
          <div className="notice-msg">{notice.msg}</div>
        </div>
      </div>
      <div className="chat-product-img">
        {notice.productImg ? (
          <img src={notice.productImg} alt="product"></img>
        ) : (
          <img src={defaultUserImage} alt="product"></img>
        )}
      </div>
    </div>
  );
}

export default NoticeDetail;
