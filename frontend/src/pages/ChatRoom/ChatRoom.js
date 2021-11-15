import React, { useEffect, useState, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import CalendarModal from "./CalendarModal";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatItemHeader from "./ChatItemHeader";
import { useSelector, useDispatch } from "react-redux";
import ReserveButton from "./ReserveButton";

function ChatRoom(props, { location }) {
  const mList = useSelector((state) => state.conversationlist[props.to].list);
  const [OpenReserve, setOpenReserve] = useState(false);
  const scrollRef = useRef();
  const itemInfo = {
    itemPk: useSelector((state) => state.conversationlist[props.to].itemPk),
    itemImg: useSelector((state) => state.conversationlist[props.to].itemImg),
    itemName: useSelector((state) => state.conversationlist[props.to].itemName),
  };

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
      <ChatItemHeader itemInfo={itemInfo} />
      {mList.map((msg, idx) => (
        <ChatMessage profileImg={""} msg={msg} to={props.to} key={idx} />
      ))}
      <div className="input-bottom">
        <ChatInput client={props.client} to={props.to} />
      </div>
      <div ref={scrollRef}></div>
      <ReserveButton setOpenReserve={setOpenReserve} />
      <CalendarModal isOpen={OpenReserve} setOpenReserve={setOpenReserve} />
    </div>
  );
}

export default ChatRoom;
