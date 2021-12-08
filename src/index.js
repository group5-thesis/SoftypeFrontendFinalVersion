import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { icons } from 'assets/icons'
import configureStore from 'utils/store/configureStore'
import Root from 'app/Root'
import { disableLogger } from 'utils/helpers/disableLogger';
import { HashRouter } from 'react-router-dom'

// import
let store = configureStore()
React.icons = icons

disableLogger();

ReactDOM.render(
  <HashRouter>
    <Root store={store} />
  </HashRouter>
  , document.getElementById('root')
)
serviceWorker.register()

