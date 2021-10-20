import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRouter = ({ component: Component, ...rest }) => {
  const currentUser = { login: false };
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.login ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRouter;
