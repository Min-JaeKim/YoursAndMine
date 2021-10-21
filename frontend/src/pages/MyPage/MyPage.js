import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, Input } from "semantic-ui-react";
import profile from "../../assets/image/user.png";
import star from "../../assets/icons/star.png";
import arrow from "../../assets/icons/arrow-right.png";
import product from "../../assets/icons/product.png";
import productlist from "../../assets/icons/productlist.png";
import fingerprint from "../../assets/icons/fingerprint.png";
import "./MyPage.css";
import axios from "axios";
import { createWallet } from "../../api/user";
import allActions from "../../redux/actions";

const MyPage = () => {
  const [wallet, setWallet] = useState(true);
  const [currentUserWallet, setCurrentUserWallet] = useState("");
  const [bliAmount, setbliAmount] = useState("");
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({});
  const btn = useRef();
  const dispatch = useDispatch();

  async function onCreateWallet() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    // getFunction.connectMetamask().then((result) => {
    //   setCurrentUserWallet(result[0]);
    //   axios
    //     .post(
    //       `${process.env.REACT_APP_SERVER_BASE_URL}/api/user/create/wallet`,
    //       {
    //         userWallet: result[0],
    //       },
    //       {
    //         headers: {
    //           Authentication: "Bearer " + token,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       window.localStorage.setItem("token", JSON.stringify(response.headers.authentication.split(" ")[1].replaceAll('"', "")));
    //     })
    //     .catch(() => {
    //       alert("메타마스크에 연결해 주세요.");
    //     });
    // });
  }

  const logout = () => {
    dispatch(allActions.userActions.logoutUser());
    alert("로그아웃 되었습니다");
  };

  return (
    <div className="mypage">
      <div className="mypage-profile">
        <img src={user.userImage} alt="product" className="mypage-user-icon" />
        <div className="mypage-profile-desc">
          <h4>{user.userName} 님 안녕하세요!</h4>
          <span>{user.userEmail}</span>
        </div>
      </div>
      <Link to="/useredit">
        <button className="mypage-useredit">프로필 수정</button>
      </Link>
      <div className="mypage-wallet">
        {!user.existWallet ? (
          <div className="mypage-wallet-create" onClick={onCreateWallet}>
            <img src={fingerprint} alt="fingerprint" width="60px" />
            지갑 생성하기
          </div>
        ) : (
          <div className="mypage-wallet-info">
            <div>
              지갑 잔액
              <Modal open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} trigger={<button ref={btn}>충전</button>}>
                <Modal.Header>충전</Modal.Header>
                <Modal.Content image>
                  <Modal.Description>
                    <div className="charge-modal-input">
                      <span>지갑주소</span>
                      <Input />
                    </div>
                    <div className="charge-modal-input">
                      <span>보유BLI</span>
                      <Input />
                      BLI
                    </div>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={() => setOpen(false)}>
                    충전하기
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
            <div>{bliAmount} BLI</div>
            {/* <div>{user.userBli} BLI</div> */}
            <div> 잔액이 부족하면 대여서비스를 이용할 수 없습니다!</div>
          </div>
        )}
      </div>
      <div className="mypage-user-info">
        <Link to="/myproduct">
          <div className="user-info">
            <img src={product} width="30px" alt="eth" />
            <p>등록한 제품</p>
          </div>
        </Link>

        <Link to="/tradelog">
          <div className="user-info">
            <img src={productlist} width="30px" alt="eth" />
            <p>대여내역</p>
          </div>
        </Link>

        <Link to="/wish">
          <div className="user-info">
            <img src={star} width="30px" alt="eth" />
            <p>찜</p>
          </div>
        </Link>
      </div>

      <div className="division-bar"></div>

      <div className="mypage-options">
        <Link to="/signin">
          <div className="mypage-option">
            <p>로그인 (임시)</p> <img src={arrow} width="20px" alt="arrow" />
          </div>
        </Link>

        <Link to="/tradelog">
          <div className="mypage-option">
            <p>거래내역</p>
            <img src={arrow} width="20px" alt="arrow" />
          </div>
        </Link>

        <Link to="/">
          <div className="mypage-option" onClick={logout}>
            <p>로그아웃</p> <img src={arrow} width="20px" alt="arrow" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
