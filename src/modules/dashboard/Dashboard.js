import React, { lazy, useState, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CDataTable
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux';
import { copyArray, setWidth, toCapitalize, shallowCopy, RULES, getBaseUrl } from 'utils/helpers';
import { NoData, Card, Modal } from 'reusable';
import { useHistory } from "react-router-dom";

const Widgets = lazy(() => import('../dashboard/component/Widget.js'))

const Dashboard = () => {

  const usersData = [
    // { id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending' },
    // { id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
    // { id: 2, name: 'Test Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
    // { id: 3, name: 'TEst Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
    // { id: 4, name: 'TEstse Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
  ]

  const fields = [
    { key: 'name', _style: { width: '40%' } },
    { key: 'date', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  const stateActiveEmployees = useSelector((state) => {
    return state.appState.employee.employees.filter(emp => {
      return emp.isActive === 1
    })
  });

  const stateLeaveRequests = useSelector((state) => {
    return state.appState.leave.leave_requests
  });

  const history = useHistory();
  const [totalEmployees, setTotalEmployees] = useState(stateActiveEmployees.length)
  const [totalLeave, setTotalLeave] = useState(stateLeaveRequests)

  const viewEmployees = () => {
    history.push(`/employees`);
  }

  const viewLeaveCalendar = () => {
    history.push(`/leave/calendar`);
  }

  const viewLeaveRequests = () => {
    history.push(`/leave/requests`);
  }

  const viewOfficeRequests = () => {
    history.push(`/requests`);
  }

  useEffect(() => {
    return
  }, [totalEmployees, totalLeave])

  return (
    <>
      <Widgets {...{ totalEmployees, viewLeaveRequests, viewOfficeRequests, viewEmployees, viewLeaveCalendar }} />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm="6">
                  <div>
                    {"Recent Leave Requests"}
                  </div>
                </CCol>
                <CCol sm="6" className="d-none d-md-block">
                  <div className="float-right">
                    <CButton size="sm" color="primary" onClick={() => {
                      viewLeaveRequests()
                    }} disabled={false}>
                      {"View All"}
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                hover
                noItemsViewSlot={<NoData title="No Requests"/>}
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm="6">
                  <div>
                    {"Recent Office Requests"}
                  </div>
                </CCol>
                <CCol sm="6" className="d-none d-md-block">
                  <div className="float-right">
                    <CButton size="sm" color="primary" onClick={() => {
                      viewOfficeRequests()
                    }} disabled={false}>
                      {"View All"}
                    </CButton>
                  </div>
                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                hover
                noItemsViewSlot={<NoData title="No Requests" />}
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
