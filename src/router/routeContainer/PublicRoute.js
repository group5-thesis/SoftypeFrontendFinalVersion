import React from "react"
import { Route, Redirect } from "react-router-dom"
const PublicRoute = ({ component: Component, already_logged, ...rest }) => {
  let auth = !!localStorage.getItem("token")
  return (
    <Route
      {...rest}
      render={props =>
        !auth ? (
          <Component {...props} />
        ) : (
            <Redirect to="/" />
          )
      }
    />
  )
}

export default PublicRoute
