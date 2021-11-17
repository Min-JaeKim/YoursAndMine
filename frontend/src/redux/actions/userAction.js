const loginUser = (user) => {
  // console.log("이것이 data ", user);

  return {
    type: "LOGIN",
    user,
  };
};

const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};

const changeLocalInit = () => {
  return {
    type: "CHANGE_LOCAL_INIT",
  }
}

const changeLocalSuccess = () => {
  return {
    type: "CHANGE_LOCAL_SUCCESS",
  }
}

const userActions = { loginUser, logoutUser, changeLocalSuccess, changeLocalInit };
export default userActions;
