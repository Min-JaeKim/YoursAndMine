import React from "react";

import "./Layout.css";
const Footer = () => {
  return (
    <div className="footer">
      빌리지
      <hr />
      <div className="footer-team">
        <div className="footer-member">
          <p>
            박혜빈 김민재 이진호 최동욱 정진주
            <br /> 월 ~ 금 09 : 00 ~ 18 : 00
          </p>
        </div>
        <div className="footer-member-right">
          <div className="footer-team-icon">
            <p className="footer-team-num">서울 4반 1팀</p>
          </div>
        </div>
      </div>
      <div className="footer-desc">
        빌리지는 통신판매중개업자이며 통신판매의 거래당사자가 아닙니다
        <br />
        사용자간 상품 및 거래에 대해 빌리지는 일체 책임을 지지 않습니다.
      </div>
    </div>
  );
};

export default Footer;
