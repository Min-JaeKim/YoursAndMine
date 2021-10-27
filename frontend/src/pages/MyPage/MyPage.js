import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import profile from "../../assets/image/user.png";
import star from "../../assets/icons/star.png";
import arrow from "../../assets/icons/arrow-right.png";
import product from "../../assets/icons/product.png";
import productlist from "../../assets/icons/productlist.png";
import "./MyPage.css";
import axios from "axios";
import allActions from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import authLevel1 from "../../assets/icons/auth-level1.png";
import authLevel2 from "../../assets/icons/auth-level2.png";
import authLevel3 from "../../assets/icons/auth-level3.png";

const MyPage = () => {
  const [wallet, setWallet] = useState(true);
  const [currentUserWallet, setCurrentUserWallet] = useState("");
  const [bliAmount, setbliAmount] = useState("");
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({});
  const btn = useRef();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(allActions.userActions.logoutUser());
    alert("로그아웃 되었습니다");
  };

  return (
    <div className="mypage">
      <div className="mypage-profile">
        <img src={profile} alt="profile-img" className="mypage-user-icon" />
        <div className="mypage-profile-desc">
          <h4>{user.userName} 님 안녕하세요!</h4>
          <span>{user.userEmail}</span>
        </div>
      </div>
      <Link to="/useredit">
        <button className="mypage-useredit">프로필 수정</button>
      </Link>
      <div className="auth-box">
        <div className="auth-header">
          사용자 인증단계
          <button>사용자인증 &#62;</button>
        </div>
        <img alt="auth-level1" src={authLevel1}></img>
      </div>

      <div className="mypage-user-info">
        <Link to="/myproduct">
          <div className="user-info">
            <img src={product} width="30px" alt="eth" />
            <p>등록한 제품</p>
          </div>
        </Link>

        <Link to="/tradelog">
          <div className="user-info">
            <img src={productlist} width="30px" alt="eth" />
            <p>대여내역</p>
          </div>
        </Link>

        <Link to="/wish">
          <div className="user-info">
            <img src={star} width="30px" alt="eth" />
            <p>찜</p>
          </div>
        </Link>

        <Link to="/myschedule">
          <div className="user-calendar">
          <FontAwesomeIcon icon={faCalendarAlt} size="2x" style={{ color: "#7d7d7d"}}/>
            <p>나의 일정</p>
          </div>
        </Link>
      </div>

      <div className="division-bar"></div>

      <div className="mypage-options">
        <Link to="/signin">
          <div className="mypage-option">
            <p>로그인 (임시)</p> <img src={arrow} width="20px" alt="arrow" />
          </div>
        </Link>

        <Link to="/tradelog">
          <div className="mypage-option">
            <p>거래내역</p>
            <img src={arrow} width="20px" alt="arrow" />
          </div>
        </Link>

        <Link to="/">
          <div className="mypage-option" onClick={logout}>
            <p>로그아웃</p> <img src={arrow} width="20px" alt="arrow" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
