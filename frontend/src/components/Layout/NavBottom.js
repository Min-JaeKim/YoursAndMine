import React from "react";
import "./Layout.css";
import homeIcon from "../../assets/icons/home.png";
import homeIconOn from "../../assets/icons/home-on.png";

import star from "../../assets/icons/star.png";
import starOn from "../../assets/icons/star-on.png";
import plus from "../../assets/icons/plus.png";
import plusOn from "../../assets/icons/plus-on.png";
import chat from "../../assets/icons/chat.png";
import chatOn from "../../assets/icons/chat-on.png";
import myPage from "../../assets/icons/my.png";
import myPageOn from "../../assets/icons/my-on.png";
import { Link } from "react-router-dom";
const NavBottom = (props) => {
  return (
    <div className="nav-bottom">
      <Link to="/">
        <div className="nav-bottom-items">
          {props.location.pathname === "/" ? (
            <img
              src={homeIconOn}
              alt="homeIconOn"
              className="nav-bottom-home"
            />
          ) : (
            <img src={homeIcon} alt="homeIcon" className="nav-bottom-home" />
          )}
          <div>홈</div>
        </div>
      </Link>

      <Link to="/wish">
        <div className="nav-bottom-items">
          {props.location.pathname === "/wish" ? (
            <img src={starOn} alt="starIconOn" className="nav-bottom-like" />
          ) : (
            <img src={star} alt="starIcon" className="nav-bottom-like" />
          )}
          <div>찜</div>
        </div>
      </Link>
      <Link to="/write">
        <div className="nav-bottom-items">
          {props.location.pathname === "/write" ? (
            <img src={plusOn} alt="homeIcon" className="nav-bottom-writing" />
          ) : (
            <img src={plus} alt="homeIcon" className="nav-bottom-writing" />
          )}
          <div>글쓰기</div>
        </div>
      </Link>
      <Link to="/chat">
        <div className="nav-bottom-items">
          {props.location.pathname === "/chat" ? (
            <img
              src={chatOn}
              alt="chatIconOn"
              className="nav-bottom-chatting"
            />
          ) : (
            <img src={chat} alt="chatIcon" className="nav-bottom-chatting" />
          )}
          <div>채팅</div>
        </div>
      </Link>
      <Link to="/mypage">
        <div className="nav-bottom-items">
          {props.location.pathname === "/mypage" ? (
            <img
              src={myPageOn}
              alt="myPageIconOn"
              className="nav-bottom-mypage"
            />
          ) : (
            <img src={myPage} alt="myPageIcon" className="nav-bottom-mypage" />
          )}
          <div>마이페이지</div>
        </div>
      </Link>
    </div>
  );
};

export default NavBottom;
