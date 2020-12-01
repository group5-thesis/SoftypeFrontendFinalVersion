import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CInput
} from "@coreui/react";

const AddDepartmentManager = ({ employees, onChange, data, renderFeedback, errors, departmentDetails }) => {

  const [emps, setEmps] = useState(employees)

  const stateDepartmentManagers = useSelector((state) => {
    return state.appState.department_manager.department_managers
  });

  const stateDepartments = useSelector((state) => {
    return state.appState.department.departments
  });

  const checkIfAdded = (employee) => {
    if (stateDepartmentManagers.length < 1) {
      for (let i = 0; i < stateDepartments.length; i++) {
        const _emp_h = stateDepartments[i];
        if (employee.accountType !== 2 || _emp_h.department_head_employeeId === employee.employeeId) {
          return true
        }
      }
    }
    for (let idx = 0; idx < stateDepartmentManagers.length; idx++) {
      const _emp_m = stateDepartmentManagers[idx];
      for (let i = 0; i < stateDepartments.length; i++) {
        const _emp_h = stateDepartments[i];
        if (_emp_m.department_head === employee.name || employee.employeeId == _emp_m.employeeId || employee.accountType !== 2 || _emp_h.department_head_employeeId === employee.employeeId) {
          return true
        }
      }
    }
    return false;
  }

  const _employee = emps.filter(e => {
    return !checkIfAdded(e)
  })

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
            disabled={_employee.length === 0}
          >
            <option key={"default"} value="" hidden>
              {
                _employee.length === 0 ? `No Employee can be added` :
                  `Select Employee`
              }
            </option>
            {
              _employee.map((e, index) => {
                return (
                  <option key={"_emps" + index} value={e.employeeId}>
                    {e.firstname} {e.lastname} : {e.role}
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
