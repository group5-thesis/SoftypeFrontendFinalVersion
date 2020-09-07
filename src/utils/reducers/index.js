import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'

const rootReducer = combineReducers({
  auth,
  app
})

export default rootReducer;