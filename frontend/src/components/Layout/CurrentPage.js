import React, { useState, useEffect } from "react";

const CurrentPage = (props) => {
  const [pageName, setPageName] = useState();

  useEffect(() => {
    const page = {
      "": "메인",

      searchplace: "위치 정보",
      searchitem: "검색",
      rent: "대여하기",
      detail: "제품 상세",
      write: "대여 게시글 등록",
      mypage: "마이페이지",
      useredit: "회원정보 수정",
      wish: "관심목록",
      chat: "채팅",
      chatroom: "하이",
      signin: "로그인",
      signup: "회원 가입",
      findpwd: "비밀번호 찾기",
      tradelog: "거래내역",
      myproduct: "등록한 대여제품",
      charge: "충전하기",
      rentuser: "대여자목록",
      tradedetail: "거래내역",
      notice: "알림",
      mycalendar: "나의 일정",
      product: "전체 상품",
    };

    const url = props.url.split("/");
    // 채팅방 헤더 설정
    if (url.length > 2 && url[1] === "chat") {
      setPageName(url[2]);
    } else {
      setPageName(page[url[1]]);
    }
  }, [props.url]);

  return <div className="header-location">{pageName}</div>;
};

export default CurrentPage;
