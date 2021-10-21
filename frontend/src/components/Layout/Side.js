import React from "react";
import billige from "../../assets/image/billige.PNG";
import eventImage from "../../assets/image/event.png";
import mock from "../../assets/image/mock.jpg";
import "./Layout.css";
const Side = () => {
  return (
    <div className="sidebar">
      <img className="logo" src={billige} alt="billige" width="300px" />
      <br />
      <img className="eventimage" src={eventImage} alt="event" width="300px" />
      <br />

      <div className="mock">
      <img className="mock-image" src={mock} alt="event" width="300px" />
      </div>
    </div>
  );
};

export default Side;
