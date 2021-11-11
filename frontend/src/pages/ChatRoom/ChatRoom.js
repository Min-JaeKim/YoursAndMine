import React, { useEffect, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import CalendarModal from "./CalendarModal";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { useSelector, useDispatch } from "react-redux";

function ChatRoom(props, { location }) {
  const mList = useSelector((state) => state.conversationlist[props.to]);

  const scrollRef = useRef();

  // 로드 시 스크롤 제일 아래로
  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mList]);

  return (
    <div className="chat-room">
      <ChatHeader to={props.to} setChatOpen={props.setChatOpen} />
      {mList.map((msg, idx) => (
        <ChatMessage profileImg={""} msg={msg} to={props.to} key={idx} />
      ))}
      <div className="input-bottom">
        <ChatInput client={props.client} to={props.to} />
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
}

export default ChatRoom;
