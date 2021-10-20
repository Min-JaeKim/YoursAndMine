import React from "react";
import up from "../../assets/icons/arrowUp.png";
const FloatButton = () => {
  const move = () => {
    const el = document.getElementById("section");
    el.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
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
  );
};

export default FloatButton;
