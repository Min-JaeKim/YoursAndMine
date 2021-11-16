import React from "react";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { DateRange } from "react-date-range";
import DetailCalendar from "../Detail/DetailCalendar";

function ChatRoomCalendar(props) {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [showDates, setShowDates] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  useEffect(() => {
    if (props.isOpen) {
      setShowDates({
        startDate: new Date(props.isOpen.selectionRange.startDate),
        endDate: new Date(props.isOpen.selectionRange.endDate),
        key: "selection",
      });
    }
  }, []);

  useEffect(() => {
    setUnavailableDates(props.unavailableDate);
    if (props.unavailableDate.length !== 0) {
      let tmp = props.unavailableDate.map((x) => dayjs(x).toDate());
      setUnavailableDates(tmp);
    }
  }, [props.unavailableDate]);

  const handleSelect = (ranges) => {
    console.log(ranges);
    props.setSelectionRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
  };

  const drawCalendar = () => {
    if (props.isOpen && props.isOpen.type === "check") {
      return (
        <DateRange
          ranges={[showDates]}
          dragSelectionEnabled={false}
          showPreview={false}
          minDate={new Date()}
        />
      );
    } else {
      return (
        <DateRange
          ranges={[props.selectionRange]}
          editableDateInputs={false}
          showPreview={false}
          minDate={new Date()}
          disabledDates={unavailableDates}
          onChange={handleSelect}
        />
      );
    }
  };

  return <>{drawCalendar()}</>;
}

export default ChatRoomCalendar;
