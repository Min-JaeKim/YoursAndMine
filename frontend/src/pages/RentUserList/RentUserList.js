import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./RentUserList.css";
import profile from "../../assets/image/defaultuser.png";

// 대여자 목록
const RentUserList = ({ history }) => {
  const { pNo } = useParams();
  const [rentUser, setRentUser] = useState([]);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`/user/item/history/${pNo}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToTradeDetail = (contractId) => {
    history.push(`/tradedetail/${contractId}`);
  };

  return rentUser.map((user) => {
    return (
      <div className="rent-user">
        <div className="rent-user-list rent-user-box">
          <img src={user.itemBuyerImage} className="rent-user-image" alt="profile"></img>
          <div className="rent-user-vertical">
            <div className="rent-user-name">{user.itemBuyerNickname}</div>
            <span>{user.position}</span>
            <br />
            <span className="rent-user-period">
              {user.dealStartDate.replaceAll("-", ".")} ~ {user.dealEndDate.replaceAll("-", ".")}
            </span>
          </div>
        </div>
        <div className="rent-user-box">
          <button onClick={() => goToTradeDetail(user.contract_id)}>대여상세</button>
          <button>채팅하기</button>
        </div>
      </div>
    );
  });
};

export default RentUserList;
