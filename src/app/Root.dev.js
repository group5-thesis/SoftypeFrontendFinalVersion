import React, { Component } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import AppView from 'modules/AppContainer'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <AppView/>
          <DevTools />
        </div>
      </Provider>
    )
  }
}
