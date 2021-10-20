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
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import FindPwd from "./pages/FindPwd/FindPwd";
import UserEdit from "./pages/UserEdit/UserEdit";
import TradeLog from "./pages/TradeLog/TradeLog";
import Charge from "./pages/Charge/Charge";
import "./App.css";
import MyProduct from "./pages/MyProduct/MyProduct";
import RentUserList from "./pages/RentUserList/RentUserList";
import axios from 'axios';
import TradeDetail from './pages/TradeDetail/TradeDetail';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Layout>
            <PublicRouter path="/" component={Main} exact />
            <PublicRouter path="/searchplace" component={SearchPlace} exact />
            <PublicRouter path="/searchitem" component={SearchItem} exact />
            <PublicRouter path="/detail/:pNo" component={Detail} exact />
            <PublicRouter path="/signin" component={SignIn} exact />
            <PublicRouter path="/signup" component={SignUp} exact />
            <PublicRouter path="/findpwd" component={FindPwd} exact />

            <PrivateRouter path="/rent" component={Rent} exact />
            <PrivateRouter path="/mypage" component={MyPage} exact />
            <PrivateRouter path="/useredit" component={UserEdit} exact />
            <PrivateRouter path="/tradelog" component={TradeLog} exact />
            <PrivateRouter path="/myproduct" component={MyProduct} exact />
            <PrivateRouter path="/charge" component={Charge} exact />
            <PrivateRouter path="/wish" component={Wish} exact />
            <PrivateRouter path="/write" component={Write} exact />
            <PrivateRouter path="/chat" component={Chat} exact />
            <PrivateRouter path="/rentuser/:pNo" component={RentUserList} exact />
            <PrivateRouter path="/tradedetail/:cNo" component={TradeDetail} exact />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
