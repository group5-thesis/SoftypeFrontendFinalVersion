import React from 'react'
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader
} from 'containers'

const AppLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <AppSidebar/>
      <div className="c-wrapper">
        <AppHeader/>
        <div className="c-body">
          {/* <AppContent/> */}
        </div>
        {/* <AppFooter/> */}
      </div>
    </div>
  )
}

export default AppLayout
