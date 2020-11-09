import React, { lazy } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButtonGroup, CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { splitCamelCase, splitSnakeCase, insertProperty, shallowCopy, getAdminResponse, getDuration } from 'utils/helpers'
import { NoData } from 'reusable';
import { ActionTypes, actionCreator } from 'utils/actions';
const Calendar = lazy(() => import('modules/calendar/Calendar'));
const LeaveRequest = ({ match }) => {
  const dispatch = useDispatch();
  const _request = useSelector(state => {
    return state.appState.leave.leave_requests.filter(el => {
      return el.id.toString() === match.params.id.toString()
    })[0]
  })

  let request = shallowCopy(_request);
  if (!Object.keys(request).length) {
    return <NoData />
  }
  request = insertProperty(request, 'no_of_days', getDuration(request['date from'], request['date to']), 4);
  let event = {
    start: new Date(request['date from']),
    end: new Date(request['date to']),
    title: request.category
  }

  const leaveDetails = request ? Object.entries(request) : []

  const handleClick = (code) => {
    let response = getAdminResponse(code)
    dispatch(actionCreator(ActionTypes.RESPOND_TO_LEAVE_REQUEST, { id: request.id, status: response }));
  }

  const renderCalendar = () => {
    return <Calendar  {...{
      header: {
        right: false,
        left: false
      },
      style: { height: 450 },
      events: [event]
    }} />
  }

  return (
    <CRow>
      <CCol lg={6} style={{ overflowY: 'auto', height: 450 }}>
        <CCard>
          <CCardHeader>
            Leave Request ID : {match.params.id}
          </CCardHeader>
          <CCardBody>
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
            {request.status === 'pending' &&
              <CButtonGroup style={{ float: "right" }}>
                <CButton color="primary" onClick={() => {
                  handleClick(1)
                }} className="mr-2">Accept</CButton>
                <CButton onClick={() => {
                  handleClick(0)
                }} color="danger">Reject</CButton>
              </CButtonGroup>
            }
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
