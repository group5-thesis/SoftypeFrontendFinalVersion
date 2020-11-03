import React, { useState, useEffect } from 'react';
import {
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CListGroup,
  CListGroupItem,
  CInputCheckbox
} from "@coreui/react";

const AddDepartmentManager = ({ employees, validate }) => {

  // const [emps, setEmps] = useState(employees)

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Department Manager: </CLabel>
          <CSelect
            name="department_head"
            id="department_head"
          // onChange={onChange}
          // value={Number(data.department_head)}
          // invalid={errors.department_head !== false}
          >
            <option key={"default"} value="" hidden>
              Select Employee
            </option>
            {
              employees.map(e => {
                return (
                  <option key={e.employeeId} value={e.employeeId}>
                    {e.firstname} {e.lastname}
                  </option>
                )
              })
            }
          </CSelect>
          {/* {renderFeedback(errors.department_head)} */}
        </CFormGroup>
      </CCol>
    </CRow >
  )
}

export default AddDepartmentManager
