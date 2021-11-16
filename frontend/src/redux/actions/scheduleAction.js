const selectDate = (date) => {
  return {
    type: "SELECT_DATE",
		date
  };
};

const rentCancelSuccess = () => {
  return {
    type: "RENT_CANCEL_SUCCESS",
  }
}

const rentCancelInit = () => {
  return {
    type: "RENT_CANCEL_INIT",
  }
}

const scheduleActions = { selectDate, rentCancelSuccess, rentCancelInit };
export default scheduleActions;