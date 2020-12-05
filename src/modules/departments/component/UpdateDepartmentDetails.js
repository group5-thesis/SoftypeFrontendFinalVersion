import React from 'react';
import { useSelector } from 'react-redux'
import {
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CInput
} from "@coreui/react";

const UpdateDepartmentDetails = ({ dataToEdit, handleChange, renderFeedback, errors, departmentDetails }) => {

  const employees = useSelector((state) => {
    return state.appState.employee.employees.filter(emp => {
      return emp.department_id === departmentDetails.department_id || emp.deparment_IdM === departmentDetails.department_id || emp.deparment_IdH === departmentDetails.department_id;
    })
  });

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Department Name: </CLabel>
          <CInput
            id="department_name"
            name="department_name"
            onChange={handleChange}
            value={dataToEdit.department_name}
            placeholder={departmentDetails.department_name}
          />
          {/* {renderFeedback(errors.department_name)} */}
        </CFormGroup>
        <CFormGroup >
          <CLabel>Department Head: </CLabel>
          <CSelect
            name="department_head"
            id="department_head"
            onChange={handleChange}
            value={Number(dataToEdit.department_head) || ''}
            disabled={employees.length === 0}
          >
            <option key={"default_v"} value={departmentDetails.department_head_employeeId} hidden>
              {departmentDetails.department_head}
            </option>
            {
              employees.map((emp, index) => {
                return (
                  <option key={"_emps" + index} value={emp.employeeId}>
                    {emp.firstname} {emp.lastname}
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

export default UpdateDepartmentDetails
