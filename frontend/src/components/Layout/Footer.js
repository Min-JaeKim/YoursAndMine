import React, { useEffect, useState } from "react";
import "./Layout.css";

const Footer = (props) => {
  const [pathname, setPathname] = useState();
  useEffect(() => {
    // 채팅방 입장 시 Footer 제거
    const url = props.location.pathname.split("/");
    if (url.length >= 2 && url[1] === "chat") {
      setPathname(url[1]);
    } else {
      setPathname();
    }
  }, [props.location.pathname]);
  return (
    <>
      {pathname ? null : (
        <div className="footer">
          Yours And Mine
          <hr />
          <div className="footer-team">
            <div className="footer-member">
              <p>
                이진호 권영린 김민재 윤영은 황성현
                <br /> 월 ~ 금 09 : 00 ~ 18 : 00
              </p>
            </div>
            <div className="footer-member-right">
              <div className="footer-team-icon">
                <p className="footer-team-num">서울 1반 2팀</p>
              </div>
            </div>
          </div>
          <div className="footer-desc">
            얌(YAM)은 통신판매중개업자이며 통신판매의 거래당사자가 아닙니다
            <br />
            사용자간 상품 및 거래에 대해 얌(YAM)은 일체 책임을 지지 않습니다.
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
