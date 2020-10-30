import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import employee from './employee'
import leave from './leave'
import ticket from './ticket'
import files from './files'

const rootReducer = combineReducers({
  auth,
  app,
  employee,
  leave,
  ticket,
  files
})

export default rootReducer;
