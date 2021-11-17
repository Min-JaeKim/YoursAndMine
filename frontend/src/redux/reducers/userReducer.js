const user = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      // window.sessionStorage.setItem("user", JSON.stringify(action.user));
      window.localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user, login: true };
    case "LOGOUT":
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("login");
      return { ...state, user: {}, login: false };
    
    case "CHANGE_LOCAL_INIT":
      return { ...state, changeLocalFlag: false };
    case "CHANGE_LOCAL_SUCCESS":
      return { ...state, changeLocalFlag: true };

    default:
      return state;
  }
};

export default user;
