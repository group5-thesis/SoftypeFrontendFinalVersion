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
import { TICKET_TYPES, TICKET_STATUS } from "utils/constants/constant";
import { checkDateRange, shallowCopy, formatDate } from "utils/helpers";

const TicketFilter = ({ show, onStatusChange }) => {

  const [type, setType] = useState("");

  const [dates, setDates] = useState({
    from: formatDate(Date.now()),
    to: "",
  });

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

  const typeOnChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  return (
    <>
      <CCollapse show={show}>
        <CRow className="pt-4">
          <CCol>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CFormGroup className="my-0">
                      <CLabel htmlFor="date-input" className="font-weight-bold">
                        <span>Date</span>
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

export default TicketFilter;
