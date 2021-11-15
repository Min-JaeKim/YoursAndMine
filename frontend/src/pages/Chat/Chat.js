import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ChatList from "./ChatList";

const Chat = (props) => {
  return (
    <div>
      <ChatList
        roomNum={props.location.state ? props.location.state.userPK : ""}
        client={props.client}
      ></ChatList>
    </div>
  );
};

export default Chat;
