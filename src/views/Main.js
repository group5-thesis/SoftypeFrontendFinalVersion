import React, { Component } from "react";
import { Loader } from "reusable";
import AppRoutes from './Routes';
import NetworkDetectorHOC from "containers/NetworkDetectorHOC";

class App extends Component {
  constructor(props) {
    super(props);
    props.checkLogin();
  }
  render() {
    const { auth_checked } = this.props.appState.auth;
    if (!auth_checked) {
      return _renderLoader();
    }
    return _renderRootNavigation();
  }
}
const _renderRootNavigation = () => {
  return <AppRoutes />
};

const _renderLoader = () => <Loader />;
export default NetworkDetectorHOC(App);