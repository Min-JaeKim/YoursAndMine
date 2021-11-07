const schedule = (state = {}, action) => {
  switch (action.type) {
    
    case "SET_SCHEDULE":
			return { ...state, scheduleDates: action.schedule.일정있는날짜, giveProductDates: action.schedule.반납일정, getProductDates: action.schedule.회수일정 };

    default:
      return state;
  }
};

export default schedule;
