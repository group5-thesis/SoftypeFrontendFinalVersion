import React, { lazy, useRef, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButtonGroup, CButton } from '@coreui/react'
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from 'react-redux';
import { splitCamelCase, splitSnakeCase, insertProperty, shallowCopy, getAdminResponse, getDuration, dispatchNotification, respondToRequest, cancelRequest } from 'utils/helpers'
import { NoData, ConfirmDialog } from 'reusable';

const Calendar = lazy(() => import('modules/calendar/Calendar'));
const LeaveRequest = ({ match }) => {
  const dispatch = useDispatch();
  const _request = useSelector(state => {
    return state.appState.leave.leave_requests.filter(el => {
      return el.id.toString() === match.params.id.toString()
    })[0]
  })
  const user = useSelector(state => state.appState.auth.user)
  const [response, setResponse] = useState();
  const [isCancel, setIsCancel] = useState(false);
  const dialog = useRef()

  if (!Object.keys(_request).length) {
    return <NoData />
  }
  let request = shallowCopy(_request);
  request = insertProperty(request, 'no_of_days', getDuration(request['date from'], request['date to']), 4);
  let event = {
    start: new Date(request['date from']),
    end: new Date(request['date to']),
    title: request.category
  }

  const leaveDetails = request ? Object.entries(request) : []

  const handleClick = (code) => {
    setIsCancel(false);
    let payload = {
      id: request.id,
      approver: user.employeeId,
      status: getAdminResponse(code),
      statusCode: code,
      employeeId: request['employee id']
    }
    setResponse(payload);
    dialog.current.toggle();
  }

  const renderCalendar = () => {
    return <Calendar  {...{
      header: {
        right: false,
        left: false
      },
      style: { height: 450 },
      events: [event],
      clickable: false
    }} />
  }
  const onConfirm = () => {
    if (!isCancel) {
      return respondToRequest(dispatch, response)
    };
    return cancelRequest(dispatch, request.id);
  }

  return (
    <CRow>
      <ConfirmDialog
        ref={dialog}
        {...{
          show: dialog,
          onConfirm,
          title: !isCancel ? `${response && response.status}` : 'Cancel Request?',
        }}
      ></ConfirmDialog>
      <CCol lg={6} >
        <CCard style={{ maxHeight: 500 }} >
          <CCardHeader>
            Leave Request ID : {match.params.id}
            {(request.status === 'pending' && user.roleId !== 3) &&
              <CButtonGroup style={{ float: "right" }}>
                <CButton color="primary" onClick={() => {
                  handleClick(1)
                }} className="mr-2">Accept</CButton>
                <CButton onClick={() => {
                  handleClick(0)
                }} color="danger" className="mr-2">Reject</CButton>
                {
                  user.employeeId === request['employee id'] && <CButton onClick={() => {
                    setIsCancel(true);
                    dialog.current.toggle();
                  }} color="warning"> Cancel</CButton>
                }

              </CButtonGroup>
            }
          </CCardHeader>
          <CCardBody style={{ overflowY: 'auto', }}>
            <table className="table table-hover " style={{ borderBottom: "1px solid grey" }}>
              <tbody>
                {
                  leaveDetails.map(([key, value], index) => {
                    return ((key !== "id" && key.toLowerCase() !== 'employee id') &&
                      <tr key={index.toString()}>
                        <td className="text-capitalize">  {`${splitSnakeCase(splitCamelCase(key))}:`}</td>
                        <td>{
                          <p className="wrap-content-text" style={{
                            minWidth: "100%"
                          }}> {value ? <strong>{value}</strong> : <em>NULL</em>} </p>
                        }
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </CCardBody>

        </CCard>
      </CCol>
      <CCol lg={6} style={{ minHeight: '500px' }} className="d-md-down-none">
        {renderCalendar()}
      </CCol>
    </CRow>
  )
}

export default LeaveRequest
