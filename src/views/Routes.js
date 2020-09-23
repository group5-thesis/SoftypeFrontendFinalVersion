import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'scss/style.scss';
import { PublicRoute, ProtectedRoute } from "router/routeContainer";
import { Loader } from 'reusable'

const AppLayout = React.lazy(() => import('containers/AppLayout'));
const Login = React.lazy(() => import('views/login/Login'));
const LoginQr = React.lazy(() => import('views/login/QrCodeScanner'));
const ForgotPassword = React.lazy(() => import('views/forgot-password/Forgot-Password'));
const Page404 = React.lazy(() => import('views/placeholder/page404/Page404'));
const Profile = React.lazy(() => import('views/profile/Profile')) 

const loading = (<Loader />)
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <PublicRoute exact path="/login" name="Login Page" component={Login} {...this.props} />
            <PublicRoute exact path="/loginQr" name="Login Page" component={LoginQr} {...this.props} />
            <PublicRoute exact path="/account-recovery" name="Forgot Password" component={ForgotPassword} {...this.props} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <ProtectedRoute path="/profile" name="Proile" component={Profile} {...this.props} />
            <ProtectedRoute path="/" name="Home" component={AppLayout} {...this.props} />
            <Redirect from='*' to='/404' />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
