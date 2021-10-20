import React, { useEffect, useState } from "react";
import profile from "../../assets/image/defaultuser.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RentUserList.css";

const RentUserList = ({ history }) => {
  const { pNo } = useParams();
  const [rentUser, setRentUser] = useState([]);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/contract/my/${pNo}`, {
        headers: {
          Authentication: "Bearer " + token,
        },
      })
      .then((res) => {
        setRentUser(res.data);
        console.log(res.data);
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
          <img src={user.userImage} className="rent-user-image" alt="profile"></img>
          <div className="rent-user-vertical">
            <div className="rent-user-name">{user.username}</div>
            <span>{user.position}</span>
            <br />
            <span className="rent-user-period">
              {user.startDate.replaceAll("-", ".")} ~ {user.endDate.replaceAll("-", ".")}
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
