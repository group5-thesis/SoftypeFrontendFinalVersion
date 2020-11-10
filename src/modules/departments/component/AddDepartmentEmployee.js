import React, { useState } from 'react';
import {
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CInput
} from "@coreui/react";

const AddDepartmentEmployee = ({ _departmentManager, employees, onChange, data, renderFeedback, errors }) => {

  const [dept, setDept] = useState(_departmentManager[0])

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Department Head: </CLabel>
          <CInput id="head" value={dept.department_head} placeholder={"TEST holder"} disabled />
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Manager: </CLabel>
          <CInput id="manager" value={`${dept.manager_firstname} ${dept.manager_lastname}`} disabled />
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Employee: </CLabel>
          <CSelect
            name="employeeId"
            id="employeeId"
            onChange={onChange}
            value={Number(data.employeeId)}
            invalid={errors.employeeId !== false}
          >
            <option key={"default"} value="" hidden>
              Select Employee
            </option>
            {
              employees.map(e => {
                if (!e.department_managerId) {
                  if (e.department_managerId !== dept.managerId) {
                    if (e.accountType === 3) {
                      return (
                        <option key={e.employeeId} value={e.employeeId}>
                          {e.firstname} {e.lastname}
                        </option>
                      )
                    }
                  }
                }
              })
            }
          </CSelect>
          {renderFeedback(errors.department_head)}
        </CFormGroup>
      </CCol>
    </CRow >
  )
}

export default AddDepartmentEmployee
