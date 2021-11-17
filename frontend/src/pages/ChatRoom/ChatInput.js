import React, { useRef, useEffect, useState } from "react";
import ImageSendBtn from "../../assets/icons/image-send-btn.png";
import SendMsgBtn from "../../assets/icons/msg-send-btn.png";
import "./ChatRoom.css";
import { useSelector, useDispatch } from "react-redux";
import { insertMessage } from "../../redux/reducers/ConversationList";
import axios from "../../api/axios";

function ChatInput(props) {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  // const client = useRef({});

  const [file, setFile] = useState("");

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      // setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    const token = JSON.parse(window.localStorage.getItem("token"));
    axios
      .post(`/image/save`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const timestamp = new Date();

        props.client.current.publish({
          destination: "/app/send",
          body: JSON.stringify({
            type: "image",
            message: response.data,
            author: userId,
            to: props.to,
            timestamp: timestamp.getTime(),
          }),
        });
        const m = {
          type: "image",
          message: response.data,
          author: userId,
          to: props.to,
          timestamp: timestamp.toISOString(),
        };
        dispatch(insertMessage(m));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    };
    dispatch(insertMessage(m));
    setMsg("");
  };

  const sendImg = () => {
    let reader = new FileReader();
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

      {/* <button className="send-img-btn" onClick={sendImg}>
        <img alt="send-img" src={ImageSendBtn}></img>
      </button> */}
      <div className="button-wrapper">
        <span className="label">+</span>
        <input
          id="img-send-btn"
          name="img-send-btn"
          className="img-send-btn"
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          onChange={handleFileOnChange}
        ></input>
      </div>

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
