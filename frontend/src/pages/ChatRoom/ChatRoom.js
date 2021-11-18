import React, { useEffect, useState, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import CalendarModal from "./CalendarModal";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatItemHeader from "./ChatItemHeader";
import { useSelector, useDispatch } from "react-redux";
import ReserveButton from "./ReserveButton";
import { read } from "../../redux/reducers/ConversationList";

function ChatRoom(props, { location }) {
  const dispatch = useDispatch();
  const mList = useSelector((state) => state.conversationlist[props.to].list);
  const [OpenReserve, setOpenReserve] = useState({
    type: null,
    selectionRange: {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  });
  const scrollRef = useRef();
  const itemInfo = {
    itemPk: useSelector((state) => state.conversationlist[props.to].itemPk),
    itemImg: useSelector((state) => state.conversationlist[props.to].itemImg),
    itemName: useSelector((state) => state.conversationlist[props.to].itemName),
  };

  const userImg = useSelector((state) => state.conversationlist[props.to].userImg);

  // 로드 시 스크롤 제일 아래로
  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  useEffect(() => {
    dispatch(
      read({
        room: props.to,
      })
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [mList]);

  return (
    <div className="chat-room">
      <ChatHeader to={props.to} setChatOpen={props.setChatOpen} />
      <ChatItemHeader itemInfo={itemInfo} />
      <div className="chatroom-empty-header"></div>
      {mList.map((msg, idx) => (
        <ChatMessage
          profileImg={userImg}
          isOpen={OpenReserve}
          setOpenReserve={setOpenReserve}
          msg={msg}
          to={props.to}
          key={idx}
        />
      ))}
      <div className="input-bottom">
        <ChatInput client={props.client} to={props.to} />
      </div>
      <div ref={scrollRef}></div>
      <ReserveButton setOpenReserve={setOpenReserve} />
      <CalendarModal
        to={props.to}
        client={props.client}
        itemPk={itemInfo.itemPk}
        isOpen={OpenReserve}
        setOpenReserve={setOpenReserve}
      />
    </div>
  );
}

export default ChatRoom;
