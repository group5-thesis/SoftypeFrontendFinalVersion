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

const AddDepartmentEmployee = ({ _departmentManager, onChange, data, renderFeedback, errors }) => {

  const [dept, setDept] = useState(_departmentManager[0])

  const stateEmployees = useSelector((state) => {
    return state.appState.employee.employees
  });

  const checkIfAdded = (employee) => {
    if (employee.accountType !== 3 || employee.department_managerId === dept.managerId || employee.department_managerId) {
      return true
    }
    return false;
  }

  const _employee = stateEmployees.filter(e => {
    return !checkIfAdded(e)
  })

  useEffect(() => {
    return
  }, [stateEmployees])
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
                  <option key={"emp" + index} value={e.employeeId}>
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

export default AddDepartmentEmployee
