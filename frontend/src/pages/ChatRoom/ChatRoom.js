import React from "react";
import ChatMessage from "./ChatMessage";
import CalendarModal from "./CalendarModal";

function ChatRoom({ location }) {
  const msgList = [
    {
      id: 1,
      type: "message", // 사진, 메시지, 거래 요청
      content: "메시지 내용 1", // 메시지 내용
      time: "오전 10:00", // 메시지 시간
    },
    {
      id: 2,
      type: "message", // 사진, 메시지, 거래 요청
      content:
        "가나다가나다가나다가나다가나다가나다가나다다가나다가나다가나다가나다가나다가나다가나다가나다", // 메시지 내용
      time: "오전 10:00", // 메시지 시간
    },
    {
      id: 3,
      type: "message", // 사진, 메시지, 거래 요청
      content: "abcd", // 메시지 내용
      time: "오전 10:00", // 메시지 시간
    },
    {
      id: 4,
      type: "send", // 사진, 메시지, 거래 요청
      content: "abcd", // 메시지 내용
      time: "오전 10:00", // 메시지 시간
    },
    {
      id: 5,
      type: "send", // 사진, 메시지, 거래 요청
      content: "하이루", // 메시지 내용
      time: "오전 10:00", // 메시지 시간
    },
    {
      id: 6,
      type: "message", // 사진, 메시지, 거래 요청
      content: `I know that I, I can't believe
      Just what the past has brought me
      To the man I wanna be
      I know that we have had some times
      That we can't forget the struggle
      Cause we have so far to go
      
      I know we've changed but
      Change can be so good
      So let's not forget why
      It's understood that
      
      chorus:
      Time, look where we are and what we've been through
      Time, sharing our dreams
      Time, goes on and on everyday, baby
      Time is what it is
      Come what may(come what may)
      
      I remember when, mom used to say
      That things are getting better
      And you'll soon be on your way
      Remeber those days
      When we would sing at the drop of a dime (Oooh)
      Way back when nothing mattered (Mmm, mm, mm)
      
      I know we've changed, but
      Change can be so good
      Oh so let's not forget why it's understood that
      `, // 메시지 내용
      time: "오전 10:00", // 메시지 시간
    },
    {
      id: 7,
      type: "send", // 사진, 메시지, 거래 요청
      content:
        "하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루하이루", // 메시지 내용
      time: "오전 10:00", // 메시지 시간
    },
  ];
  return (
    <div>
      {msgList.map((msg) => (
        <ChatMessage profileImg={location.state.profileImg} msg={msg} key={msg.id} />
      ))}
    </div>
  );
}

export default ChatRoom;
