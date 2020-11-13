import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination,
  CPopover
} from '@coreui/react'
import { NoData, ConfirmDialog } from 'reusable'
import Icon from '@mdi/react';
import { mdiAccountOffOutline, mdiLockReset } from '@mdi/js';
import colors from 'assets/theme/colors';

const Accounts = () => {

  const [disableAccount, setDisableAccount] = useState(false)
  const [resetAccount, setResetAccount] = useState(false)
  const [accountDisable, setAccountDisable] = useState({})
  const [accountReset, setAccountReset] = useState({})
  const dialog = useRef();

  const stateAccounts = useSelector((state) => {
    return state.appState.accounts.accounts
  });

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  const fields = [
    { key: 'name', _style: { width: '25%' } },
    { key: 'username', _style: { width: '20%' } },
    { key: 'account type', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    { key: 'action', _style: { width: '20%' } },
  ]

  const clickedDisableBtn = (user) => {
    console.log(user)
    // setAccountDisable(user)
    dialog.current.toggle()
    setDisableAccount(true)
  }

  const clickedResetBtn = (user) => {
    // setAccountReset(user)
    console.log(user)
    dialog.current.toggle()
    setResetAccount(true)
  }

  const handleDisableAccount = () => {
    console.log("Disable Account")
    setDisableAccount(false)
  }

  const handleResetAccount = () => {
    console.log("Reset Account")
    setResetAccount(false)
  }

  useEffect(() => {
    // console.log(accountDisable)
    return
  }, [accountDisable])

  return (
    <CRow>
      <CCol xl={12}>
        <ConfirmDialog
          ref={dialog}
          id="custom_dialog"
          {...{
            show: dialog,
            onConfirm: () => {
              disableAccount ? handleDisableAccount() : resetAccount ? handleResetAccount() : console.log()
            },
            onCloseCallback: () => {
              setDisableAccount(false)
              setResetAccount(false)
            },
            title: `Are you sure to ${disableAccount ? "disable" : resetAccount ? "reset" : ""} this account?`
          }}
        >
        </ConfirmDialog>
        <CCard>
          <CCardBody>
            <CRow className="mb-3">
              <CCol sm="5">
                <h4 className="card-title mb-0">Accounts</h4>
              </CCol>
            </CRow>
            <CDataTable
              items={stateAccounts}
              fields={fields}
              hover
              striped
              itemsPerPage={10}
              pagination
              noItemsViewSlot={<NoData />}
              // activePage={page}
              scopedSlots={{
                'name':
                  (item) => (
                    <td>
                      {`${item.employee_name}`}
                    </td>
                  ),
                'username':
                  (item) => (
                    <td>
                      {`${item.employee_username}`}
                    </td>
                  ),
                'account type':
                  (item) => (
                    <td>
                      {item.employee_accountType === 2 ? "Manager/Supervisor" : item.employee_accountType === 3 ? "Employee" : "Admin"}
                    </td>
                  ),
                'status':
                  (item) => (
                    <td>
                      <CBadge color={item.isDisabled === 0 ? "success" : "danger"}>
                        {item.isDisabled === 0 ? "Active" : "Inactive"}
                      </CBadge>
                    </td>
                  ),
                'action':
                  (item) => (
                    <td>
                      <CPopover header="Disable Account">
                        <CButton onClick={() => {
                          clickedDisableBtn(item)
                        }}>
                          <Icon path={mdiAccountOffOutline}
                            size={1}
                            horizontal
                            vertical
                            rotate={180}
                            color={colors.$red}
                          />
                        </CButton>
                      </CPopover>
                      <CPopover header="Reset Account">
                        <CButton onClick={() => {
                          clickedResetBtn(item)
                        }}>
                          <Icon path={mdiLockReset}
                            size={1}
                            horizontal
                            vertical
                            rotate={180}
                            color={colors.$orange}
                          />
                        </CButton>
                      </CPopover>

                    </td>
                  )
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accounts
