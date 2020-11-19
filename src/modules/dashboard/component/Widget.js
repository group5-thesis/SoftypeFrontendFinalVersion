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
  { totalEmployees,
    viewLeaveRequests,
    viewOfficeRequests,
    viewEmployees,
    viewLeaveCalendar,
    employeesOnLeave,
    todaysPendingLeaveRequests,
    todaysPendingOfficeRequests }
) => {

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={`${employeesOnLeave}`}
          text="Employees on Leave"
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
          <CDropdown>
            <CDropdownToggle color="transparent">
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem onClick={() => {
                viewEmployees()
              }}>View Employees</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={`${todaysPendingOfficeRequests}`}
          text="Office Requests"
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
                viewOfficeRequests()
              }}>View Office Requests</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={`${todaysPendingLeaveRequests}`}
          text={`Pending Leave Requests`}
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
                viewLeaveRequests()
              }}>View Leave Requests</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default Widgets
