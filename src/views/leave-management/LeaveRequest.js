import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButtonGroup, CButton } from '@coreui/react'
import requestsData from './LeaveRequestData'
import { splitCamelCase, splitSnakeCase, checkDateRange, insertProperty } from 'utils/helpers'
import Calendar from './Calendar';
import NoData from 'reusable/NoData';
const LeaveRequest = ({ match }) => {
  let request = requestsData.find(data => data.id.toString() === match.params.id)
  let event = {};
  if (!request) {
    return <NoData />
  }
  request = insertProperty(request, 'no_of_days', checkDateRange(request['date from'], request['date to']), 4);
  event = {
    start: request['date from'],
    end: request['date to'],
    title: request.category
  }
  const leaveDetails = request ? Object.entries(request) : []
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Leave Request ID : {match.params.id}
          </CCardHeader>
          <CCardBody>
            <table className="table table-hover table-responsive" style={{ borderBottom: "1px solid grey" }}>
              <tbody>
                {
                  leaveDetails.map(([key, value], index) => {
                    return ((key !== "id" || key.toLowerCase() !== 'employee id') ?
                      <tr key={index.toString()}>
                        <td className="text-capitalize">  {`${splitSnakeCase(splitCamelCase(key))}:`}</td>
                        <td>{
                          <p className="wrap-content-text"> {value ? <strong>{value}</strong> : <em>NULL</em>} </p>
                        }
                        </td>
                      </tr> : null
                    )
                  })

                }
              </tbody>
            </table>
            {request.status == 'pending' ?
              <CButtonGroup style={{ float: "right" }}>
                <CButton color="info" className="mr-2">Accept</CButton>
                <CButton color="danger">Reject</CButton>
              </CButtonGroup>
              : null}
          </CCardBody>

        </CCard>
      </CCol>
      <CCol lg={6}>
        <Calendar {...{ _events: [event] }} />
      </CCol>
    </CRow>
  )
}

export default LeaveRequest
