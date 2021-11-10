import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import axios from "axios";

const ROOM_SEQ = 1;

const WebSocketTest = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8000/chat/websocket", // 웹소켓 서버로 직접 접속
      //   webSocketFactory: () => new SockJS("/chat"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("연결완료");
        axios({
          method: "get",
          url: process.env.REACT_APP_USER_BASE_URL + "/fetchAllUsers/" + "abc",
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {});
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    console.log("구독");
    client.current.subscribe(`/topic/abc`, ({ body }) => {
      console.log("데이터 수신");
      setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/app/send",
      body: JSON.stringify({
        message: "바보",
        author: "내 id",
        to: "abc",
        timestamp: new Date().getTime(),
      }),
    });

    setMessage("");
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
      </div>
    </div>
  );
};

export default WebSocketTest;
