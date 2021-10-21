const user = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("user", JSON.stringify(action.user));

      return { ...state, user: action.user, login: true };
    case "LOGOUT":
      window.localStorage.removeItem("user");
      window.localStorage.removeItem('token');
      window.localStorage.removeItem("login");
      return { ...state, user: {}, login: false };
    default:
      return state;
  }
};

export default user;
