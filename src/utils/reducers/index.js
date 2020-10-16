import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import employee from './employee'
import leave from './leave'
import ticket from './ticket'

const rootReducer = combineReducers({
  auth,
  app,
  employee,
  leave,
  ticket
})

export default rootReducer;
