import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { icons } from 'assets/icons'
import configureStore from 'utils/store/configureStore'
import Root from 'app/Root'
let store = configureStore()
React.icons = icons

ReactDOM.render(
  <Root store={store} />
  , document.getElementById('root')
)
serviceWorker.unregister()

