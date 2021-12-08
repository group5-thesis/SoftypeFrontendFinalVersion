import React, { useState, useRef } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CButton
} from "@coreui/react";
import { useDispatch } from 'react-redux'
import { MONTHS, YEARS, TICKET_STATUS, OFFICE_REQUEST_FILTER } from "utils/constants/constant";
import { setWidth, plotArray, dispatchNotification } from "utils/helpers";
import { filterTickets, fetchTickets } from "utils/helpers/fetch";
import { actionCreator, ActionTypes } from "utils/actions";


const TicketFilter = ({ show, onClearFilter }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [state, setstate] = useState(OFFICE_REQUEST_FILTER)
  const [prevFilter, setPrevFilter] = useState({})

  const handleChange = (e) => {
    let { name, value } = e.target
    let newState = { ...state }
    newState[name] = value;
    setstate(newState)

  }

  const clearFilter = () => {
    setstate(OFFICE_REQUEST_FILTER)
    onFilterRequests(true)
  }

  const sendNotification = (type, message) => {
    dispatchNotification(dispatch, { type: type, message: message })
  }

  const onFilterRequests = async (reset = false) => {
    // if (JSON.stringify(state) === JSON.stringify(prevFilter)) return;
    let filter = state;
    if (reset === true) {
      filter = OFFICE_REQUEST_FILTER;
    }
    setLoading(true)
    sendNotification('info', 'Please wait')
    setPrevFilter(state)
    let res = await fetchTickets(dispatch)
    setLoading(false)
    if (!res.error) {
      let payload = res.data.officeRequest_information;
      payload = plotArray(payload)
      dispatch(actionCreator(ActionTypes.FETCH_TICKETS, payload.filter(tkt => {
        let date_requested = tkt['date requested'];
        let date = new Date(date_requested);
        const year = date.getFullYear();
        const month = MONTHS[date.getMonth() + 1]
        return year == filter.year && month == filter.month && (+tkt.status === +filter.status || filter.status === 'All')
      })))
      // debugger
      sendNotification('success', 'Success');
    } else {
      sendNotification('error', res.message)
    }
  }

  return (<>
    <CCollapse show={show}>
      <CRow className="pt-4">
        <CCol>
          <CCard>
            <CCardBody>
              <CRow >
                <CCol {...setWidth("3")} className="float-right">
                  <CFormGroup>
                    <CLabel htmlFor="date-input" className="font-weight-bold">
                      <span>Year</span>
                    </CLabel>
                    <CSelect
                      className="input-sm"
                      size="sm"
                      name="year"
                      value={state.year}
                      id="year"
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        Select
                      </option>
                      <option value="All">All</option>
                      <option value={state.year} hidden>{state.year}</option>
                      {YEARS.map(key => {
                        return (
                          <option key={key} value={+key}>
                            {key}
                          </option>
                        );
                      })}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol {...setWidth("3")} className="float-right">
                  <CFormGroup>
                    <CLabel className="font-weight-bold">
                      <span>Month</span>
                    </CLabel>
                    <CSelect
                      className="input-sm"
                      size="sm"
                      name="month"
                      value={state.month}
                      id="month"
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        Select
                      </option>
                      <option value={state.month} hidden>{state.month}</option>
                      <option value="All">All</option>
                      {MONTHS.map(key => {
                        return (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        );
                      })}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol {...setWidth("3")} className="float-right">
                  <CFormGroup>
                    <CLabel htmlFor="status" className="font-weight-bold">
                      <span>Status:</span>
                    </CLabel>
                    <CSelect
                      custom
                      className="input-sm"
                      size="sm"
                      name="status"
                      value={state.status}
                      id="status"
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        {state.status}
                      </option>
                      <option value="All">All</option>
                      {Object.keys(TICKET_STATUS).map((key) => {
                        return (
                          <option key={key} value={+key}>
                            {Number(key) === 0 ? 'Closed' : 'Open'}
                          </option>
                        );
                      })}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol {...setWidth("3")}>
                  <CRow gutters={false}>
                    <CCol>
                      <CFormGroup className="my-0">
                        <CLabel htmlFor="date-input" className="font-weight-bold mb-1"></CLabel>
                        <CButton disabled={loading} block size="sm" color="info" className="mt-2"
                          onClick={onFilterRequests}
                        >Apply</CButton>
                      </CFormGroup>
                    </CCol>
                    <CCol className="ml-1" >
                      <CFormGroup className="my-0">
                        <CLabel htmlFor="date-input" className="font-weight-bold mb-1"></CLabel>
                        <CButton disabled={loading} block size="sm" color="danger" className="mt-2"
                          onClick={() => {
                            clearFilter()
                          }}
                        >Clear</CButton>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCollapse>
  </>
  )
};

export default TicketFilter;
