import React, { useState, useEffect } from "react";
import "./ChatRoom.css";
import reserveBtn from "../../assets/icons/reserve-btn.png";
import { useParams } from "react-router";

function ReserveButton(props) {
  const openReserve = () => {
    props.setOpenReserve(true);
  };

  return (
    <>
      <div className="reserve-btn">
        <img src={reserveBtn} onClick={openReserve} alt="reserve-btn" />
      </div>
    </>
  );
}

export default ReserveButton;
