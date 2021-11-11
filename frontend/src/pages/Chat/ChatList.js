import React, { useEffect, useState } from "react";
import ChatDetail from "./ChatDetail";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ChatRoom from "../ChatRoom/ChatRoom";

function ChatList(props) {
  // 더미 데이터
  const conversationList = useSelector((state) => state.conversationlist);
  const [chatOpen, setChatOpen] = useState();

  // useEffect(() => {
  //   console.log(chatOpen);
  // }, [chatOpen]);

  const sendToMessage = (from, to, msg) => {
    const m = { message: msg, author: from, to: to, timestamp: new Date().getTime() };
    // $websocket.current.sendMessage("/app/send", JSON.stringify(m));
    // dispatch(insertMessage(m));
  };

  const users = [
    {
      id: 1,
      profileImg:
        "https://downloadwap.com/thumbs2/wallpapers/p2ls/2019/drawings/45/385c8ba413075255.jpg",
      username: "이름 A",
      name: "상품 A",
      location: "대치동",
      msg: "메세지 A",
      productImg:
        "https://post-phinf.pstatic.net/MjAyMTA2MTVfMjUx/MDAxNjIzNzMxNTI5MDAw.Hdhn2QH1pDxC0MMX_Z9RGeVI7jbVIwl_oND8eApYTR0g.UPOSSGrV6iGA1y8j7lqtMHAmCTJcEa3rLo03yUuuADYg.PNG/SC_2021-06-15_%EC%98%A4%ED%9B%84_1.32.00.png?type=w1200",
    },
    {
      id: 2,
      profileImg:
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtpKbv%2FbtqEg0HHQoh%2F78RTCKHn1nZ5fK6NWkTmTk%2Fimg.png",
      username: "이름 B",
      name: "상품 B",
      location: "대치동",
      msg: "메세지 B",
      productImg: "",
    },
    {
      id: 3,
      profileImg: "",
      username: "이름 C",
      name: "상품 C",
      location: "대치동",
      msg: "메세지 C",
      productImg: "",
    },
    {
      id: 4,
      profileImg: "",
      username: "이름 D",
      name: "상품 D",
      location: "대치동",
      msg: "메세지 D",
      productImg: "",
    },
    {
      id: 5,
      profileImg: "",
      username: "이름 E",
      name: "상품 E",
      msg: "메세지 E",
      productImg: "",
    },
    {
      id: 6,
      profileImg: "",
      username: "이름 F",
      name: "상품 F",
      msg: "메세지 F",
      productImg: "",
    },
    {
      id: 7,
      profileImg: "",
      username: "이름 G",
      name: "상품 G",
      msg: "메세지 G",
      productImg: "",
    },
  ];

  return (
    <div>
      {/* {users.map((user) => (
        <ChatDetail user={user} key={user.id}></ChatDetail>
      ))} */}
      {chatOpen ? <ChatRoom client={props.client} to={chatOpen} setChatOpen={setChatOpen} /> : null}
      {Object.keys(conversationList).map((key, index) => (
        <ChatDetail
          key={key}
          client={props.client}
          profileImg={null}
          user={key}
          setChatOpen={setChatOpen}
          partner={key}
          sendToMessage={sendToMessage}
        />
      ))}
    </div>
  );
}

export default ChatList;
