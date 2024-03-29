import React, { useRef } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CButton,
  CTooltip
} from '@coreui/react'
import { Modal } from 'reusable';
import WidgetModalContent from 'modules/dashboard/component/WidgetModalContent'
import Icon from '@mdi/react';
import { mdiAccountArrowRightOutline, mdiAccountGroupOutline, mdiCake, mdiAccountClockOutline, mdiOfficeBuildingOutline } from '@mdi/js';

const Widgets = (
  { user,
    totalEmployees,
    viewLeaveRequests,
    viewOfficeRequests,
    viewEmployees,
    viewLeaveCalendar,
    employeesOnLeave,
    pendingLeaveRequests,
    todaysPendingOfficeRequests,
    viewDepartmentInfo,
    employeeDepartment,
    stateBirthdayEmployees
  }
) => {

  const modal = useRef();

  const toggleModal = (e) => {
    modal.current.toggle();
  };

  return (
    <CRow>
      <Modal
        ref={modal}
        centered
        title="Today's Birthday Celebrant/s"
        modalOnClose={toggleModal}
        hidden
        closeButton
        footer={
          <>
            <CButton color="danger" onClick={() => {
              toggleModal()
            }}>Close</CButton>
          </>
        }
        hideCancelButton
      >
        <WidgetModalContent {... { content: stateBirthdayEmployees }} />
      </Modal>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ minHeight: '150px' }}
          color="gradient-primary"
          header={<h2>{`${employeesOnLeave}`}</h2>}
          text={"Employees on Leave"}
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '70px' }}
            >
            </div>
          }
        >
          {/* {
            employeesOnLeave.length === 0 ?
              <CDropdown>
                <CDropdownToggle color="transparent">
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem onClick={() => {
                    viewLeaveCalendar()
                  }}>View Leave Calendar</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              : ""
          } */}
          <Icon path={mdiAccountArrowRightOutline}
            size={1.8}
            horizontal
            vertical
            rotate={180}
          />
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ minHeight: '150px' }}
          color="gradient-info"
          header={<h2>{`${totalEmployees}`}</h2>}
          text="Total Employees"
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '70px' }}
            >
            </div>
          }
        >
          {/* {
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
          } */}
          <Icon path={mdiAccountGroupOutline}
            size={1.8}
            horizontal
            vertical
            rotate={180}
          />
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ minHeight: '150px' }}
          color="gradient-warning"
          header={<h2>{`${stateBirthdayEmployees.length}`}</h2>}
          text={stateBirthdayEmployees.length === 0 ? "No Birthday/s Today" : "Birthday Celebrants"}
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '70px' }}
            >
            </div>
          }
        >
          {/* {
            stateBirthdayEmployees.length !== 0 ?
              <CDropdown>
                <CDropdownToggle color="transparent">
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem onClick={() => {
                    toggleModal()
                  }}>See who's celebrating</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              : ""
          } */}
          <CTooltip content={stateBirthdayEmployees.length !== 0 ? "See who's celebrating" : "Nobody's celebrating now"}>
            <Icon path={mdiCake}
              size={1.8}
              horizontal
              style={{ cursor: 'pointer' }}
              vertical
              onClick={() => {
                toggleModal()
              }}
              rotate={180}
            />
          </CTooltip>

        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ minHeight: '150px' }}
          color="gradient-danger"
          header={user.accountType === 3 && employeeDepartment.length !== 0 ? <h2 className="blockquote">{`${employeeDepartment[0].department_name}`}</h2> : user.accountType === 3 && employeeDepartment.length === 0 ? <h2><i>{"UNSET"}</i></h2> : <h2>{pendingLeaveRequests}</h2>}
          text={user.accountType === 3 ? "Department" : user.accountType === 1 || user.accountType === 2 ? "Pending Leave Requests" : ""}
          footerSlot={
            <div
              className={'text-center'}
              style={{ height: '70px' }}
            >
            </div>
          }
        >
          {/* {
            (user.accountType === 3 && employeeDepartment.length !== 0) ||
              (user.accountType === 1 && todaysPendingLeaveRequests.length !== 0) ||
              (user.accountType === 2 && todaysPendingLeaveRequests.length !== 0) ?
              <CDropdown>
                <CDropdownToggle caret className="text-white" color="transparent">
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem onClick={() => {
                    user.accountType === 3 ? viewDepartmentInfo(employeeDepartment[0].department_id) : viewLeaveRequests()
                  }}>{user.accountType === 3 ? `View Department` : `View Leave Requests`}</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              : ""
          } */}
          <Icon path={user.accountType !== 3 ? mdiAccountClockOutline : mdiOfficeBuildingOutline}
            size={1.8}
            horizontal
            vertical
            rotate={180}
          />
        </CWidgetDropdown>
      </CCol>
    </CRow >
  )
}

export default Widgets
