import React from "react";
import { Link } from "react-router-dom";
import ChatList from "./ChatList";

const Chat = () => {
  return (
    <div>
      <ChatList></ChatList>
      {/* <Link to={`/tradedetail`}>
        <button>디테일</button>
      </Link> */}
    </div>
  );
};

export default Chat;
