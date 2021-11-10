import React, { useRef, useEffect, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { insertPartner, insertMessage, receive } from "../../redux/reducers/ConversationList";

function WebSocket() {
  const client = useRef({});
  const dispatch = useDispatch();

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
        // 이전 데이터 불러오기
        axios({
          method: "get",
          url: process.env.REACT_APP_USER_BASE_URL + "/fetchAllUsers/" + "abc",
        })
          .then((response) => {
            console.log(response);
            for (const key in response.data) {
              dispatch(
                insertPartner({
                  photo: process.env.REACT_APP_USER_BASE_IMAGE,
                  partner: response.data[key].partner,
                  list: [...response.data[key].messageList],
                })
              );
            }
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
    // 새롭게 들어오는 데이터는 이곳으로
    client.current.subscribe(`/topic/abc`, ({ body }) => {
      console.log(body);
    });
  };

  return null;
}

export default WebSocket;
