import React, { useEffect, useState } from "react";
import ImageSendBtn from "../../assets/icons/image-send-btn.png";
import SendMsgBtn from "../../assets/icons/msg-send-btn.png";
import "./ChatRoom.css";

function ChatInput() {
  const [msg, setMsg] = useState();

  const handleChange = ({ target: { value } }) => setMsg(value);

  // 서버로 메시지 전송
  const sendMsg = () => {
    console.log(msg);
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
