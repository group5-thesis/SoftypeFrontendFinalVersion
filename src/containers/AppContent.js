import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer } from "@coreui/react";
import { Loader } from "reusable";
import { useSelector, useDispatch } from "react-redux";
// routes config
import routes from "router";
import Page404 from "modules/placeholder/page404/Page404";

const loading = <Loader bg="transparent" app={false} />;

const AppContent = (_props) => {
  const isAppLoading = useSelector((state) => state.appState.app.loading);
  const accessedRoutes = routes//filterModule(routes, roleId);



  useEffect(() => {
  }, []);

  return (
    <main className="c-main">
      <CContainer fluid>
        {/* {isAppLoading ? (
          loading
        ) : ( */}
        <Suspense fallback={loading}>
          <Switch>
            {accessedRoutes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <route.component {...{ ..._props, ...props }} />
                    )}
                  />
                )
              );
            })}
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Redirect from="/" to="/dashboard" />
            <Redirect from="*" to="/404" />
          </Switch>
        </Suspense>
        {/* )} */}
      </CContainer>
    </main>
  );
};

export default React.memo(AppContent);
