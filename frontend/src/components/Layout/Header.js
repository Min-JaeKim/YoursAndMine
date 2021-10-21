import React from "react";
import backIcon from "../../assets/icons/back.png";
import { Link } from "react-router-dom";

import CurrentPage from "./CurrentPage";

import "./Layout.css";
const Header = (props) => {
  const beforePage = () => {
    props.history.goBack();
  };
  const userdata = JSON.parse(window.localStorage.getItem("user"));
  let address;
  
  address = userdata ? userdata.userAddress : '서울시 강남구'
  if (address !== '서울시 강남구') {
    let addressArray = address.split(' ');
    address = addressArray[0] + ' ' + addressArray[1] + ' ' + addressArray[2];
    // console.log(address)
  }


  return (
    <div className="header">
      {props.location.pathname === "/" ? (
        <div className="header-location">
          <Link to="/searchplace">{address}</Link>
        </div>
      ) : (
        <div className="header-pages">
          <img
            src={backIcon}
            alt="homeIcon"
            className="header-icon"
            onClick={beforePage}
          />
          <CurrentPage url={props.location.pathname} />
        </div>
      )}
    </div>
  );
};

export default Header;
