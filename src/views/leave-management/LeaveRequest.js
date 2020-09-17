import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButtonGroup, CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { splitCamelCase, splitSnakeCase, checkDateRange, insertProperty, shallowCopy, getAdminResponse } from 'utils/helpers'
import Calendar from './Calendar';
import NoData from 'reusable/NoData';
import { ActionTypes, actionCreator } from 'utils/actions';

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
  request = insertProperty(request, 'no_of_days', checkDateRange(request['date from'], request['date to']), 4);
  let event = {
    start: request['date from'],
    end: request['date to'],
    title: request.category
  }

  const leaveDetails = request ? Object.entries(request) : []

  const handleClick = (code) => {
    let response = getAdminResponse(code)
    dispatch(actionCreator(ActionTypes.RESPOND_TO_LEAVE_REQUEST, { id: request.id, status: response }));
  }

  return (
    <CRow>
      <CCol lg={6}>
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
      <CCol lg={6} className="d-md-down-none">
        <Calendar {...{ _events: [event] }} />
      </CCol>
    </CRow>
  )
}

export default LeaveRequest
