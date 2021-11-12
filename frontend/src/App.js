// api components layout redux pages assets font utils
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Rent from "./pages/Rent/Rent";
import Detail from "./pages/Detail/Detail";
import SearchPlace from "./pages/Location/SearchPlace";
import SearchItem from "./pages/SearchItem/SearchItem";
import PrivateRouter from "./router/PrivateRouter";
import PublicRouter from "./router/PublicRouter";

import MyPage from "./pages/MyPage/MyPage";
import Write from "./pages/Write/Write";
import Chat from "./pages/Chat/Chat";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import FindPwd from "./pages/FindPwd/FindPwd";
import UserEdit from "./pages/UserEdit/UserEdit";
import TradeLog from "./pages/TradeLog/TradeLog";
// import Charge from "./pages/Charge/Charge";
import "./App.css";
import MyProduct from "./pages/MyProduct/MyProduct";
import RentUserList from "./pages/RentUserList/RentUserList";
import Notice from "./pages/Notice/Notice";
import TradeDetail from "./pages/TradeDetail/TradeDetail";
import MySchedule from "./pages/MySchedule/MySchedule";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";
import Join from "./pages/Join/Join";
import Test from "./pages/Product/Test";

import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import { insertPartner, receive } from "./redux/reducers/ConversationList";

function App() {
  const client = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8081/chat/websocket", // 웹소켓 서버로 직접 접속
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
          url: process.env.REACT_APP_USER_BASE_URL + "/fetchAllChats/" + "test",
        })
          .then((response) => {
            console.log(response.data);
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
    client.current.subscribe(`/topic/test`, ({ body }) => {
      // console.log(JSON.parse(body));
      const m = JSON.parse(body);
      m.type = "message";
      console.log(m);
      dispatch(receive(m));
    });
  };

  return (
    <div className="App">
      <Router>
        {/* <ScrollToTop /> */}
        <Switch>
          <Layout>
            <PublicRouter path="/" component={Main} exact />
            <PublicRouter path="/searchplace" component={SearchPlace} exact />
            <PublicRouter path="/searchitem" component={SearchItem} exact />
            <PublicRouter path="/detail/:pNo" client={client} component={Detail} exact />
            <PublicRouter path="/signin" component={SignIn} exact />
            <PublicRouter path="/signup" component={SignUp} exact />
            <PublicRouter path="/findpwd" component={FindPwd} exact />
            <PublicRouter path="/category" component={Category} exact />
            <PublicRouter path="/join" component={Join} exact />

            <PrivateRouter path="/rent" component={Rent} exact />
            <PrivateRouter path="/mypage" component={MyPage} exact />
            <PrivateRouter path="/useredit" component={UserEdit} exact />
            <PrivateRouter path="/tradelog" component={TradeLog} exact />
            <PrivateRouter path="/myproduct" component={MyProduct} exact />
            <PrivateRouter path="/notice" component={Notice} exact />
            <PrivateRouter path="/product" component={Product} exact />
            <PrivateRouter path="/write" component={Write} exact />
            <PrivateRouter path="/chat" client={client} component={Chat} exact />
            <PrivateRouter path="/chat/:name" component={ChatRoom} exact />
            <PrivateRouter path="/rentuser/:pNo" component={RentUserList} exact />
            <PrivateRouter path="/tradedetail/:cNo" component={TradeDetail} exact />
            <PrivateRouter path="/myschedule" component={MySchedule} exact />

            <PrivateRouter path="/test" component={Test} exact />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
