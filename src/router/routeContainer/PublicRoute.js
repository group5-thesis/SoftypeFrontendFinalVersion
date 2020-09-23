import React, { useEffect } from "react"
import { Route, Redirect } from "react-router-dom"

const PublicRoute = ({ component: Component, already_logged, ...rest }) => {
  let auth = !!localStorage.getItem("token")
  useEffect(() => {
   console.log("test")
  }, [])
  return (
    <Route >
      {!auth ? <Component {...rest} /> : <Redirect to="/" />}
    </Route>
    // <Route
    //   {...rest}
    //   render={props =>
    //     !auth ? (
    //       <Component {...props} />
    //     ) : (
    //         <Redirect to="/" />
    //       )
    //   }
    // />
  )
}

export default PublicRoute
