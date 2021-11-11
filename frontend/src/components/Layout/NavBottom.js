import React, { useState, useEffect } from "react";
import "./Layout.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import homeIcon from "../../assets/icons/home.png";
import homeIconOn from "../../assets/icons/home-on.png";

import star from "../../assets/icons/star.png";
import plus from "../../assets/icons/plus.png";
import chat from "../../assets/icons/chat.png";
import myPage from "../../assets/icons/my.png";
import starOn from "../../assets/icons/star-on.png";
import plusOn from "../../assets/icons/plus-on.png";
import chatOn from "../../assets/icons/chat-on.png";
import myPageOn from "../../assets/icons/my-on.png";
import notification from "../../assets/icons/notification.png";
import notificationOn from "../../assets/icons/notification-on.png";

import ChatInput from "../../pages/ChatRoom/ChatInput";

const NavBottom = (props) => {
  
  let { loginFlag } = useSelector(({ user }) => ({
    loginFlag: user.login,
  }));

  const [pathname, setPathname] = useState();

  useEffect(() => {
    const url = props.location.pathname.split("/");
    if (url.length >= 2 && url[1] === "chat") setPathname(url[2]);
    return () => {};
  }, [props.location.pathname]);

  return (
    <>
      {pathname ? (
        <div className="nav-bottom">
          <ChatInput />
        </div>
      ) : (
        <div className="nav-bottom">
          <Link to="/">
            <div className="nav-bottom-items">
              {props.location.pathname === "/" ? (
                <img src={homeIconOn} alt="homeIconOn" className="nav-bottom-home" />
              ) : (
                <img src={homeIcon} alt="homeIcon" className="nav-bottom-home" />
              )}
              <div>홈</div>
            </div>
          </Link>
          <Link to="/chat">
            <div className="nav-bottom-items">
              {props.location.pathname === "/chat" ? (
                <img src={chatOn} alt="chatIconOn" className="nav-bottom-chatting" />
              ) : (
                <img src={chat} alt="chatIcon" className="nav-bottom-chatting" />
              )}
              <div>채팅</div>
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
          <Link to="/notice">
            <div className="nb-notification-all">

              <div className="nav-bottom-items">
                {props.location.pathname === "/notice" ? (
                  <img src={notificationOn} alt="starIconOn" className="nav-bottom-like" />
                ) : (
                  <img src={notification} alt="starIcon" className="nav-bottom-like" />
                )}
                <div>알림</div>
              </div>
              <div className="nb-notification-dot"></div> {/* 새로운 알림 표시 */}
            </div>
          </Link>
          {localStorage.getItem('token') ? (
            <Link to="/mypage">
              <div className="nav-bottom-items">
                {props.location.pathname === "/mypage" ? (
                  <img src={myPageOn} alt="myPageIconOn" className="nav-bottom-mypage" />
                ) : (
                    <img src={myPage} alt="myPageIcon" className="nav-bottom-mypage" />
                    )}
                <div>마이페이지</div>
              </div>
            </Link>

          ) : (
            <Link to="/signin">
              <div className="nav-bottom-items">
                {props.location.pathname === "/mypage" ? (
                  <img src={myPageOn} alt="myPageIconOn" className="nav-bottom-mypage" />
                ) : (
                    <img src={myPage} alt="myPageIcon" className="nav-bottom-mypage" />
                )}
               <div>로그인</div>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default NavBottom;
