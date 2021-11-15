import React, { useState, useRef, useEffect } from "react";
import "./MyPage.css";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import allActions from "../../redux/actions";
import star from "../../assets/icons/star.png";
import profile from "../../assets/image/user.png";
import arrow from "../../assets/icons/arrow-right.png";
import product from "../../assets/icons/product.png";
import productlist from "../../assets/icons/productlist.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import authLevel1 from "../../assets/icons/auth-level1.png";
import authLevel2 from "../../assets/icons/auth-level2.png";
import authLevel3 from "../../assets/icons/auth-level3.png";

import Swal from "sweetalert2";

const MyPage = () => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({});
  const btn = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));

    // axios
    // .get(`user/mypage/`, {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    //   })
    //   .then((response) => {
    //     setUser(response.data);
    //     dispatch(allActions.userActions.loginUser(response.data));
    //   })
    //   .catch((error) => {
    //     Swal.fire({
    //       title: 'Error!',
    //       text: '다시 로그인해 주세요',
    //       icon: 'error',
    //       confirmButtonText: 'OK!',
    //       confirmButtonColor: '#497c5f'
    //     }).then((result) => {
    //       history.push('/signin');
    //     })
    //   });
  }, []);

  const logout = () => {
    dispatch(allActions.userActions.logoutUser());
    Swal.fire({
      title: "Log out!",
      text: "로그아웃되었습니다.",
      icon: "success",
      confirmButtonText: "OK!",
      confirmButtonColor: "#497c5f",
    }).then((result) => {
      history.push("/");
    });
  };

  return (
    <div className="mypage">
      <div className="mypage-profile">
        {user.userImage ? (
          <img src={user.userImage} alt="profile-img" className="mypage-user-icon" />
        ) : (
          <img src={profile} alt="profile-img" className="mypage-user-icon" />
        )}
        <div className="mypage-profile-desc">
          <h4>{user.userNickname} 님 안녕하세요!</h4>
          <span>{user.userAddress}</span>
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
        {user.userAuthLevel === 1 ? (
          <img alt="auth-level1" src={authLevel1}></img>
        ) : user.userAuthLevel === 2 ? (
          <img alt="auth-level1" src={authLevel2}></img>
        ) : (
          <img alt="auth-level1" src={authLevel3}></img>
        )}
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
            <FontAwesomeIcon icon={faCalendarAlt} size="2x" style={{ color: "#7d7d7d" }} />
            <p>나의 일정</p>
          </div>
        </Link>
      </div>

      <div className="division-bar"></div>

      <div className="mypage-options">
        {/* <Link to="/signin">
          <div className="mypage-option">
            <p>로그인 (임시)</p> <img src={arrow} width="20px" alt="arrow" />
          </div>
        </Link> */}

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
