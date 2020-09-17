import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'scss/style.scss';
import { PublicRoute, ProtectedRoute } from "router/routeContainer";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const AppLayout = React.lazy(() => import('containers/AppLayout'));

// Pages
const Login = React.lazy(() => import('views/login/Login'));
const Register = React.lazy(() => import('views/pages/register/Register'));
const ForgotPassword = React.lazy(() => import('views/forgot-password/Forgot-Password'));
const Page404 = React.lazy(() => import('views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('views/pages/page500/Page500'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <PublicRoute exact path="/login" name="Login Page" component={Login} {...this.props} />
            <PublicRoute exact path="/register" name="Register Page" component={Register} {...this.props} />
            <PublicRoute exact path="/account-recovery" name="Forgot Password" component={ForgotPassword} {...this.props} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <ProtectedRoute path="/" name="Home" component={AppLayout} {...this.props} />
            <Redirect from='*' to='/404' />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
