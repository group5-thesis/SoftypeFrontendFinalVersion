import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer } from "@coreui/react";
import { Loader } from "reusable";
import { useSelector, useDispatch } from "react-redux";
// routes config
import routes from "router";
import { filterModule, plotArray } from "utils/helpers";
import Page404 from "modules/placeholder/page404/Page404";
import api from "utils/api";
import { actionCreator, ActionTypes } from "utils/actions";
import {
  retrieveLeaveRequests,
  retrieveEmployees,
  fetchTickets,
  fetchCompanyFiles,
  fetchCompanyVideos,
  fetchCompanyImages,
  fetchCompanyDocuments,
  fetchDepartments,
  fetchDepartmentEmployees,
  fetchDepartmentManagers
} from "utils/helpers/fetch";
const loading = <Loader bg="transparent" app={false} />;

const AppContent = (_props) => {
  const user = useSelector((state) => state.appState.auth.user);
  const isAppLoading = useSelector((state) => state.appState.app.loading);
  const { employeeId, roleId } = user;
  const payload = { employeeId, roleId };
  const accessedRoutes = filterModule(routes, roleId);
  const dispatch = useDispatch();
  const retrieve = async (payload) => {
    dispatch(actionCreator(ActionTypes.LOADING_STARTED));
    let resp1 = await retrieveLeaveRequests(dispatch, payload);
    let resp2 = await fetchTickets(dispatch);
    let resp3 = await retrieveEmployees(dispatch);
    let resp4 = await fetchCompanyFiles(dispatch);
    let resp5 = await fetchCompanyVideos(dispatch);
    let resp6 = await fetchCompanyImages(dispatch);
    let resp7 = await fetchCompanyDocuments(dispatch);
    let resp8 = await fetchDepartments(dispatch);
    // let resp9 = await fetchDepartmentEmployees(dispatch);
    let resp10 = await fetchDepartmentManagers(dispatch);
    dispatch(actionCreator(ActionTypes.LOADING_DONE));
    let hasError = false;
    let responses = [resp1, resp2, resp3, resp4, resp5, resp6, resp7, resp8];
    responses.map((resp) => {
      if (resp.error) {
        hasError = true;
      }
    });

    // if (hasError) {
    //   if (retry !== 0) {
    //     retrieve(payload);
    //     --retry;
    //   } else {
    //     alert("Error in fetching some data");
    //   }
    // }
  };

  useEffect(() => {
    _props.history.listen(location => {
      if (location.pathname !== "/myAccount") {
        sessionStorage.setItem("_tab", 0)
      }
    })
    retrieve(payload);
  }, [_props.location]);

  return (
    <main className="c-main">
      <CContainer fluid>
        {isAppLoading ? (
          loading
        ) : (
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
          )}
      </CContainer>
    </main>
  );
};

export default React.memo(AppContent);
