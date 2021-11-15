const schedule = (state = {}, action) => {
  switch (action.type) {
    
    case "SELECT_DATE":
			return { ...state, selectDate: action.date };

    case "RENT_CANCEL_SUCCESS_FLAG":
      return { ...state, message: action };

    default:
      return state;
  }
};

export default schedule;
