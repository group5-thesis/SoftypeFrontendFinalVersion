import React, { useState, useEffect } from 'react';
import {
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CSelect
} from "@coreui/react";

const AddDepartment = ({ employees , onChange, data}) => {

  const [emps, setEmps] = useState(employees)

  useEffect(() => {
    console.log(emps, "emps")
  }, [])

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
          />
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Head : </CLabel>
          <CSelect
            name="department_head"
            id="department_head"
            onChange={onChange}
            value={Number(data.department_head)}
          >
            <option value="" hidden>
              Select Employee
            </option>
            <option value=""></option>
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
        </CFormGroup>
      </CCol>
    </CRow >
  )
}

export default AddDepartment
