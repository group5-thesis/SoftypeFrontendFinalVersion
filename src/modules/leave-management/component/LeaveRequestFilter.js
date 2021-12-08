import React, { useState, useRef, useEffect } from "react";
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
  CButton,
  CContainer,
} from "@coreui/react";
import { ConfirmDialog, LoadingButton } from "reusable";
import { setWidth } from "utils/helpers";
import { LEAVE_TYPES, STATUS, MONTHS, YEARS } from "utils/constants/constant";

const LeaveFilterRequest = ({ show, onFilterRequests, filter, onClearFilter, isLoading }) => {
  const dialog = useRef();
  const [filteredValues, setFilteredValues] = useState({ ...filter })
  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const obj = { ...filteredValues };
    obj[name] = value;
    setFilteredValues(obj)
  }

  const clearFilter = () => {
    setFilteredValues({ ...filter })
    onClearFilter()
  }

  return (
    <>
      <ConfirmDialog
        ref={dialog}
        id="cutom_dialog"
        {...{
          centered: false,
          title: "Invalid date range",
          cancelButtonText: "Ok",
          confirmButton: false,
        }}
      />
      <CCollapse show={show}>
        <CContainer fluid>
          <CRow className="pt-4">
            <CCol>
              <CCard>
                <CCardBody>
                  <CRow >
                    <CCol  {...setWidth("4")}>
                      <CRow gutters={false} >
                        <CCol className="mr-1" {...setWidth("5")}>
                          <CFormGroup>
                            <CLabel htmlFor="date-input" className="font-weight-bold">
                              <span>Month</span>
                            </CLabel>
                            <CSelect
                              custom
                              className="input-sm"
                              size="sm"
                              disabled={isLoading}
                              name="month"
                              value={filteredValues.month || ""}
                              onChange={handleOnChange}
                            >
                              <option value="" hidden>
                                {filteredValues.month}
                              </option>
                              <option value="All">All</option>
                              {MONTHS.map((month, idx) =>
                                <option key={idx} value={month}>
                                  {month}
                                </option>
                              )}
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                        <CCol className="ml-1" >
                          <CFormGroup>
                            <CLabel htmlFor="date-input" className="font-weight-bold">
                              <span>Year</span>
                            </CLabel>
                            <CSelect
                              custom
                              disabled={isLoading}
                              className="input-sm"
                              size="sm"
                              name="year"
                              value={filteredValues.year || ""}
                              onChange={handleOnChange}
                            >
                              <option value="" hidden>
                                {filteredValues.year}
                              </option>
                              <option value="All">All</option>
                              {YEARS.map((year) => {
                                return (<option key={year} value={Number(year)}>
                                  {year}
                                </option>)
                              }
                              )}
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol  {...setWidth("3")}>
                      <CFormGroup>
                        <CLabel htmlFor="status" className="font-weight-bold">
                          <span>Status:</span>
                        </CLabel>
                        <CSelect
                          custom
                          disabled={isLoading}
                          className="input-sm"
                          size="sm"
                          name="status"
                          id="status"
                          value={filteredValues.status || "all"}
                          onChange={handleOnChange}
                        >
                          <option value="" hidden>
                            Select
                          </option>
                          <option value="All">All</option>
                          {Object.keys(STATUS).map((key) => {
                            return (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                    <CCol  {...setWidth("3")}>
                      <CFormGroup>
                        <CLabel htmlFor="status" className="font-weight-bold">
                          <span>Category:</span>
                        </CLabel>
                        <CSelect
                          custom
                          disabled={isLoading}
                          name="category"
                          size="sm"
                          value={filteredValues.category || ""}
                          onChange={handleOnChange}
                          id="category"
                        >
                          <option value="" hidden>
                            Please select
                          </option>
                          <option value="All">All</option>
                          {LEAVE_TYPES.map((_category, idx) => {
                            return (
                              <option key={idx} value={_category}>
                                {_category}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                    {/* <CCol  {...setWidth("2")}>
                      <CFormGroup>
                        <CLabel htmlFor="employee" className="font-weight-bold">
                          <span>Employee:</span>
                        </CLabel>
                        <CInput
                          className="input-sm"
                          size="sm"
                          placeholder="Employee name"
                          name="employee"
                          value={filteredValues.employee.toLowerCase() === "all" ? "" : filteredValues.employee}
                          onChange={handleOnChange}
                        />
                      </CFormGroup>
                    </CCol> */}
                    <CCol {...setWidth("2")}>
                      <CRow gutters={false}>
                        <CCol>
                          <CFormGroup className="my-0">
                            <CLabel htmlFor="date-input" className="font-weight-bold mb-1"></CLabel>
                            <LoadingButton  {...{
                              color: 'info',
                              className: "mt-2",
                              sm: true,
                              block: true,
                              isLoading, submit: () => {
                                onFilterRequests(filteredValues)
                              }, btnText: 'apply'
                            }} />

                            {/* <CButton block size="sm" color="info" onClick={}>apply</CButton> */}
                          </CFormGroup>
                        </CCol>
                        <CCol className="ml-1" >
                          <CFormGroup className="my-0">
                            <CLabel htmlFor="date-input" className="font-weight-bold mb-1"></CLabel>
                            <CButton block size="sm" color="danger" disabled={isLoading} className="mt-2" onClick={() => {
                              clearFilter()
                            }}>clear</CButton>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </CCollapse>
    </>
  );
};

export default LeaveFilterRequest;
