import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import employee from './employee'
import leave from './leave'
import ticket from './ticket'
import files from './files'
import department from './department'
import performance_review from './performance_review'

const rootReducer = combineReducers({
  auth,
  app,
  employee,
  leave,
  ticket,
  files,
  department,
  performance_review
})

export default rootReducer;
