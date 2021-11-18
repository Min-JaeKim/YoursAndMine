import React, { useEffect, useState } from "react";
import NoticeDetail from "./NoticeDetail";
import { useSelector, useDispatch } from "react-redux";

function Notice() {
  // 더미 데이터
  const conversationList = useSelector((state) => state.conversationlist);

  const tmp = [
    {
      profileImg:
        "https://downloadwap.com/thumbs2/wallpapers/p2ls/2019/drawings/45/385c8ba413075255.jpg",
      msg: "대여가 완료되었어요!",
      name: "상품 A",
      location: "대치동",
      msg: "메세지 A",
      productImg:
        "https://post-phinf.pstatic.net/MjAyMTA2MTVfMjUx/MDAxNjIzNzMxNTI5MDAw.Hdhn2QH1pDxC0MMX_Z9RGeVI7jbVIwl_oND8eApYTR0g.UPOSSGrV6iGA1y8j7lqtMHAmCTJcEa3rLo03yUuuADYg.PNG/SC_2021-06-15_%EC%98%A4%ED%9B%84_1.32.00.png?type=w1200",
    },
  ];

  const drawNoticeDetail = () => {
    let noticeList = [];

    for (let key in conversationList) {
      let notice = {};

      for (let idx = 0; idx < conversationList[key].list.length; idx++) {
        if (
          conversationList[key].list[idx].type === "message" ||
          conversationList[key].list[idx].type === "send" ||
          conversationList[key].list[idx].type === "image"
        )
          continue;
        let tmp;
        if (conversationList[key].list[idx].type === "create") {
          // 방 생성 메시지
          tmp = conversationList[key].name + "님과 대화가 시작되었습니다.";
        } else if (conversationList[key].list[idx].type === "reserve") {
          // 예약
          tmp = conversationList[key].name + "님과 거래 예정입니다.";
        } else if (conversationList[key].list[idx].type === "confirm") {
          tmp = conversationList[key].name + "님과 거래가 성사되었습니다!";
        }
        noticeList.push({
          profileImg: conversationList[key].userImg,
          username: conversationList[key].name,
          productImg: conversationList[key].itemImg,
          msg: tmp,
          timestamp: conversationList[key].list[idx].timestamp,
        });
      }
    }

    return (
      <>
        {noticeList
          .sort(function (a, b) {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          })
          .map((notice, idx) => (
            <NoticeDetail notice={notice} key={idx}></NoticeDetail>
          ))}
      </>
    );
  };

  return (
    <div className="notice-box">
      {drawNoticeDetail()}
      {/* {notices.map((notice, idx) => (
        <NoticeDetail notice={notice} key={idx}></NoticeDetail>
      ))} */}
    </div>
  );
}

export default Notice;
