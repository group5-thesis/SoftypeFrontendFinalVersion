import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, already_logged, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        already_logged ? (
          <Component {...props} />
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  );
};

const mapStateToProps = state => ({
  already_logged: state.appState.auth.already_logged
});

export default connect(mapStateToProps)(ProtectedRoute);
