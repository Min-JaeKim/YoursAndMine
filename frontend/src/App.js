// api components layout redux pages assets font utils
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Main from "./pages/Main/Main";
import NotFound from "./pages/Error/NotFound";
import Layout from "./components/Layout/Layout";
import PublicRouter from "./router/PublicRouter";
import PrivateRouter from "./router/PrivateRouter";
import SearchPlace from "./pages/Location/SearchPlace";
import SearchItem from "./pages/SearchItem/SearchItem";

import Wish from "./pages/Wish/Wish";
import Join from "./pages/Join/Join";
import Rent from "./pages/Rent/Rent";
import Chat from "./pages/Chat/Chat";
import Write from "./pages/Write/Write";
import Test from "./pages/Product/Test";
import SignIn from "./pages/SignIn/SignIn";
import Detail from "./pages/Detail/Detail";
import SignUp from "./pages/SignUp/SignUp";
import Notice from "./pages/Notice/Notice";
import MyPage from "./pages/MyPage/MyPage";
import Product from "./pages/Product/Product";
import FindPwd from "./pages/FindPwd/FindPwd";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import UserEdit from "./pages/UserEdit/UserEdit";
import TradeLog from "./pages/TradeLog/TradeLog";
import Category from "./pages/Category/Category";
// import Charge from "./pages/Charge/Charge";
import "./App.css";
import MyProduct from "./pages/MyProduct/MyProduct";
import MySchedule from "./pages/MySchedule/MySchedule";
import TradeDetail from "./pages/TradeDetail/TradeDetail";
import RentUserList from "./pages/RentUserList/RentUserList";

import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import { insertPartner, receive } from "./redux/reducers/ConversationList";

function App() {
  const client = useRef({});
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (localStorage.getItem("user")) {
      connect();
    }

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "wss://k5a102.p.ssafy.io:8081/chat/websocket", // 웹소켓 서버로 직접 접속
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
          method: "post",
          url: process.env.REACT_APP_USER_BASE_URL + "/fetchAllChats",
          data: {
            userPk: userId,
            token: token,
          },
        })
          .then((response) => {
            console.log(response.data);
            let mergeData = [];
            for (const key in response.data.conversation) {
              mergeData.push({
                conversation: response.data.conversation[key],
                chatRoomInfo: response.data.chatRoomInfo[key],
              });
            }

            // mergeData.sort(function (a, b) {
            //   return (
            //     Date.parse(
            //       a.conversation.messageList[a.conversation.messageList.length - 1].timestamp
            //     ) <
            //     Date.parse(
            //       b.conversation.messageList[b.conversation.messageList.length - 1].timestamp
            //     )
            //   );
            // });

            // console.log(mergeData);

            // for (const key in mergeData) {
            //   console.log(key);
            //   dispatch(
            //     insertPartner({
            //       partner: mergeData.conversation[key].partnerPk,
            //       partnerNickname: mergeData.chatRoomInfo[key].userNickname,
            //       partnerImg: mergeData.chatRoomInfo[key].userImageUrl,
            //       itemName: mergeData.chatRoomInfo[key].itemName,
            //       itemPk: mergeData.chatRoomInfo[key].itemId,
            //       itemImg: mergeData.chatRoomInfo[key].itemImage[0],
            //       lastMsg:
            //         mergeData.conversation[key].messageList[
            //           mergeData.conversation[key].messageList.length - 1
            //         ],
            //       list: [...mergeData.conversation[key].messageList],
            //     })
            //   );
            // }
            console.log(response.data.conversation);
            for (const key in response.data.conversation) {
              console.log(key);
              dispatch(
                insertPartner({
                  partner: response.data.conversation[key].partnerPk,
                  partnerNickname: response.data.chatRoomInfo[key].userNickname,
                  partnerImg: response.data.chatRoomInfo[key].userImageUrl,
                  itemName: response.data.chatRoomInfo[key].itemName,
                  itemPk: response.data.chatRoomInfo[key].itemId,
                  itemImg: response.data.chatRoomInfo[key].itemImage[0],
                  lastMsg:
                    response.data.conversation[key].messageList[
                      response.data.conversation[key].messageList.length - 1
                    ],
                  list: [...response.data.conversation[key].messageList],
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
    client.current.subscribe(`/topic/` + userId, ({ body }) => {
      // console.log(JSON.parse(body));
      const m = JSON.parse(body);
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
            {/* <PrivateRouter path="/charge" component={Charge} exact /> */}
            <PrivateRouter path="/wish" component={Wish} exact />
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
