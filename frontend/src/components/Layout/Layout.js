import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import NavBottom from "./NavBottom";
import Side from "./Side";

import { withRouter } from "react-router-dom";
import "./Layout.css";
import FloatButton from "./FloatButton";

const Layout = (props) => {
  return (
    <div className="layout-wrap">
      <div className="layout" id="layout">
        <Header location={props.location} history={props.history} />
        <section id="section">
          <main id="main">{props.children}</main>
          <Footer />
        </section>
        <NavBottom location={props.location} />
        <FloatButton />
      </div>
      <Side />
    </div>
  );
};

export default withRouter(Layout);
