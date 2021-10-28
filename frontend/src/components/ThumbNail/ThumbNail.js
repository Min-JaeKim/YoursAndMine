import React from "react";
import { Link } from "react-router-dom";

import "./ThumbNail.css";
const ThumbNail = (props) => {
  return (
    <div className="main-item-box">
      <Link to={`/detail/${props.product.itemId}`}>
        <div className="thumbnail">
          <img alt="product" src={props.product.itemImage}></img>
          {/* {props.product.isRent === "true" ? (
            <span className="ribbon-angle">
              <small className="card-ribbon">{"대여중"}</small>
            </span>
          ) : (
            ""
          )} */}
        </div>
        <div className="main-item-name">{props.product.itemName}</div>
        <div className="main-item-price">₩ {props.product.itemPrice.toLocaleString("ko-KR")}</div>
      </Link>
    </div>
  );
};

export default ThumbNail;
