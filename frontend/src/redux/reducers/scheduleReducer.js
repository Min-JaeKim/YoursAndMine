const schedule = (state = {}, action) => {
  switch (action.type) {
    
    case "SELECT_DATE":
			return { ...state, selectDate: action.date };

    default:
      return state;
  }
};

export default schedule;
