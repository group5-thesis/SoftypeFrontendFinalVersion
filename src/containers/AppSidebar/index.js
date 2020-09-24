import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import res from 'assets/img'
import navigation from './SideMenu'
import { actionCreator, ActionTypes } from 'utils/actions'
import { filterModule } from 'utils/helpers';

const AppSidebar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const show = useSelector(state => state.appState.app.sidebarShow)
  const user = useSelector(state => state.appState.auth.user)
  const logout = () => {
    dispatch(actionCreator(ActionTypes.LOGOUT))
    history.push("/login")
  }
  let sideMenu = filterModule(navigation , user.roleId) 
  // navigation.filter(menu => {
  //   let result =  menu.user.includes(Number(user.roleId) )|| menu.user.includes(4)
  //   return result
  // })
  sideMenu = sideMenu.concat([{
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
  }])
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
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={sideMenu}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>

    </CSidebar>
  )
}

export default React.memo(AppSidebar)
