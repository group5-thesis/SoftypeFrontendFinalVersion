import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter} from '@coreui/react'
import { ActionTypes, actionCreator } from "utils/actions";
// routes config
import routes from 'router'

import {AppHeaderDropdown} from '.'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => { return state.appState.app.sidebarShow })

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(actionCreator(ActionTypes.TOGGLE_SIDEBAR, { sidebarShow: val }));
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(actionCreator(ActionTypes.TOGGLE_SIDEBAR, { sidebarShow: val }));
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
     
      <CHeaderNav className="d-md-down-none mr-auto">
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <AppHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  )
}

export default AppHeader
