import { combineReducers } from "redux";
import user from "./userReducer";
import schedule from "./scheduleReducer";

const rootReducer = combineReducers({
  user,
  schedule,
});

export default rootReducer;
