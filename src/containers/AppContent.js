import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer } from "@coreui/react";
import { Loader } from "reusable";
import { useSelector, useDispatch } from "react-redux";
// routes config
import routes from "router";
import { filterModule, plotArray } from "utils/helpers";
import Page404 from "modules/placeholder/page404/Page404";
import { LEAVE_REQUEST_FILTER } from "utils/constants/constant";
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
  fetchDepartmentManagers,
  fetchPerformanceReviews,
  fetchEmployeeAccounts
} from "utils/helpers/fetch";
const loading = <Loader bg="transparent" app={false} />;

const AppContent = (_props) => {
  const user = useSelector((state) => state.appState.auth.user);
  const isAppLoading = useSelector((state) => state.appState.app.loading);
  const { employeeId, roleId } = user;
  let payload = LEAVE_REQUEST_FILTER('All');
  const accessedRoutes = filterModule(routes, roleId);
  const dispatch = useDispatch();
  const retrieve = async (payload) => {
    dispatch(actionCreator(ActionTypes.LOADING_STARTED));
    let resp1 = await retrieveLeaveRequests(dispatch, { ...payload, ...{ employeeId, roleId } });
    let resp2 = await fetchTickets(dispatch);
    let resp3 = await retrieveEmployees(dispatch);
    let resp4 = await fetchCompanyFiles(dispatch);
    let resp5 = await fetchCompanyVideos(dispatch);
    let resp6 = await fetchCompanyImages(dispatch);
    let resp7 = await fetchCompanyDocuments(dispatch);
    let resp8 = await fetchDepartments(dispatch);
    let resp9 = await fetchDepartmentEmployees(dispatch);
    let resp10 = await fetchDepartmentManagers(dispatch);
    let resp11 = await fetchPerformanceReviews(dispatch);
    let resp12 = await fetchEmployeeAccounts(dispatch);
    dispatch(actionCreator(ActionTypes.LOADING_DONE));
    let hasError = false;
    let responses = [resp1, resp2, resp3, resp4, resp5, resp6, resp7, resp8, resp9, resp10, resp11, resp12];
    responses.map((resp) => {
      if (resp.error) {
        hasError = true;
      }
    });

    if (hasError) {
      dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: 'error', message: "Error in fetching data." }));
    }
  };

  useEffect(() => {
    retrieve(payload);
  }, []);

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
