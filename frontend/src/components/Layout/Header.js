import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import "./Layout.css";
import CurrentPage from "./CurrentPage";
import backIcon from "../../assets/icons/back.png";
import categoryImg from "../../assets/icons/category.png";

import axios from "../../api/axios";
import Swal from 'sweetalert2'

const Header = (props) => {
  const history = useHistory();

  let { user, loginFlag } = useSelector(({ user }) => ({
    user: user.user,
    loginFlag: user.login,
  }));

  const [userAddress, setUserAddress] = useState(null);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {

    if (token) {
      axios
      .get(`/api/user/mypage`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        })
        .then((response) => {
          setUserAddress(response.data.userAddress.split(' '))
        })
        .catch((error) => {
          console.log('header errer')
          console.log(error)
          setUserAddress(null);
          Swal.fire({
            title: 'Error!',
            text: '다시 로그인해 주세요',
            icon: 'error',
            confirmButtonText: 'OK!',
            confirmButtonColor: '#497c5f'
          }).then((result) => {
            history.push('/signin');
          })
        });
    }

    }, [token]);
    
  useEffect(() => {
    if (user?.userAddress) {
      setUserAddress(user.userAddress.split(' '));
    } else {
      setUserAddress(null);
    }
  }, [user])

  const onClickCategory = () => {
    // history.push('/category');
    history.push({
      pathname: "/category",
      state: {
        flag: 2,
      },
    });
  };

  const beforePage = () => {
    props.history.goBack();
  };

  const checkUserAddress = () => {
    if (userAddress === null){
      if (loginFlag) {
        return (
          <Link to="/searchplace">주소를 지정해 주세요</Link>
        )
      } else {
        return (
          <Link to="/signin">주소를 지정해 주세요</Link>
        )
      }
    } else {
      return (
        <Link to="/searchplace">{userAddress[0] + ' ' + userAddress[1] + ' ' + userAddress[2]}</Link>
      )
    }
  }

  return (
    <div className="header">
      {props.location.pathname === "/" ? (
        <div className="header-location">
          {checkUserAddress()}
          <img
            className="hd-location-category-img"
            src={categoryImg}
            alt="category"
            onClick={onClickCategory}
          />
          {/* <img className="hd-category-img" src={categoryImg} alt="category-image" onClick={onClickCategory}/> */}
        </div>
      ) : (
        <div className="hd-pages">
          <div className="header-pages">
            <img src={backIcon} alt="homeIcon" className="header-icon" onClick={beforePage} />
            <CurrentPage url={props.location.pathname} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
