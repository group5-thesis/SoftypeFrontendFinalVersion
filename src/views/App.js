import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'scss/style.scss';
import { Loader } from 'reusable'
const AppLayout = React.lazy(() => import('containers/AppLayout'));
const Login = React.lazy(() => import('modules/login/Loginv1'));
const ForgotPassword = React.lazy(() => import('modules/forgot-password/Forgot-Password'));
const Page404 = React.lazy(() => import('modules/placeholder/page404/Page404'));
// const Calendar = React.lazy(() => import('modules/calendar/Calendar'));
const Todo = React.lazy(() => import('modules/organizational-chart/chart'));
const loading = (<Loader />)
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" {...this.props} name="Login Page" render={(props) => {
              return <Login {...props} />
            }} />
            <Route exact path="/account-recovery" name="Forgot Password" component={ForgotPassword} {...this.props} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route path="/" {...this.props} name="Home" render={(props) => {
              return <AppLayout {...{ ...this.props, ...props }} />
            }} />
            <Redirect from='*' to='/404' />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default React.memo(App);
