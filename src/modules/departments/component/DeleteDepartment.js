import React from 'react';
import {
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput
} from "@coreui/react";

const DeleteDepartment = ({ departmentDetails, handleChange}) => {

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Enter Department Name: {
            <i><b>{departmentDetails.department_name}</b></i>
          } </CLabel>
          <CInput
            id="department_name_delete"
            name="department_name_delete"
            onChange={handleChange}
            placeholder={departmentDetails.department_name}
          />
        </CFormGroup>
      </CCol>
    </CRow >
  )
}

export default DeleteDepartment
