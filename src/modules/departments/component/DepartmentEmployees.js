import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWidth, shallowCopy, RULES, copyArray } from 'utils/helpers';
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
import { NoData, Card, Modal } from 'reusable';
import colors from "assets/theme/colors"
import AddDepartmentEmployee from './AddDepartmentEmployee'
import DepartmentEmployee from "models/DepartmentEmployeeModel"
import {
  mdiPlus
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
  const modal = useRef();
  const dispatch = useDispatch();

  if (!match.params.id) {
    let d = sessionStorage.getItem('managerId');
    setManagerId(d);
  }

  const employees = useSelector((state) => {
    return state.appState.employee.employees
  });

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
      toggleModal()
    } else {
      alert("error")
    }
    setIsLoading(false)
  }

  return (
    <CRow className="justify-content-center">
      <CCol {...setWidth("12")}>
        <Modal
          ref={modal}
          centered
          title="Add Department Employee"
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
          <AddDepartmentEmployee {...{ _departmentManager, employees, onChange, data, renderFeedback, errors }} />
        </Modal>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="6">
                <h4 className="card-title mb-0">{`Department Manager: ${_departmentManager[0].manager_firstname} ${_departmentManager[0].manager_lastname}`}</h4>
              </CCol>
              <CCol sm="6" className="d-none d-md-block">
                <div className="float-right">
                  <CButton color="primary" onClick={() => {
                    modal.current.toggle()
                  }}>Add Department Employees</CButton>
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
                        clickable
                        height={200}
                        animation
                        setImg
                        text={
                          `${key.firstname} ${key.lastname}`
                        }
                        dept_role={key.role}
                        textClass={"font-weight-bold"}
                        textRoleStyle={{ position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
                        imgClass={"img_dept"}
                        textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}
                      // onClickMethod={() => {
                      //   toggleModal();
                      // }}
                      />
                    </CCol>
                  )
                })
              }
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
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default DepartmentEmployees;
