import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import employee from './employee'
import leave from './leave' 

const rootReducer = combineReducers({
  auth,
  app,
  employee,
  leave
})

export default rootReducer;