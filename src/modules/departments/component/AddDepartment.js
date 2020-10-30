import React, { useState, useEffect } from 'react';
import {
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CSelect
} from "@coreui/react";

const AddDepartment = ({ employees, onChange, data, renderFeedback, errors }) => {

  const [emps, setEmps] = useState(employees)

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Department Name : </CLabel>
          <CInput
            id="department_name"
            name="department_name"
            placeholder="e.g Technical"
            onChange={onChange}
            value={data.department_name}
            invalid={errors.department_name !== false}
          />
          {renderFeedback(errors.department_name)}
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Head : </CLabel>
          <CSelect
            name="department_head"
            id="department_head"
            onChange={onChange}
            value={Number(data.department_head)}
            invalid={errors.department_head !== false}
          >
            <option key={"default"} value="" hidden>
              Select Employee
            </option>
            {/* <option value=""></option> */}
            {
              emps.map(e => {
                return (
                  <option key={e.employeeId} value={e.employeeId}>
                    {e.name}
                  </option>
                )
              })
            }
          </CSelect>
          {renderFeedback(errors.department_head)}
        </CFormGroup>
      </CCol>
    </CRow >
  )
}

export default AddDepartment
