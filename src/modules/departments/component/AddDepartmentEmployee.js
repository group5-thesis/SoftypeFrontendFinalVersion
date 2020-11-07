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

const AddDepartmentEmployee = (managers) => {

  // console.log(managers)
  // console.log(managers[0])

  // const [departmentHead, setDepartmentHead] = useState()

  // console.log(managers[0].department_head)

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Department Head: </CLabel>
          <CInput id="head" value={'Lorly Sugal'} disabled />
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Manager: </CLabel>
          <CInput id="manager" value={`Rangie Laurente`} disabled />
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Employee: </CLabel>
          <CSelect
            name="employeeId"
            id="employeeId"
          // onChange={onChange}
          // value={Number(data.department_head)}
          // invalid={errors.department_head !== false}
          >
            <option key={"default"} value="" hidden>
              Select Employee
            </option>
            {/* {
              employees.map(e => {
                return (
                  <option key={e.employeeId} value={e.employeeId}>
                    {e.firstname} {e.lastname}
                  </option>
                )
              })
            } */}
          </CSelect>
          {/* {renderFeedback(errors.department_head)} */}
        </CFormGroup>
      </CCol>
    </CRow >
  )
}

export default AddDepartmentEmployee
