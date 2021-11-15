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
import Wish from "./pages/Wish/Wish";
import Write from "./pages/Write/Write";
import Chat from "./pages/Chat/Chat";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import FindPwd from "./pages/FindPwd/FindPwd";
import UserEdit from "./pages/UserEdit/UserEdit";
import TradeLog from "./pages/TradeLog/TradeLog";
import WebSocketTest from "./pages/ChatRoom/WebSocketTest";
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
import ScrollToTop from "./components/Layout/ScrollToTop";
import Test from "./pages/Product/Test";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Switch>
          <Layout>
            <PublicRouter path="/" component={Main} exact />
            <PublicRouter path="/searchplace" component={SearchPlace} exact />
            <PublicRouter path="/searchitem" component={SearchItem} exact />
            <PublicRouter path="/detail/:pNo" component={Detail} exact />
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
            <PrivateRouter path="/chat" component={Chat} exact />
            <PrivateRouter path="/chat/:name" component={ChatRoom} exact />
            <PrivateRouter path="/rentuser/:pNo" component={RentUserList} exact />
            <PrivateRouter path="/tradedetail/:cNo" component={TradeDetail} exact />
            <PrivateRouter path="/myschedule" component={MySchedule} exact />

            <PrivateRouter path="/test" component={Test} exact />
            <PrivateRouter path="/test2" component={WebSocketTest} exact />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
