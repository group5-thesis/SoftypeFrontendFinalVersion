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
  CButton,
  CContainer,
} from "@coreui/react";
import { ConfirmDialog } from "reusable";
import { checkDateRange, setWidth } from "utils/helpers";
import { LEAVE_TYPES, STATUS, MONTHS } from "utils/constants/constant";

const LeaveFilterRequest = ({ show, onFilterRequests, filter, onClearFilter }) => {

  const defaultDates = {
    from: filter.date_from,
    to: filter.date_to || "",
  }
  const dialog = useRef();
  const [dates, setDates] = useState({
    from: filter.date_from,
    to: filter.date_to || "",
  });
  const [category, setCategory] = useState(filter.category || "");
  const [employee, setEmployee] = useState(filter.employee || "");
  const [status, setStatus] = useState(filter.status)

  const handleDateOnChange = (e) => {
    const { name, value } = e.target;
    const prevState = { ...dates };
    prevState[name] = value;
    if (name === "to") {
      let range = checkDateRange(prevState.from, prevState.to, true);
      if (range < 0) {
        dialog.current.toggle();
        return;
      }
    }
    prevState[name] = value;
    setDates(prevState);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  const clearFilter = () => {
    setStatus(filter.status)
    setCategory("")
    setDates(defaultDates)
    setEmployee("")
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
                              name="status"
                              id="status"
                              value={status}
                              onChange={(e) => {
                                setStatus(e.target.value)
                              }}
                            >
                              <option value="" hidden>
                                {MONTHS[Date.getMonth()]}
                              </option>
                              <option value="All">All</option>
                              {MONTHS.map((month, idx) =>
                                <option value={idx}>
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
                            <CInput
                              type="date"
                              id="date-to"
                              className="input-sm"
                              size="sm"
                              onChange={handleDateOnChange}
                              name="to"
                              value={dates.to}
                              placeholder="Date To"
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      {/* <CFormGroup className="my-0">
                        <CLabel htmlFor="date-input" className="font-weight-bold">
                          <span>Leave Period:</span>
                        </CLabel>
                        <CRow gutters={false} >
                          <CCol className="mr-1" {...setWidth("5")}>
                            <CFormGroup>
                              <CInput
                                type="date"
                                id="date-from"
                                className="input-sm"
                                size="sm"
                                name="from"
                                value={dates.from}
                                onChange={handleDateOnChange}
                                placeholder="Date From"
                              />
                            </CFormGroup>
                          </CCol>
                          <strong>
                            {" "}&#8594;{" "}
                          </strong>
                          <CCol className="ml-1" >
                            <CFormGroup>
                              <CInput
                                type="date"
                                id="date-to"
                                className="input-sm"
                                size="sm"
                                onChange={handleDateOnChange}
                                name="to"
                                value={dates.to}
                                placeholder="Date To"
                              />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CFormGroup> */}
                    </CCol>
                    <CCol  {...setWidth("2")}>
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
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value)
                          }}
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
                    <CCol  {...setWidth("2")}>
                      <CFormGroup>
                        <CLabel htmlFor="status" className="font-weight-bold">
                          <span>Category:</span>
                        </CLabel>
                        <CSelect
                          custom
                          name="category"
                          size="sm"
                          value={category || ""}
                          onChange={(e) => {
                            setCategory(e.target.value)
                          }}
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
                    <CCol  {...setWidth("2")}>
                      <CFormGroup>
                        <CLabel htmlFor="employee" className="font-weight-bold">
                          <span>Employee:</span>
                        </CLabel>
                        <CInput
                          className="input-sm"
                          size="sm"
                          placeholder="Employee name"
                          name="employee"
                          value={employee.toLowerCase() === "all" ? "" : employee}
                          onChange={(e) => {
                            setEmployee(e.target.value)
                          }}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol {...setWidth("2")}>
                      <CRow gutters={false}>
                        <CCol>
                          <CFormGroup className="my-0">
                            <CLabel htmlFor="date-input" className="font-weight-bold mb-1"></CLabel>
                            <CButton block size="sm" color="info" className="mt-2" onClick={() => {
                              onFilterRequests({
                                status: status,
                                employee: employee,
                                date_from: dates.from,
                                date_to: dates.to,
                                category: category
                              })
                            }}>apply</CButton>
                          </CFormGroup>
                        </CCol>
                        <CCol className="ml-1" >
                          <CFormGroup className="my-0">
                            <CLabel htmlFor="date-input" className="font-weight-bold mb-1"></CLabel>
                            <CButton block size="sm" color="danger" className="mt-2" onClick={() => {
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
