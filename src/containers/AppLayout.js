import React, { useEffect } from 'react'
import {
  AppContent,
  AppSidebar,
  AppHeader
} from '.'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const AppLayout = () => {
  const isLoggedIn = useSelector(state => state.appState.auth.already_logged)
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }
  return (
    <div className="c-app c-default-layout">
      <AppSidebar />
      <div className="c-wrapper">
        <AppHeader />
        <div className="c-body">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default AppLayout
