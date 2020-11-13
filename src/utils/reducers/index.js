import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import employee from './employee'
import leave from './leave'
import ticket from './ticket'
import files from './files'
import department from './department'
import performance_review from './performance_review'
import department_manager from './department_managers'
import department_employee from './department_employees'
import accounts from './account'

const rootReducer = combineReducers({
  auth,
  app,
  employee,
  accounts,
  leave,
  ticket,
  files,
  department,
  performance_review,
  department_manager,
  department_employee
})

export default rootReducer;
