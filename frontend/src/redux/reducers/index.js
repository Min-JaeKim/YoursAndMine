import { combineReducers } from "redux";
import user from "./userReducer";
import conversationlist from "./ConversationList";
import websocket from "./WebSocket";
import schedule from "./scheduleReducer";

const rootReducer = combineReducers({
  user,
  conversationlist,
  websocket,
  schedule,
});

export default rootReducer;
