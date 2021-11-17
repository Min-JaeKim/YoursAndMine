import React, { useEffect, useState } from "react";
import ChatRoomCalendar from "./ChatRoomCalendar";
import "./ChatRoom.css";
import CloseModal from "../../assets/icons/close.png";

import axios from "../../api/axios";
import { Swal } from "sweetalert2";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { insertMessage } from "../../redux/reducers/ConversationList";

function CalendarModal(props) {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [unavailableDate, setUnavailableDate] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`/item/${props.itemPk}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUnavailableDate(response.data.unavailableDate);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "상품 내역이 존재하지 않습니다.",
            icon: "error",
            confirmButtonText: "OK!",
            confirmButtonColor: "#497c5f",
          }).then((result) => {
            history.push("/");
          });
        });
    } else {
      axios
        .get(`/item/${props.itemPk}`, {})
        .then((response) => {
          setUnavailableDate(response.data.unavailableDate);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "상품 내역이 존재하지 않습니다.",
            icon: "error",
            confirmButtonText: "OK!",
            confirmButtonColor: "#497c5f",
          }).then((result) => {
            history.push("/");
          });
        });
    }
  }, [props.isOpen]);

  const closeModal = () => {
    props.setOpenReserve({
      type: null,
    });
  };

  const confirmReserve = () => {
    // db 저장

    const formatDate = (date) => {
      let d = new Date(date),
        month = "" + d.getMonth(),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    console.log(formatDate(props.isOpen.selectionRange.startDate));

    console.log({
      itemId: props.itemPk,
      dealStartDate: formatDate(props.isOpen.selectionRange.startDate),
      dealEndDate: formatDate(props.isOpen.selectionRange.endDate),
    });
    console.log({
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    axios
      .post(
        `/deal`,
        {
          itemId: props.itemPk,
          dealStartDate: formatDate(props.isOpen.selectionRange.startDate),
          dealEndDate: formatDate(props.isOpen.selectionRange.endDate),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log("거래 등록 완료");
      })
      .catch((error) => {
        console.log(error);
      });

    // 메시지 전송
    const timestamp = new Date();

    props.client.current.publish({
      destination: "/app/send",
      body: JSON.stringify({
        type: "confirm",
        message: "거래를 수락하였습니다.",
        author: userId,
        to: props.to,
        timestamp: timestamp.getTime(),
      }),
    });

    const m = {
      type: "confirm",
      message: "거래를 수락하였습니다.",
      author: userId,
      to: props.to,
      timestamp: timestamp.toISOString(),
    };
    dispatch(insertMessage(m));
    props.setOpenReserve({
      type: null,
    });
  };

  const requestReserve = () => {
    const timestamp = new Date();

    props.client.current.publish({
      destination: "/app/send",
      body: JSON.stringify({
        type: "reserve",
        message: JSON.stringify(selectionRange),
        author: userId,
        to: props.to,
        timestamp: timestamp.getTime(),
      }),
    });
    const m = {
      type: "reserve",
      message: JSON.stringify(selectionRange),
      author: userId,
      to: props.to,
      timestamp: timestamp.toISOString(),
    };
    console.log(m);
    dispatch(insertMessage(m));
    props.setOpenReserve({
      type: null,
    });
  };

  const drawCalendar = (isOpen) => {
    if (isOpen.type === "reserve") {
      return (
        <div className="calendar-modal-background">
          <div className="calendar-modal">
            <img
              alt="close-modal"
              className="calendar-close-btn"
              src={CloseModal}
              onClick={closeModal}
            />
            <div className="calendar-modal-contents">
              <ChatRoomCalendar
                selectionRange={selectionRange}
                setSelectionRange={setSelectionRange}
                client={props.client}
                unavailableDate={unavailableDate}
              />
              <p>원하는 날짜를 요청해주세요!</p>
              <button className="calendar-request-button" onClick={requestReserve}>
                요청하기
              </button>
            </div>
          </div>
        </div>
      );
    } else if (props.isOpen.type === "check") {
      // 요청 확인
      return (
        <div className="calendar-modal-background">
          <div className="calendar-modal">
            <img
              alt="close-modal"
              className="calendar-close-btn"
              src={CloseModal}
              onClick={closeModal}
            />
            <div className="calendar-modal-contents">
              <ChatRoomCalendar
                selectionRange={selectionRange}
                isOpen={props.isOpen}
                client={props.client}
                unavailableDate={unavailableDate}
              />
              <p>거래를 수락하시겠습니까?</p>
              <button className="calendar-request-button" onClick={confirmReserve}>
                거래 수락
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{drawCalendar(props.isOpen)}</>;
}

export default CalendarModal;
