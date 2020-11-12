import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
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

  const stateDepartmentManagers = useSelector((state) => {
    return state.appState.department_manager.department_managers
  });

  const stateDepartments = useSelector((state) => {
    return state.appState.department.departments
  });

  const checkIfDeptHead = emp => {
    if (stateDepartments.length < 1) {
      if (emp.accountType !== 2) {
        return true
      }
    }
    if (stateDepartmentManagers < 1) {
      for (let i = 0; i < stateDepartments.length; i++) {
        const _emp_h = stateDepartments[i];
        if (emp.accountType !== 2 || _emp_h.department_head_employeeId === emp.employeeId) {
          return true
        }
      }
    }
    for (let idx = 0; idx < stateDepartmentManagers.length; idx++) {
      const _emp_m = stateDepartmentManagers[idx];
      for (let i = 0; i < stateDepartments.length; i++) {
        const _emp_h = stateDepartments[i];
        if (_emp_m.department_head === emp.name || emp.employeeId == _emp_m.employeeId || emp.accountType !== 2 || _emp_h.department_head_employeeId === emp.employeeId) {
          return true
        }
      }
    }
    return false;
  }

  const managers = emps.filter(emp => {
    return !checkIfDeptHead(emp)
  })

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
            {
              managers.map((e, index) => {
                return (
                  <option key={"emp_" + index} value={e.employeeId}>
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
