import React, { useRef } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import res from 'assets/img'
import { useHistory } from 'react-router-dom'
import { Modal } from 'reusable'
import ProfilePage from 'views/profile/Profile'
const AppHeaderDropdown = () => {
  const modalRef = useRef(null)
  let history = useHistory()
  const goToRoute = (route) => {
    modalRef.current.toggle()
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <Modal ref={modalRef} {...{
        title: "Profile",
        size: "lg",
        hidden: true
      }}>
        <ProfilePage />
      </Modal>
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={res.avatar}
            className="c-avatar-img"
            alt="userlogo"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => {
          goToRoute("/profile")
        }}>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
