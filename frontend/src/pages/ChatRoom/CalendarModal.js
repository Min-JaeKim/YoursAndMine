import React, { useEffect } from "react";
import "./ChatRoom.css";

function CalendarModal(props) {
  useEffect(() => {
    console.log(props.isOpen);
  }, [props]);

  const closeModal = () => {
    props.setOpenReserve(false);
  };

  return (
    <>
      {props.isOpen ? (
        <div className="calendar-modal-background" onClick={closeModal}>
          <div className="calendar-modal"></div>
        </div>
      ) : null}
    </>
  );
}

export default CalendarModal;
