import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import logo from "../../assets/image/yam.png";
import { Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import kakao from "../../assets/icons/kakao-talk.png";

import "./SignIn.css";
import axios from 'axios';
import Swal from 'sweetalert2'
// import axios from "../../api/axios";
import allActions from '../../redux/actions';

const SignIn = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();

  const signin = (e) => {
    e.preventDefault();
    axios
      // .post(`/api/login`, {
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/login`, {
        userEmail: email,
        userPassword: password,
      })
      .then((response) => {
        console.log('login success')
        const token = response.headers.authorization.split(" ")[1];
        window.localStorage.setItem("token", JSON.stringify(token));
        axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/user/mypage`, {
          headers: {
            Authorization:
            "Bearer " + token,
          },
        })
        .then((response) => {
          dispatch(allActions.userActions.loginUser(response.data));
          window.localStorage.setItem("login", JSON.stringify(true));

        //     console.log(response);
          })
          .catch((error) => {
            console.log(error)
          })
        history.push('/')
      })
      .catch(() => {
        Swal.fire({
          title: 'Error!',
          text: '로그인에 실패하였습니다.',
          icon: 'error',
          confirmButtonText: 'OK!',
          confirmButtonColor: '#497c5f'
        })
      })
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  return (
    <div className="signin">
      <div className="signin-logo-wrap">
        <img src={logo} alt="logo" width="60%" />
      </div>

      <form className="signin-form" onSubmit={e => { signin(e) }}>
        <Input placeholder="이메일 입력" onChange={onChangeEmail} />
        <Input type="password" placeholder="비밀번호 입력" onChange={onChangePassword} />
        <Button className="signin-button" type='submit'>로그인</Button>
      </form>
      <div className="signin-option">
        <Link to="/findpwd">비밀번호 찾기</Link>
        <span>|</span>
        <Link to="/signup">{"회원가입  "}</Link>
      </div>
      <hr />

    </div>
  );
};

export default SignIn;
