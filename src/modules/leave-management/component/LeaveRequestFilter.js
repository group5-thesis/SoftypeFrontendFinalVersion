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
} from "@coreui/react";
import { ConfirmDialog } from "reusable";
import { checkDateRange, shallowCopy, formatDate } from "utils/helpers";
import { LEAVE_TYPES, STATUS } from "utils/constants/constant";

const LeaveFilterRequest = ({ show, onStatusChange }) => {
  const [dates, setDates] = useState({
    from: formatDate(Date.now()),
    to: "",
  });
  const [category, setCategory] = useState("");
  const dialog = useRef();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const prevState = shallowCopy(dates);
    prevState[name] = value;
    let range = checkDateRange(prevState.from, prevState.to, true);
    if (range < 0) {
      dialog.current.toggle();
      return;
    }
    prevState[name] = value;
    setDates(prevState);
  };

  const categoryOnChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };
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
        <CRow className="pt-4">
          <CCol>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CFormGroup className="my-0">
                      <CLabel htmlFor="date-input" className="font-weight-bold">
                        <span>Leave Period:</span>
                      </CLabel>
                      <CRow gutters={false}>
                        <CCol className="mr-2">
                          <CFormGroup>
                            <CInput
                              type="date"
                              id="date-from"
                              className="input-sm"
                              size="sm"
                              name="from"
                              value={dates.from}
                              onChange={handleOnChange}
                              placeholder="Date From"
                            />
                          </CFormGroup>
                        </CCol>
                        <b>to</b>
                        <CCol className="ml-2">
                          <CFormGroup>
                            <CInput
                              type="date"
                              id="date-to"
                              className="input-sm"
                              size="sm"
                              onChange={handleOnChange}
                              name="to"
                              value={dates.to}
                              placeholder="Date To"
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="2">
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
                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="status" className="font-weight-bold">
                        <span>Category:</span>
                      </CLabel>
                      <CSelect
                        custom
                        name="category"
                        size="sm"
                        value={category || ""}
                        onChange={categoryOnChange}
                        id="category"
                      >
                        <option value="" hidden>
                          Please select
                        </option>
                        {LEAVE_TYPES.map((_category, idx) => {
                          return (
                            <option key={idx} value={Number(idx + 1)}>
                              {_category}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="employee" className="font-weight-bold">
                        <span>Employee:</span>
                      </CLabel>
                      <CSelect
                        custom
                        className="input-sm"
                        size="sm"
                        name="employee"
                        id="status"
                        onChange={onStatusChange}
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
                </CRow>
                <CRow> </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
};

export default LeaveFilterRequest;
