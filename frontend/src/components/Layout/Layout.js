import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import NavBottom from "./NavBottom";
import Side from "./Side";
import ReserveButton from "../../pages/ChatRoom/ReserveButton";
import CalendarModal from "../../pages/ChatRoom/CalendarModal";

import { withRouter } from "react-router-dom";
import "./Layout.css";
import FloatButton from "./FloatButton";

const Layout = (props) => {
  const [isOpenReserve, setIsOpenReserve] = useState(false);

  return (
    <div className="layout-wrap">
      <div className="layout" id="layout">
        <Header location={props.location} history={props.history} />
        <section id="section">
          <main id="main">{props.children}</main>
          <Footer location={props.location} />
        </section>
        <NavBottom location={props.location} />
        {/* <FloatButton location={props.location} /> */}
        {/* <ReserveButton setOpenReserve={setIsOpenReserve} location={props.location} /> */}
        {/* <CalendarModal setOpenReserve={setIsOpenReserve} isOpen={isOpenReserve} /> */}
      </div>
      <Side />
    </div>
  );
};

export default withRouter(Layout);
