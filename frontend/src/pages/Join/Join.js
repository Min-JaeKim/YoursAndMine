import React from 'react'
import './Join.css'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import logo from '../../assets/image/yam.png'

const Join = () => {
  const history = useHistory();
	const onClickLogin = () => {
		history.push('/signin');
	}
	return (
		<div className="join-all">
			<img src={logo} alt="yam" />
			<div className="join-welcome">환영합니다!</div>
			<div className="join-congratulate">Y-A-M 가입을 축하드려요!</div>
			<Button className="join-to-login" onClick={onClickLogin}>로그인하러 가기</Button>
			<Link to="/">흠오로 이동</Link>
		</div>
	)
}

export default Join
