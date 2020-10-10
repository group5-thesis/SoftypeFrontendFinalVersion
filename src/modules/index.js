import React, { Component } from "react"
import { Loader } from "reusable"
import AppPages from './App'
import NetworkDetectorHOC from "containers/NetworkDetectorHOC"
class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.checkLogin()
  }
  render() {
    const { auth_checked } = this.props.appState.auth
    if (!auth_checked) {
      return <Loader /> //show loading screen
    }
    return <AppPages  {...this.props} /> //show the actual app
  }
}
export default NetworkDetectorHOC(App)