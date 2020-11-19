import React, { lazy, useState, useEffect, useRef } from 'react'
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
import { useSelector, useDispatch } from 'react-redux';
import { toCapitalize, formatDate, renameKey } from 'utils/helpers';
import { NoData, Modal, ConfirmDialog } from 'reusable';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import moment from 'moment'
import { TICKET_STATUS } from "utils/constants/constant";
import TicketDetails from "modules/ticket/component/TicketDetails";
import api from 'utils/api'
import { ActionTypes, actionCreator } from 'utils/actions';
import { fetchTickets } from 'utils/helpers/fetch.js';

const Widgets = lazy(() => import('../dashboard/component/Widget.js'))

const Dashboard = () => {

  const modal = useRef();
  const dispatch = useDispatch();
  const dialog = useRef();

  const LeaveRequestFields = [
    { key: 'name', _style: { width: '25%' } },
    { key: 'date from', _style: { width: '20%' } },
    { key: 'date to', _style: { width: '20%' } },
    { key: 'status', _style: { width: '5%' } },
  ]

  const OfficeRequestFields = [
    { key: 'name', _style: { width: '25%' } },
    { key: 'item', _style: { width: '20%' } },
    { key: 'date needed', _style: { width: '20%' } },
    { key: 'status', _style: { width: '5%' } },
  ]

  const getBadgeLeave = (status) => {
    switch (status) {
      case 'Approved': return 'success'
      case 'Pending': return 'primary'
      case 'Rejected': return 'danger'
      default: return 'primary'
    }
  }

  const user = useSelector(state => {
    let authed = state.appState.auth.user;
    return {
      firstname: authed.firstname,
      lastname: authed.lastname,
      employeeId: authed.employeeId,
      userId: authed.userId
    }
  })

  const stateActiveEmployees = useSelector((state) => {
    return state.appState.employee.employees.filter(emp => {
      return emp.isActive === 1
    })
  });

  const stateLeaveRequests = useSelector((state) => {
    return state.appState.leave.leave_requests.filter(req => {
      return req['status'] === "pending"
    })
  });

  const stateOfficeRequests = useSelector((state) => {
    return state.appState.ticket.ticket_requests.filter(req => {
      return req['status'] === 1
    })
  });

  const stateEmployeesOnLeave = useSelector((state) => {
    return state.appState.leave.leave_requests.filter(emp => {
      return moment().isBetween(emp['date from'], emp['date to'])
    })
  });

  const statePendingLeaveRequests = useSelector((state) => {
    return state.appState.leave.leave_requests.filter(req => {
      // return formatDate(req['created at']) === formatDate(moment()) && req['status'] === "pending"
      return req['status'] === "pending"
    })
  });

  const statePendingOfficeRequests = useSelector((state) => {
    return state.appState.ticket.ticket_requests.filter(req => {
      // return formatDate(req['date requested']) === formatDate(moment()) && req['status'] === 1
      return req['status'] === 1
    })
  });

  const history = useHistory();
  const [totalEmployees, setTotalEmployees] = useState(stateActiveEmployees.length)
  const [employeesOnLeave, setEmployeeOnLeave] = useState(stateEmployeesOnLeave.length)
  const [todaysPendingLeaveRequests, setTodaysPendingLeaveRequests] = useState(statePendingLeaveRequests.length)
  const [todaysPendingOfficeRequests, setTodaysPendingOfficeRequests] = useState(statePendingOfficeRequests.length)
  // const [recentLeaveRequest, setRecentLeaveRequest] = useState(_.orderBy(stateLeaveRequests, ['created at'], ['desc']))
  // const [recentOfficeRequest, setRecentOfficeRequest] = useState(_.orderBy(stateOfficeRequests, ['date requested'], ['desc']))
  const [recentLeaveRequest, setRecentLeaveRequest] = useState(stateLeaveRequests)
  const [recentOfficeRequest, setRecentOfficeRequest] = useState(stateOfficeRequests)

  // Office Request
  const [tickets, setTickets] = useState();
  const [clickedRejectBtn, setClickedRejectBtn] = useState(false);
  const [clickedApproveBtn, setClickedApproveBtn] = useState(false);

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

  const viewLeaveRequestDetails = (id) => {
    history.push(`/leave/requests/${id}`);
  }

  // Office request

  const getBadge = (STATUS, status) => {
    return STATUS[status];
  };

  const rejectRequestBtn = () => {
    setClickedRejectBtn(true)
    modal.current.toggle();
    dialog.current.toggle();
  }

  const approveRequestBtn = () => {
    setClickedApproveBtn(true)
    modal.current.toggle();
    dialog.current.toggle();
  }

  const onConfirm = async () => {
    let data = {
      officeRequestId: tickets.id,
      employeeId: user.employeeId,
      indicator: clickedApproveBtn ? 1 : clickedRejectBtn ? 0 : 0
    }
    let res = await api.post("/close_officeRequest", data)
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.CLOSE_TICKET, renameKey(res.data.officeRequest_information[0])))
      fetchTickets(dispatch);
    } else {
      alert("error")
    }
    setClickedApproveBtn(false)
    setClickedRejectBtn(false)
  }

  const toggleModal = (e) => {
    setTickets(e);
    modal.current.toggle();
  };

  useEffect(() => {
    return
  }, [
      totalEmployees,
      recentLeaveRequest,
      recentOfficeRequest,
      employeesOnLeave,
      todaysPendingLeaveRequests,
      todaysPendingOfficeRequests
    ]
  )

  return (
    <>
      <Widgets {...{
        totalEmployees,
        viewLeaveRequests,
        viewOfficeRequests,
        viewEmployees,
        viewLeaveCalendar,
        employeesOnLeave,
        todaysPendingLeaveRequests,
        todaysPendingOfficeRequests
      }} />
      <CRow>
        <CCol>
          <ConfirmDialog
            ref={dialog}
            {...{
              show: dialog,
              centered: true,
              onConfirm,
              title: `${clickedApproveBtn ? "Approve" : clickedRejectBtn ? "Reject" : ""} request?`,
              onCloseCallback: () => {
                modal.current.toggle();
                setClickedApproveBtn(false)
                setClickedRejectBtn(false)
              }
            }}
          ></ConfirmDialog>
          <Modal
            ref={modal}
            centered
            title="Request Details"
            modalOnClose={toggleModal}
            hidden
            closeButton
            footer={
              (tickets && tickets.status === 1) &&
              <>
                <CButton color="success" onClick={() => {
                  approveRequestBtn()
                }}>Approve</CButton>
                <CButton color="danger" onClick={() => {
                  rejectRequestBtn()
                }}>Reject</CButton>
              </>
            }
            hideCancelButton
          >
            <TicketDetails
              {...tickets}
            />
          </Modal>
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
                items={_.orderBy(recentLeaveRequest, ['created at'], ['desc']).slice(0, 5)}
                fields={LeaveRequestFields}
                hover
                clickableRows
                noItemsViewSlot={<NoData title="No Requests" />}
                onRowClick={(item) => {
                  viewLeaveRequestDetails(item.id)
                }}
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadgeLeave(item.status)}>
                          {toCapitalize(item.status)}
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
                items={_.orderBy(recentOfficeRequest, ['date requested'], ['desc']).slice(0, 5)}
                fields={OfficeRequestFields}
                hover
                clickableRows
                noItemsViewSlot={<NoData title="No Requests" />}
                onRowClick={toggleModal}
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(TICKET_STATUS, item.status)}>
                          {item.status === 1 ? "Open" : "Closed"}
                        </CBadge>
                      </td>
                    )
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
