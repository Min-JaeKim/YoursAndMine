import { combineReducers } from "redux";
import user from "./userReducer";
import conversationlist from "./ConversationList";
import websocket from "./WebSocket";

const rootReducer = combineReducers({
  user,
  conversationlist,
  websocket,
});

export default rootReducer;
