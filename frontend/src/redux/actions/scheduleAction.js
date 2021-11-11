const selectDate = (date) => {
  return {
    type: "SELECT_DATE",
		date
  };
};

const scheduleActions = { selectDate };
export default scheduleActions;