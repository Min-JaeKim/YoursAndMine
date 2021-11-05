import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentPage from "./CurrentPage";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import backIcon from "../../assets/icons/back.png";
import categoryImg from "../../assets/icons/category.png";


import "./Layout.css";
const Header = (props) => {
  const history = useHistory();

  let { user, loginFlag } = useSelector(({ user }) => ({
    user: user.user,
    loginFlag: user.login,
  }));

  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    if (user?.userAddress) {
      let rawUserAddress = user.userAddress.split(' ');
      setUserAddress(rawUserAddress);
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
          <Link to="/signin">로그인 시 주소 지정이 가능합니다</Link>
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
