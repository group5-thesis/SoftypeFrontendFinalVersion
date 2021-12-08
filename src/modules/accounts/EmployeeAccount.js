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
  CSpinner,
  CPopover
} from '@coreui/react'
import { NoData, ConfirmDialog } from 'reusable'
import Icon from '@mdi/react';
import { mdiAccountOffOutline, mdiLockReset, mdiAccountCheckOutline, mdiInformation } from '@mdi/js';
import colors from 'assets/theme/colors';
import { fetchEmployeeAccounts } from 'utils/helpers/fetch';
import api from 'utils/api';
import { dispatchNotification } from 'utils/helpers'

const Accounts = () => {

  const [disableAccount, setDisableAccount] = useState(false)
  const [resetAccount, setResetAccount] = useState(false)
  const [enableAccount, setEnableAccount] = useState(false)
  const [accountDisable, setAccountDisable] = useState({})
  const [accountReset, setAccountReset] = useState({})
  const [accountEnable, setAccountEnable] = useState({})
  const dialog = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const stateAccounts = useSelector((state) => {
    return state.appState.accounts.accounts.filter(emp => {
      return emp.employeeId !== state.appState.auth.user.employeeId
    })
  });

  const fields = [
    { key: 'name', _style: { width: '25%' } },
    { key: 'username', _style: { width: '20%' } },
    { key: 'account type', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    { key: 'action', _style: { width: '20%' } },
  ]

  const clickedDisableBtn = (user) => { // Disable Account Button
    debugger
    setAccountDisable(user)
    dialog.current.toggle()
    setDisableAccount(true)
  }

  const clickedEnableBtn = (user) => { // Enable Account Button
    debugger
    setAccountEnable(user)
    dialog.current.toggle()
    setEnableAccount(true)
  }

  const clickedResetBtn = (user) => { // Reset Account Button
    setAccountReset(user)
    dialog.current.toggle()
    setResetAccount(true)
  }

  const handleDisableAccount = async () => {
    return
    setIsLoading(true)
    dispatchNotification(dispatch, { type: 'info', message: "Please wait." })
    let res = await api.post('/disable_employee_account', { userId: accountDisable.userId })
    setIsLoading(false)
    if (!res.error) {
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
      fetchEmployeeAccounts(dispatch)
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setDisableAccount(false)
  }

  const handleResetAccount = async () => { // Lacking
    return
    setIsLoading(true)
    dispatchNotification(dispatch, { type: 'info', message: "Please wait." })
    let res = await api.post('/reset_employee_account', { userId: accountReset.userId })
    setIsLoading(false)
    if (!res.error) {
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
      fetchEmployeeAccounts(dispatch)
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setResetAccount(false)
  }

  const handleEnableAccount = async () => {
    return
    setIsLoading(true)
    dispatchNotification(dispatch, { type: 'info', message: "Please wait." })
    let res = await api.post('/enable_employee_account', { userId: accountEnable.userId })
    setIsLoading(false)
    if (!res.error) {
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
      fetchEmployeeAccounts(dispatch)
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setEnableAccount(false)

  }

  const _renderIcon = () => {
    return (<>
      {[1, 2].map((i) => {
        return (
          <h6 key={i} className="card-title mb-0">
            <Icon path={mdiInformation} size={0.8} />test
          </h6>
        )
      })}
    </>)
  }

  useEffect(() => {
    return
  }, [accountDisable, accountReset, accountEnable])

  return (
    <CRow>
      <CCol xl={12}>
        <ConfirmDialog
          ref={dialog}
          id="custom_dialog"
          {...{
            show: dialog,
            onConfirm: () => {
              disableAccount ? handleDisableAccount() : resetAccount ? handleResetAccount() : enableAccount ? handleEnableAccount() : console.log()
            },
            onCloseCallback: () => {
              setDisableAccount(false)
              setResetAccount(false)
              setEnableAccount(false)
            },
            title: `Are you sure to ${disableAccount ? "deactivate" : resetAccount ? "reset" : enableAccount ? "activate" : ""} this account?`
          }}
        >
        </ConfirmDialog>
        <CCard>
          <CCardBody>
            <CRow className="mb-3">
              <CCol sm="5">
                <h4 className="card-title mb-0">Accounts
                  {/* <CPopover header='Legend' content={
                    <CCard width={500}>
                      <CCardBody>
                        {_renderIcon()}
                      </CCardBody>
                    </CCard>
                  }>
                    <Icon path={mdiInformation} size={0.8} />
                  </CPopover> */}
                </h4>
              </CCol>
              <CCol sm="7">
                <div className="float-right">
                  {
                    isLoading && <CSpinner color="primary" />
                  }
                </div>
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
                      <CBadge color={item.isDeactivated === 0 ? "success" : "danger"}>
                        {item.isDeactivated === 0 ? "Activated" : "Deactivated"}
                      </CBadge>
                    </td>
                  ),
                'action':
                  (item) => (
                    <td>
                      <CPopover header={`${item.isDeactivated === 0 ? "Deactivate" : "Activate"} Account`}>
                        <CButton onClick={() => {
                          item.isDeactivated === 0 ? clickedDisableBtn(item) : clickedEnableBtn(item)
                        }}>
                          <Icon path={item.isDeactivated === 0 ? mdiAccountOffOutline : mdiAccountCheckOutline}
                            size={1}
                            horizontal
                            vertical
                            rotate={180}
                            color={item.isDeactivated === 0 ? colors.$red : colors.$green}
                          />
                        </CButton>
                      </CPopover>
                      {
                        item.isDeactivated === 0 &&
                        <CPopover header={item.isPasswordChanged !== 0 ? "Reset Password" : "Unchanged Password"}>
                          <CButton
                            onClick={() => {
                              if (item.isPasswordChanged !== 0) {
                                clickedResetBtn(item)
                              }
                            }}
                          >
                            <Icon path={mdiLockReset}
                              size={1}
                              horizontal
                              vertical
                              rotate={180}
                              color={item.isPasswordChanged !== 0 ? colors.$orange : colors.$grey}
                            />
                          </CButton>
                        </CPopover>

                      }
                    </td>
                  )
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default Accounts
