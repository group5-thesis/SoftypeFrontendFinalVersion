import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppView from 'views/AppContainer'

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppView />
      </Provider>
    )
  }
}
