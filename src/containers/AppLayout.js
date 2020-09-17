import React from 'react'
import {
  AppContent,
  AppSidebar,
  AppHeader
} from '.'

const AppLayout = () => {
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
