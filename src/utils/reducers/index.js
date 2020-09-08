import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import employee from './employee'

const rootReducer = combineReducers({
  auth,
  app,
  employee
})

export default rootReducer;