import React, { useEffect } from 'react'
import {
  AppContent,
  AppSidebar,
  AppHeader
} from '.'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actionCreator, ActionTypes } from 'utils/actions';
import api from 'utils/api'

const AppLayout = (props) => {
  const isLoggedIn = useSelector(state => state.appState.auth.already_logged);
  const user = useSelector(state => state.appState.auth.user);
  const dispatch = useDispatch()
  const checkUser = async () => {
    let { userId } = user;
    let res = await api.get(`/getProfile?userId=${userId}`)
    let { error, data } = res
    if ((error) || !data.length) {
      localStorage.clear();
      sessionStorage.clear();
      // dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, null))
      dispatch(actionCreator(ActionTypes.LOGOUT))
      return <Redirect to="/login" />
    }
    if (Number(user.is_password_changed) === 0) {
      return <Redirect to="/change-password" />
    }
  }
  if (user) {
    if (Number(user.is_password_changed) === 0) return <Redirect to="/change-password" />
  }
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }
  return (
    <div className="c-app c-default-layout">
      <AppSidebar {...props} />
      <div className="c-wrapper">
        <AppHeader {...props} />
        <div className="c-body">
          <AppContent {...props} />
        </div>
      </div>
    </div>
  )
}

export default AppLayout
