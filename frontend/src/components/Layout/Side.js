import React from "react";
import yam from "../../assets/image/yam.png";
import eventImage from "../../assets/image/event.png";
import mock from "../../assets/image/mock.jpg";
import "./Layout.css";
const Side = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-contents">
        <img className="logo" src={yam} alt="yam" width="300px" />
        <br />
        <img className="eventimage" src={eventImage} alt="event" width="300px" />
        <br />

        <div className="mock">
          <img className="mock-image" src={mock} alt="event" width="300px" />
        </div>
      </div>
    </div>
  );
};

export default Side;
