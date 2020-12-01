import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCardBody, CCol, CCardHeader, CRow, CButton, CCard, CSpinner } from "@coreui/react";
import _ from 'lodash';
import { Modal, ConfirmDialog } from 'reusable';
import DepartmentDetailsModal from 'modules/departments/component/DepartmentDetailsModal'

const DepartmentDetails = ({ location }) => {

  const modal = useRef();

  const user = useSelector(state => {
    let authed = state.appState.auth.user;
    return {
      firstname: authed.firstname,
      lastname: authed.lastname,
      employeeId: authed.employeeId,
      userId: authed.userId,
      accountType: authed.accountType
    }
  })

  const query = new URLSearchParams(location.search);

  const [id, setId] = useState(query.get('aqs'))

  const stateEmployeeDepartment = useSelector((state) => { // not yet
    return state.appState.department_employee.department_employees.filter(emp => {
      return emp.department_id.toString() === id.toString()
    })
  });

  const stateEmployeeManagers = useSelector(state => {
    return state.appState.department_manager.department_managers.filter(mang => {
      return mang.department_id.toString() === id.toString()
    })
  })

  const [deptEmp, setDeptEmp] = useState(stateEmployeeDepartment)
  const [deptEmpMang, setDeptEmpMang] = useState(stateEmployeeManagers)
  const [firstElementDept, setFirstElementDept] = useState(_.first(stateEmployeeDepartment))
  const [isLoading, setIsLoading] = useState(false)

  // console.log(deptEmp, "dept emp")
  // console.log(deptEmpMang, "dept mang")

  const toggleModal = () => {
    // setData(DepartmentManager)
    // setError(defaultErrors)
    modal.current.toggle();
  };

  return (
    <>
      <CRow>
        <Modal
          ref={modal}
          centered
          title="Update Department Details"
          hidden
          modalOnClose={toggleModal}
          closeButton
          footer={
            <>
              <CButton color="primary" disabled={isLoading}>
                {
                  isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
                }
              </CButton>
              <CButton color="danger" onClick={toggleModal}>Cancel</CButton>
            </>
          }
          hideCancelButton
        >
          <DepartmentDetailsModal {...{ deptEmp, firstElementDept }} />
        </Modal>

        <CCol sm="2" lg="3" >

        </CCol>
        <CCol>
          <CCard style={{ minHeight: "200px" }}>
            <CCardHeader>
              <CRow>
                <CCol sm="8">
                  <div>
                    <h4>
                      {`Department Name: ${firstElementDept.department_name}`}
                    </h4>
                  </div>
                </CCol>
                {
                  user.accountType === 1 ?
                    <CCol sm="4" className="d-none d-md-block">
                      <div className="float-right">
                        <CButton color="primary" onClick={() => {
                          toggleModal()
                          console.log("Test update")
                        }}>
                          {"Update Department"}
                        </CButton>
                      </div>
                    </CCol> : ""
                }
              </CRow>
            </CCardHeader>
            <CCardBody>
              <div className="px-1 py-1 text-justify">
                <h5>
                  {`Department Head: ${firstElementDept.department_head}`}
                </h5>
                <div key={"dept_" + firstElementDept.department_id}>
                  {
                    deptEmpMang.map((el, idx) => {
                      return (
                        deptEmp.map((emp, idxEmp) => {
                          return (
                            < ul >
                              {
                                emp.department_managerId === el.managerId ?
                                  <li key={"mang_" + idx}>
                                    <h6 >
                                      {`Department Manager/Lead: ${el.manager_firstname} ${el.manager_lastname}`}
                                    </h6>
                                    <div key={"emp_" + idxEmp}>
                                      <ul>
                                        <li>
                                          {`${emp.firstname} ${emp.lastname}`}
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                  : ""
                              }
                            </ul>
                          )
                        })
                      )
                    })
                  }
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="2" lg="3" >
        </CCol>
      </CRow>
    </>
  )

}

export default DepartmentDetails
