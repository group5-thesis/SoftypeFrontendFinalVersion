import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { icons } from 'assets/icons'
import configureStore from 'utils/store/configureStore'
import Root from 'app/Root'
<<<<<<< HEAD


=======
import { disableLogger } from 'utils/helpers/disableLogger';
// import 
>>>>>>> 70f7e6b831bd5b1c62fa2c867866631a099e31e5
let store = configureStore()
React.icons = icons

disableLogger();

ReactDOM.render(
  <Root store={store} />
  , document.getElementById('root')
)
serviceWorker.unregister()

