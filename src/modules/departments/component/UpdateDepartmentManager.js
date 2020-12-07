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

const UpdateDepartmentManager = ({ handleChange, managerToEdit, _departmentManager }) => {

  const _departmentEmployees = useSelector(state => {
    return state.appState.department_employee.department_employees.filter(emp => {
      return emp.department_id = _departmentManager[0].department_id
    })
  })

  const employees = useSelector((state) => {
    return state.appState.employee.employees.filter(emp => {
      return emp.department_id === _departmentManager[0].department_id && emp.deparment_IdM === null && emp.accountType === 3;
    })
  });

  return (
    <CRow>
      <CCol xl={12}>
        <CFormGroup >
          <CLabel>Project Manager: </CLabel>
          <CSelect
            name="department_manager"
            id="department_manager"
            onChange={handleChange}
            value={Number(managerToEdit.department_manager) || ''}
            disabled={employees.length === 0}
          >
            <option key={"default"} value={_departmentManager[0].department_head_employeeId} hidden>
              {`${_departmentManager[0].manager_firstname} ${_departmentManager[0].manager_lastname}`}
            </option>
            {
              employees.map((e, index) => {
                return (
                  <option key={"_emps" + index} value={e.employeeId}>
                    {e.firstname} {e.lastname}
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

export default UpdateDepartmentManager
