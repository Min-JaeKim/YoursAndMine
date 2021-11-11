import React from "react";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { DateRange } from "react-date-range";

function DetailCalendar(props) {
  
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    setUnavailableDates(props.unavailableDate);
  }, [])

    useEffect(() => {
    if (unavailableDates.length !== 0) {
      let tmp = unavailableDates.map((x) => dayjs(x).toDate());
      setUnavailableDates(tmp);
    }
  }, [unavailableDates]);

  return (
    <>
       <DateRange
        editableDateInputs={false}
        showPreview={false}
        minDate={new Date()}
        disabledDates={unavailableDates}
        />
    </>
  );
}

export default DetailCalendar;
