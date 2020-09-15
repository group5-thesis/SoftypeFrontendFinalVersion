import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import leave from './leave'

const rootReducer = combineReducers({
  auth,
  app,
  leave
})

export default rootReducer;