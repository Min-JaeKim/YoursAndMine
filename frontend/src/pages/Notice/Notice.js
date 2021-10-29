import React from "react";
import NoticeDetail from "./NoticeDetail";

function Notice() {
  // 더미 데이터
  const notices = [
    {
      profileImg:
        "https://downloadwap.com/thumbs2/wallpapers/p2ls/2019/drawings/45/385c8ba413075255.jpg",
      username: "대여가 완료되었어요!",
      name: "상품 A",
      location: "대치동",
      msg: "메세지 A",
      productImg:
        "https://post-phinf.pstatic.net/MjAyMTA2MTVfMjUx/MDAxNjIzNzMxNTI5MDAw.Hdhn2QH1pDxC0MMX_Z9RGeVI7jbVIwl_oND8eApYTR0g.UPOSSGrV6iGA1y8j7lqtMHAmCTJcEa3rLo03yUuuADYg.PNG/SC_2021-06-15_%EC%98%A4%ED%9B%84_1.32.00.png?type=w1200",
    },
    {
      profileImg:
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtpKbv%2FbtqEg0HHQoh%2F78RTCKHn1nZ5fK6NWkTmTk%2Fimg.png",
      username: "대여 신청이 완료되었어요!",
      name: "상품 B",
      location: "대치동",
      msg: "메세지 B",
      productImg: "",
    },
    {
      id: 3,
      profileImg: "",
      username: "대여 요청이 왔어요!",
      name: "상품 C",
      location: "대치동",
      msg: "메세지 C",
      productImg: "",
    },
    {
      profileImg: "",
      username: "대여가 취소되었어요.",
      name: "상품 D",
      location: "대치동",
      msg: "메세지 D",
      productImg: "",
    },
    {
      profileImg: "",
      username: "반납이 완료되었어요!",
      name: "상품 E",
      msg: "메세지 E",
      productImg: "",
    },
    {
      profileImg: "",
      username: "반납이 하루 남았어요!",
      name: "상품 F",
      msg: "메세지 F",
      productImg: "",
    },
    {
      profileImg: "",
      username: "대여가 완료되었어요!",
      name: "상품 G",
      msg: "메세지 G",
      productImg: "",
    },
  ];

  return (
    <div className="notice-box">
      {notices.map((notice, idx) => (
        <NoticeDetail notice={notice} key={idx}></NoticeDetail>
      ))}
    </div>
  );
}

export default Notice;
