import React from "react";
import { Link } from "react-router-dom";

import "./ThumbNail.css";
const ThumbNail = (props) => {
  const flag = props.flag;

  const onClickRentProduct = (dealId) => {

  }

  return (
    <>
    {flag === "3" ?
      <div className="main-non-member-item-box">
        <Link to={`/detail/${props.product.itemId}`}>
            <div className="thumbnail">
              <img className="main-non-member-img" alt="product" src={props.product.itemImage}></img>
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
      :
        <div className="main-item-box">
          {flag ===  "1" ?
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
          :
          <div onClick={onClickRentProduct(props.product.dealId)}>
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
            <div className="main-item-price">₩ {props.product.dealTotalPrice.toLocaleString("ko-KR")}</div>
          </div>
          }
        </div>
  }
  </>
  );
};

export default ThumbNail;
