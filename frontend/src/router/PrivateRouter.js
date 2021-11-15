import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Route, Redirect } from "react-router-dom";

import Swal from "sweetalert2";

const PrivateRouter = ({ component: Component, client, ...rest }) => {
  // const currentUser = useSelector((state) => state.user.login);
  const history = useHistory();
  const currentUser = { login: true };

  return (
    <Route
      {...rest}
      render={(props) => {
        !window.localStorage.getItem("token") &&
          Swal.fire({
            title: "Error!",
            text: "다시 로그인해 주세요",
            icon: "error",
            confirmButtonText: "OK!",
            confirmButtonColor: "#497c5f",
          }).then((result) => {
            history.push("/signin");
          });
        return window.localStorage.getItem("token") ? (
          <Component client={client} {...props} />
        ) : (
          <Redirect to="/signin" />
        );
        // return <Component client={client} {...props} />;
      }}
    />
  );
};

export default PrivateRouter;
