import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.user.login);
  // const currentUser = { login: true };
  return (
    <Route
      {...rest}
      render={(props) => {
        !currentUser && alert("로그인이 필요한 페이지입니다.");
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

export default PrivateRouter;
