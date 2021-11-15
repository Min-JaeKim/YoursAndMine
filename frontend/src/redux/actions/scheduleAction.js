const selectDate = (date) => {
  return {
    type: "SELECT_DATE",
		date
  };
};

const rentCancelSuccessFlag = () => {
  return {
    type: "RENT_CANCEL_SUCCESS_FLAG",
  }
}

const scheduleActions = { selectDate, rentCancelSuccessFlag };
export default scheduleActions;