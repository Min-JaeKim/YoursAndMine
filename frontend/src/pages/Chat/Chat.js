import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ChatList from "./ChatList";

const Chat = (props) => {
  return (
    <div>
      <ChatList client={props.client}></ChatList>
    </div>
  );
};

export default Chat;
