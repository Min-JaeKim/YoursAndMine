import axios from "axios";
import * as StompJs from "@stomp/stompjs";

const CONNECT = "conversationlist/CONNECT";
const DISCONNECT = "websocket/DISCONNECT";

export const connect = () => ({ type: CONNECT });
export const disconnect = (msg) => ({ type: DISCONNECT, payload: msg });

const initialState = null;

const WebSocket = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT:
      const ws = new StompJs.Client({
        brokerURL: "ws://localhost:8000/chat/websocket", // 웹소켓 서버로 직접 접속
        connectHeaders: {
          "auth-token": "spring-chat-auth-token",
        },
        debug: function (str) {},
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {},
        onStompError: (frame) => {
          console.error(frame);
        },
      });
      return ws;
    case DISCONNECT:
      return { ...state };
    default:
      return state;
  }
};

export default WebSocket;
