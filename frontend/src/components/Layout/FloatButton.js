import React, { useEffect, useState } from "react";
import up from "../../assets/icons/arrowUp.png";
const FloatButton = (props) => {
  // 채팅방 입장 시 Footer 제거
  const [pathname, setPathname] = useState();

  useEffect(() => {
    const url = props.location.pathname.split("/");
    if ((url.length >= 2 && url[1] === "chat") || url[1] === "detail") {
      // floatButton 안띄울 곳
      setPathname(url[2]);
    } else {
      // 나머지는 띄움
      setPathname();
    }
  }, [props.location.pathname]);

  const move = () => {
    const el = document.getElementById("section");
    el.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {pathname ? null : (
        <div className="floatbutton">
          <img
            src={up}
            alt="up"
            width="30px"
            height="30px"
            style={{ display: "inherit" }}
            onClick={move}
          />
        </div>
      )}
    </>
  );
};

export default FloatButton;
