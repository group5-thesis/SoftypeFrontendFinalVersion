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
import { MONTHS, YEARS, TICKET_STATUS } from "utils/constants/constant";
import { setWidth } from "utils/helpers";

const TicketFilter = ({ show, onStatusChange, filter, onClearFilter }) => {

  const [now, setNow] = useState(new Date)
  const [month, setMonth] = useState(MONTHS[filter.month])
  const [year, setYear] = useState(filter.year)
  const [status, setStatus] = useState(filter.status)

  const yearOnChange = (e) => {
    setYear(e.target.value)
  }

  const monthOnChange = (e) => {
    setMonth(e.target.value)
  }

  const clearFilter = () => {
    setMonth(MONTHS[filter.month])
    setYear(filter.year)
    setStatus(filter.status)
    onClearFilter();
  }

  return (
    <>
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
                        value={year}
                        id="year"
                        onChange={yearOnChange}
                      >
                        <option value="" hidden>
                          Select
                        </option>
                        <option value={year} hidden>{year}</option>
                        {YEARS.map(key => {
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
                      <CLabel className="font-weight-bold">
                        <span>Month</span>
                      </CLabel>
                      <CSelect
                        className="input-sm"
                        size="sm"
                        name="month"
                        value={month}
                        id="month"
                        onChange={monthOnChange}
                      >
                        <option value="" hidden>
                          Select
                        </option>
                        <option value={month} hidden>{month}</option>
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
                        id="status"
                        onChange={onStatusChange}
                      >
                        <option value="" hidden>
                          Select
                        </option>
                        <option value="All">All</option>
                        {Object.keys(TICKET_STATUS).map((key) => {
                          return (
                            <option key={key} value={key}>
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
                          <CButton block size="sm" color="info" className="mt-2"
                          // onClick={() => {
                          // onFilterRequests({
                          //   status: status,
                          //   employee: employee,
                          //   date_from: dates.from,
                          //   date_to: dates.to,
                          //   category: category
                          // })
                          // }}
                          >Apply</CButton>
                        </CFormGroup>
                      </CCol>
                      <CCol className="ml-1" >
                        <CFormGroup className="my-0">
                          <CLabel htmlFor="date-input" className="font-weight-bold mb-1"></CLabel>
                          <CButton block size="sm" color="danger" className="mt-2"
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
  );
};

export default TicketFilter;
