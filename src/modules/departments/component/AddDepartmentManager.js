import React, { useState, useEffect } from 'react';
import {
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CListGroup,
  CListGroupItem,
  CInputCheckbox,
  CInput
} from "@coreui/react";

const AddDepartmentManager = ({ employees, onChange, data, renderFeedback, errors, departmentDetails }) => {

  const [emps, setEmps] = useState(employees)

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Department Head: </CLabel>
          <CInput id="name" value={departmentDetails.department_head} disabled />
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Manager: </CLabel>
          <CSelect
            name="department_manager"
            id="department_manager"
            onChange={onChange}
            value={Number(data.department_manager)}
            invalid={errors.department_manager !== false}
          >
            <option key={"default"} value="" hidden>
              Select Employee
            </option>
            {
              emps.map(e => {
                return (
                  <option key={e.employeeId} value={e.employeeId}>
                    {e.firstname} {e.lastname}
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

export default AddDepartmentManager
