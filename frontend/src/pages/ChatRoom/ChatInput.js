import React, { useRef, useEffect, useState } from "react";
import ImageSendBtn from "../../assets/icons/image-send-btn.png";
import SendMsgBtn from "../../assets/icons/msg-send-btn.png";
import "./ChatRoom.css";
import { useSelector, useDispatch } from "react-redux";
import { insertMessage } from "../../redux/reducers/ConversationList";

function ChatInput(props) {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  // const client = useRef({});

  const handleChange = ({ target: { value } }) => setMsg(value);

  // useEffect(() => {
  //   console.log(props.client);
  // }, []);
  // 서버로 메시지 전송
  const sendMsg = () => {
    const author = "test";
    const to = props.to;
    const timestamp = new Date();

    console.log(msg);
    props.client.current.publish({
      destination: "/app/send",
      body: JSON.stringify({
        type: "message",
        message: msg,
        author: userId,
        to: to,
        timestamp: timestamp.getTime(),
      }),
    });
    const m = {
      type: "message",
      message: msg,
      author: userId,
      to: to,
      timestamp: timestamp.toISOString(),
      // timestamp:
      //   timestamp.getHours().toString().padStart(2, "0") +
      //   ":" +
      //   timestamp.getMinutes().toString().padStart(2, "0"),
    };
    console.log(m);
    dispatch(insertMessage(m));
    setMsg("");
  };

  const sendImg = () => {
    console.log("send Img");
  };

  const sendKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMsg();
    }
  };

  return (
    <>
      {/* <input type="file" name="file" onChange={null} /> */}
      <button className="send-img-btn" onClick={sendImg}>
        <img alt="send-img" src={ImageSendBtn}></img>
      </button>
      <input
        className="msg-input"
        placeholder="메시지를 입력해주세요."
        value={msg}
        onChange={handleChange}
        onKeyPress={sendKeyPress}
      ></input>
      <button className="send-msg-btn" onClick={sendMsg}>
        <img alt="send-msg" src={SendMsgBtn}></img>
      </button>
    </>
  );
}

export default ChatInput;
