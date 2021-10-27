import React, { useState, useEffect } from "react";
import "./ChatRoom.css";
import reserveBtn from "../../assets/icons/reserve-btn.png";

function ReserveButton(props) {
  const [pathname, setPathname] = useState();

  useEffect(() => {
    const url = props.location.pathname.split("/");
    if (url.length >= 2 && url[1] === "chat") setPathname(url[2]);
    return () => {};
  }, [props.location.pathname]);

  const openReserve = () => {
    props.setOpenReserve(true);
  };

  return (
    <>
      {pathname ? (
        <div className="reserve-btn">
          <img src={reserveBtn} onClick={openReserve} alt="reserve-btn" />
        </div>
      ) : null}
    </>
  );
}

export default ReserveButton;
