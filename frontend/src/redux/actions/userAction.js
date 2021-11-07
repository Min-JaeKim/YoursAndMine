const loginUser = (user) => {

  return {
    type: "LOGIN",
    user
  };
};

const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};

const userActions = { loginUser, logoutUser };
export default userActions;
