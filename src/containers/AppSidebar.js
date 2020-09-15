import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import res from 'assets/img'
import navigation from './navigation'
// import { navigations } from './navigation'
import { actionCreator, ActionTypes } from 'utils/actions';

const AppSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.appState.app.sidebarShow)
  const logout = () => {
    dispatch(actionCreator(ActionTypes.LOGOUT))
  }
  navigation.push(
    {
      _tag: 'CSidebarNavDivider',
      className: 'm-2'
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Logout',
      to: '',
      icon: 'cil-account-logout',
      label: true,
      onClick: logout
    },
    {
      _tag: 'CSidebarNavDivider',
      className: 'm-2'
    }
  )

  return (
    <CSidebar
      show={show}
      className="bg-dark"
      onShowChange={(val) => dispatch(actionCreator(ActionTypes.TOGGLE_SIDEBAR, { sidebarShow: val }))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          src={res.logo}
          height={25}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          src={res.logoReact}
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
