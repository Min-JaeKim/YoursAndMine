import React, { useState, useEffect } from "react";
import "./TradeDetail.css";
import noImage from "../../assets/image/no-image.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const TradeDetail = () => {
  const { cNo } = useParams();
  const [contract, setContract] = useState([]);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/contract/${cNo}`, {
        headers: {
          Authentication: "Bearer " + token,
        },
      })
      .then((response) => {
        setContract(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="trade-detail-body">
      <div className="trade-detail-product">
        <img src={contract.itemImage == null ? noImage : contract.itemImage} alt="product"></img>
        <div>
          <div className="trade-item-name">{contract.itemname}</div>
          <div>{contract.position}</div>
        </div>
      </div>
      <div>
        <button className="trade-cancel-button">대여취소</button>
      </div>
      <div className="trade-detail-list">
        <div className="trade-detail-title">
          <div className="trade-detail-info">대여자</div>
          <div className="trade-detail-info">대여일</div>
          <div className="trade-detail-info">반납일</div>
          <div className="trade-detail-info">가격</div>
        </div>
        <div>
          <div className="trade-detail-info">{contract.borrowerName}</div>
          <div className="trade-detail-info">{contract.startDate}</div>
          <div className="trade-detail-info">{contract.endDate}</div>
          <div className="trade-detail-info">{contract.price} BLI</div>
        </div>
      </div>
      <hr></hr>
      <div className="trade-detail-list">
        <div className="total">Total</div>
        <div className="trade-detail-price">{contract.totalPrice} BLI</div>
      </div>
    </div>
  );
};

export default TradeDetail;
