import React, { useEffect, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import CalendarModal from "./CalendarModal";
import ChatInput from "./ChatInput";
import { useSelector, useDispatch } from "react-redux";

function ChatRoom(props, { location }) {
  const mList = useSelector((state) => state.conversationlist[props.to]);

  const scrollRef = useRef();
  useEffect(() => {
    console.log(mList);
  }, [mList]);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mList]);

  return (
    <div className="chat-room">
      {mList.map((msg, idx) => (
        <ChatMessage profileImg={""} msg={msg} key={idx} />
      ))}
      <div className="input-bottom">
        <ChatInput client={props.client} />
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
}

export default ChatRoom;
