import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRouter = ({ component: Component, client, ...rest }) => {
  const currentUser = { login: false };

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.login ? <Redirect to="/" /> : <Component client={client} {...props} />
      }
    />
  );
};

export default PublicRouter;
