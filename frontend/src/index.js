import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.css";
import App from "./App";
import rootReducer from "./redux/reducers";
import "semantic-ui-css/semantic.min.css";
import ScrollToTop from "./components/Layout/ScrollToTop";

const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
