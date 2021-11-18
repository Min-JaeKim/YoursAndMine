import "./TradeDetail.css";
import Swal from "sweetalert2";
import noImage from "../../assets/image/no-image.jpg";

import moment from 'moment';
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import React, { useState, useEffect } from "react";

const TradeDetail = () => {
  
  const history = useHistory();
  const location = useLocation();
  const flag = location.state.flag;

  const { cNo } = useParams();
  const [contract, setContract] = useState([]);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`user/item/receipt/${cNo}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setContract(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCompleteReturn = () => {
    axios
    .put(`/deal`, {
      dealId: contract.dealId,
    }, {
        headers: {
          Authorization: "Bearer " + token,
        }}
    )
      .then((response) => {
        setContract(response.data);
        axios
          .get(`user/item/receipt/${cNo}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setContract(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onCancelRent = () => {
    Swal.fire({
      title: "예약 취소하시겠습니까?",
      // text: "예약 취소가 되었습니다.",
      icon: "question",
      confirmButtonText: "OK!",
      confirmButtonColor: "#497c5f",
    }).then(() => {
        axios
          .delete(`/deal/${contract.dealId}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            history.push(`/rentuser/${contract.itemId}`);
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: '예약 취소가 되지 않았습니다.',
              icon: 'error',
              confirmButtonText: 'OK!',
              confirmButtonColor: '#497c5f'
            })
          });
    })
  }

  return (
    <>
    {flag === 1 ?
      <div className="trade-detail-body">
        <div className="trade-detail-product">
          <img src={contract.itemImage == null ? noImage : contract.itemImage} alt="product"></img>
          <div>
          <div className="trade-item-name">{contract.itemName}</div>
            <div className="td-item-address">{contract.itemAddress}</div>
          </div>
        </div>
        <div className="td-seller-buttons">
          {moment().format('YYYY-MM-DD') < contract.dealStartDate
            ?
            <button className="trade-cancel-button" onClick={onCancelRent}>예약 취소</button>
            :
            null
          }
          {contract.dealEndDate <= moment().format('YYYY-MM-DD') && contract.dealStatus !== "반납완료"
            ?
            <button className="td-success-trade-button" onClick={onCompleteReturn}>반납 완료</button>
            :
            null
          }
        </div>
        <div className="trade-detail-list">
          <div className="trade-detail-title">
            <div className="trade-detail-info">대여자</div>
            <div className="trade-detail-info">대여일</div>
            <div className="trade-detail-info">반납일</div>
            <div className="trade-detail-info">가격</div>
          </div>
          <div>
            <div className="trade-detail-info">{contract.itemBuyerNickname}</div>
            <div className="trade-detail-info">{contract.dealStartDate}</div>
            <div className="trade-detail-info">{contract.dealEndDate}</div>
            <div className="trade-detail-info">{contract.itemPrice} 원</div>
          </div>
        </div>
        <hr></hr>
        <div className="trade-detail-list">
          <div className="total">Total</div>
          <div className="trade-detail-price">{contract.dealTotalPrice} 원</div>
        </div>
      </div>
       : 
      <div className="trade-detail-body">
        <div className="trade-detail-product">
          <img src={contract.itemImage == null ? noImage : contract.itemImage} alt="product"></img>
          <div>
            <div className="trade-item-name">{contract.itemName}</div>
            <div className="td-item-address">{contract.itemAddress}</div>
          </div>
        </div>
        <div>
          <button className="trade-cancel-button">문의하기</button>
        </div>
        <div className="trade-detail-list">
          <div className="trade-detail-title">
            <div className="trade-detail-info">임대자</div>
            <div className="trade-detail-info">대여일</div>
            <div className="trade-detail-info">반납일</div>
            <div className="trade-detail-info">가격</div>
          </div>
          <div>
            <div className="trade-detail-info">{contract.itemSellerNickname}</div>
            <div className="trade-detail-info">{contract.dealStartDate}</div>
            <div className="trade-detail-info">{contract.dealEndDate}</div>
            <div className="trade-detail-info">{contract.itemPrice} 원</div>
          </div>
        </div>
        <hr></hr>
        <div className="trade-detail-list">
          <div className="total">Total</div>
          <div className="trade-detail-price">{contract.dealTotalPrice} 원</div>
        </div>
      </div>
    }
    </>
  );
};

export default TradeDetail;
