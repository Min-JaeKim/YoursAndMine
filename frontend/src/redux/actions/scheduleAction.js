const setSchedule = (schedule) => {
  return {
    type: "SET_SCHEDULE",
		schedule
  };
};

const scheduleActions = { setSchedule };
export default scheduleActions;