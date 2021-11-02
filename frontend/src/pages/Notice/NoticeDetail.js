import React from "react";
import { Link } from "react-router-dom";

import defaultUserImage from "../../assets/image/defaultuser.png";

function NoticeDetail({ notice }) {
  return (
    <Link to={{ pathname: `/chat/`, state: { profileImg: notice.profileImg } }}>
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
            <div className="user-name">{notice.username}</div>
            <div className="user-location">{notice.location}</div>
          </div>
          <div className="user-footer">{notice.msg}</div>
        </div>
        <div className="chat-product-img">
          {notice.productImg ? (
            <img src={notice.productImg} alt="product"></img>
          ) : (
            <img src={defaultUserImage} alt="product"></img>
          )}
        </div>
      </div>
    </Link>
  );
}

export default NoticeDetail;
