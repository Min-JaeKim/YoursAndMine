import React from "react";
import backIcon from "../../assets/icons/back.png";
import categoryImg from "../../assets/icons/category.png";
import { Link } from "react-router-dom";

import CurrentPage from "./CurrentPage";
import { useHistory } from "react-router";

import "./Layout.css";
const Header = (props) => {
  const history = useHistory();

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
  const userdata = JSON.parse(window.localStorage.getItem("user"));
  let address;

  address = userdata ? userdata.userAddress : "서울시 강남구";
  if (address !== "서울시 강남구") {
    let addressArray = address.split(" ");
    address = addressArray[0] + " " + addressArray[1] + " " + addressArray[2];
    // console.log(address)
  }

  return (
    <div className="header">
      {props.location.pathname === "/" ? (
        <div className="header-location">
          <Link to="/searchplace">{address}</Link>

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
