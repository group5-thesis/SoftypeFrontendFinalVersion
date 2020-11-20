import React from 'react';
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'

const Widgets = (
  { user,
    totalEmployees,
    viewLeaveRequests,
    viewOfficeRequests,
    viewEmployees,
    viewLeaveCalendar,
    employeesOnLeave,
    todaysPendingLeaveRequests,
    todaysPendingOfficeRequests,
    viewDepartmentInfo,
    employeeDepartment,
    employeeRemainingLeave
  }
) => {

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={`${employeesOnLeave}`}
          text={"Employees on Leave"}
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '50px' }}
            >
            </div>
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={() => {
                viewLeaveCalendar()
              }}>View Leave Calendar</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={`${totalEmployees}`}
          text="Total Employees"
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '50px' }}
            >
            </div>
          }
        >
          {
            user.accountType !== 3 ?
              <CDropdown>
                <CDropdownToggle color="transparent">
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem onClick={() => {
                    viewEmployees()
                  }}>View Employees</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              : ""
          }
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={user.accountType === 3 || user.accountType === 2 ? `${employeeRemainingLeave}` : `${todaysPendingOfficeRequests}`}
          text={user.accountType === 3 || user.accountType === 2 ? "Remaining Leave" : user.accountType === 1 ? "Office Requests" : ""}
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '50px' }}
            >
            </div>
          }
        >
          {
            user.accountType !== 3 && user.accountType !== 2 ?
              <CDropdown>
                <CDropdownToggle color="transparent">
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem onClick={() => {
                    viewOfficeRequests()
                  }}>View Office Requests</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              : ""
          }
        </CWidgetDropdown>

      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={user.accountType === 3 && employeeDepartment.length !== 0 ? `${employeeDepartment[0].department_name}` : user.accountType === 3 && employeeDepartment.length == 0 ? "UNSET" : `${todaysPendingLeaveRequests}`}
          text={user.accountType === 3 ? "Department" : user.accountType === 1 || user.accountType === 2 ? "Pending Leave Requests" : ""}
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '50px' }}
            >
            </div>
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={() => {
                user.accountType === 3 ? viewDepartmentInfo(employeeDepartment[0].department_id) : viewLeaveRequests()
              }}>{user.accountType === 3 ? `View Department` : `View Leave Requests`}</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow >
  )
}

export default Widgets
