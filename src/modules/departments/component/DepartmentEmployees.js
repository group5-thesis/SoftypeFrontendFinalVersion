import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWidth, shallowCopy, RULES, copyArray, } from 'utils/helpers';
import { fetchDepartmentEmployees, retrieveEmployees } from 'utils/helpers/fetch';
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CImg,
  CInvalidFeedback
} from '@coreui/react';
import { NoData, Card, Modal, ConfirmDialog } from 'reusable';
import colors from "assets/theme/colors"
import AddDepartmentEmployee from './AddDepartmentEmployee'
import DepartmentEmployee from "models/DepartmentEmployeeModel"
import {
  mdiPlus,
  mdiTrashCanOutline
} from '@mdi/js';
import Icon from '@mdi/react';
import api from 'utils/api';
import { APP_MESSAGES } from 'utils/constants/constant';
import _ from 'lodash';
import { actionCreator, ActionTypes } from 'utils/actions';

const DepartmentEmployees = ({ match }) => {

  const defaultErrors = {
    employeeId: false
  }

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setError] = useState(defaultErrors)
  const [data, setData] = useState(DepartmentEmployee)
  const [managerId, setManagerId] = useState(match.params.id)
  const [removeEmployee, setRemoveEmployee] = useState(false)
  const modal = useRef();
  const dispatch = useDispatch();
  const dialog = useRef();

  if (!match.params.id) {
    let d = sessionStorage.getItem('managerId');
    setManagerId(d);
  }

  const _departmentEmployees = useSelector(state => {
    return state.appState.department_employee.department_employees.filter(el => {
      return el.department_managerId.toString() === managerId.toString()
    })
  })

  const _departmentManager = useSelector(state => {
    return state.appState.department_manager.department_managers.filter(el => {
      return el.managerId.toString() === managerId.toString()
    })
  })

  let request = copyArray(_departmentEmployees);

  const toggleModal = () => {
    setData(DepartmentEmployee)
    setError(defaultErrors)
    modal.current.toggle();
  };

  const onChange = (e) => { // value is employee ID
    let key = e.target.name
    let value = e.target.value
    let copy = shallowCopy(data)
    copy[key] = value
    setData(copy)
  }

  const renderFeedback = (message) => {
    return message !== false &&
      <CInvalidFeedback className="help-block">
        {message}
      </CInvalidFeedback>
  }

  const validateInfo = (name, value) => {
    const { required } = RULES
    if (name === "employeeId") {
      return required(value)
    }
    return value !== "" || APP_MESSAGES.INPUT_REQUIRED;
  }

  const validate = () => {
    let _errors = shallowCopy(errors)
    Object.entries(data).map(([key, value]) => {
      let valid = validateInfo(key, value);
      _errors[key] = valid === true ? false : valid
    })
    setError(_errors)
    let isValid = true;
    _.values(_errors).map(err => {
      if (err !== false) {
        isValid = false
      }
    })
    if (isValid) {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    data.department_managerId = _departmentManager[0].managerId
    data.department_headId = _departmentManager[0].department_headId
    let res = await api.post("/add_department_employee", {
      employeeId: data.employeeId,
      department_managerId: data.department_managerId,
      department_headId: data.department_headId
    })
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.ADD_DEPARTMENT_EMPLOYEE, res.data.employee_information[0]))
      retrieveEmployees(dispatch)
      toggleModal()
    } else {
      alert("error")
    }
    setIsLoading(false)
  }

  const removeDepartmentEmployee = () => {
    setRemoveEmployee(true)
  }

  const cancelRemoveDepartmentEmployee = () => {
    setRemoveEmployee(false)
  }

  const handleDeleteEmployee = async (dept_employeeId) => {
    let res = await api.post('/delete_department_employee', { id: dept_employeeId })
    if (!res.error) {
      retrieveEmployees(dispatch)
      fetchDepartmentEmployees(dispatch);
    } else {
      alert(res);
    }
    if (_departmentEmployees.length <= 1) {
      setRemoveEmployee(false)
    }
  }

  return (
    <CRow className="justify-content-center">
      <CCol {...setWidth("12")}>
        <ConfirmDialog
          ref={dialog}
          id="custom_dialog"
          {...{
            show: dialog,
            onConfirm: () => {
              handleDeleteEmployee(localStorage.getItem("d_emp_id"))
            },
            title: "Are you sure you want to do this?",
          }}
        >
        </ConfirmDialog>
        <Modal
          ref={modal}
          centered
          title={removeEmployee ? "Are you sure to do this?" : "Add Department Employee"}
          hidden
          modalOnClose={() => {
            modal.current.toggle()
          }}
          closeButton
          footer={
            <>
              <CButton color="primary" disabled={isLoading} onClick={validate}>
                {
                  isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
                }
              </CButton>
              <CButton color="danger" onClick={toggleModal}>Cancel</CButton>
            </>
          }
          hideCancelButton
        >
          {
            removeEmployee ? "Test Delete?" : <AddDepartmentEmployee {...{ _departmentManager, onChange, data, renderFeedback, errors }} />
          }
        </Modal>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="6">
                <h4 className="card-title mb-0">{`Department Manager: ${_departmentManager[0].manager_firstname} ${_departmentManager[0].manager_lastname}`}</h4>
              </CCol>
              <CCol sm="6" className="d-none d-md-block">
                <div className="float-right">
                  <CButton color={removeEmployee ? "danger" : "primary"} onClick={() => {
                    removeEmployee ? cancelRemoveDepartmentEmployee() : removeDepartmentEmployee()
                  }} disabled={_departmentEmployees.length === 0}>
                    {removeEmployee ? "Cancel Delete" : "Delete Department Employees"}
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {
                _departmentEmployees.map((key, index) => {
                  return (
                    <CCol sm="6" lg="3" className="px-1 py-1" key={index}>
                      <Card
                        clickable={removeEmployee}
                        height={200}
                        animation
                        setImg
                        text={
                          `${key.firstname}`
                        }
                        dept_role={key.role}
                        textClass={"font-weight-bold"}
                        textRoleStyle={{ position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
                        imgClass={"img_dept"}
                        textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}
                        onClickMethod={() => {
                          if (removeEmployee) {
                            dialog.current.toggle()
                            localStorage.setItem("d_emp_id", key.department_employeeId)
                          }
                        }}
                        deleteCard={removeEmployee}
                        deleteButton={
                          <Icon path={mdiTrashCanOutline}
                            size={4}
                            horizontal
                            vertical
                            rotate={180}
                            color={colors.$white_bis}
                          />
                        }
                      />
                    </CCol>
                  )
                })
              }
              {
                removeEmployee ? "" :
                  <CCol sm="6" lg="3">
                    <Card
                      animation
                      text={
                        <Icon path={mdiPlus}
                          size={4}
                          horizontal
                          vertical
                          rotate={180}
                          color={colors.$grey}
                        />
                      }
                      isIcon
                      clickable
                      centeredText
                      height={200}
                      onClickMethod={toggleModal}
                    />
                  </CCol>
              }
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default DepartmentEmployees;
