import React from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <div>채팅 페이지
      <Link to={`/tradedetail`}>
        <button>디테일</button>
     </Link>
    </div>
  );
};

export default Chat;
