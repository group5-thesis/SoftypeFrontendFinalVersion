import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({ component: Component, already_logged, ...rest }) => {
  let auth = !!localStorage.getItem("token")
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default ProtectedRoute
