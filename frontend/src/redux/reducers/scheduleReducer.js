const schedule = (state = {}, action) => {
  switch (action.type) {
    
    case "SELECT_DATE":
			return { ...state, selectDate: action.date };

    case "RENT_CANCEL_SUCCESS":
      return { ...state, rentalCancelFlag: true };
    case "RENT_CANCEL_INIT":
      return { ...state, rentalCancelFlag: false };

    default:
      return state;
  }
};

export default schedule;
