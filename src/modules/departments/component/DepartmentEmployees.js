import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWidth, shallowCopy, RULES, copyArray, getBaseUrl, dispatchNotification } from 'utils/helpers';
import { fetchDepartmentEmployees, retrieveEmployees, fetchDepartmentManagers } from 'utils/helpers/fetch';
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
import UpdateDepartmentManager from './UpdateDepartmentManager'
import DepartmentManager from "models/DepartmentManagerModel"
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
import department_icon_default from "../../../assets/img/default_dept_icon.png"

const DepartmentEmployees = ({ match }) => {
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

  const defaultErrors = {
    employeeId: false
  }

  const [updatePM, setUpdatePM] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setError] = useState(defaultErrors)
  const [data, setData] = useState(DepartmentEmployee)
  const [managerToEdit, setManagerToEdit] = useState(DepartmentManager)
  const [isChange, setIsChange] = useState(false)
  const [managerId, setManagerId] = useState(match.params.id)
  const [departmentEmployeeId, setDepartmentEmployeeId] = useState()
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
    modal.current.toggle();
    setData(DepartmentEmployee)
    setError(defaultErrors)
    setUpdatePM(false)
    setManagerToEdit(DepartmentManager)
    setIsChange(false)
    setIsLoading(false)
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
    dispatchNotification(dispatch, { type: 'info', message: "Please wait" })
    if (!res.error) {
      dispatchNotification(dispatch, { type: 'success', message: "Success" })
      dispatch(actionCreator(ActionTypes.ADD_DEPARTMENT_EMPLOYEE, res.data.employee_information[0]))
      fetchDepartmentEmployees(dispatch);
      retrieveEmployees(dispatch)
      fetchDepartmentManagers(dispatch)
      toggleModal()
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
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
    dispatchNotification(dispatch, { type: 'info', message: 'Please wait' })
    if (!res.error) {
      fetchDepartmentEmployees(dispatch);
      retrieveEmployees(dispatch)
      fetchDepartmentManagers(dispatch)
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    if (_departmentEmployees.length <= 1) {
      setRemoveEmployee(false)
    }
  }

  const handleChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    let copy = shallowCopy(data)
    copy[key] = value
    let dm = `${_departmentManager[0].manager_firstname} ${_departmentManager[0].manager_lastname}`
    if (value === dm) {
      setIsChange(false)
    }
    setIsChange(true)
    setManagerToEdit(copy)
    // console.log(managerToEdit)
  }

  const validateUpdate = async () => {
    setIsLoading(true)
    let data = {
      id: _departmentManager[0].managerId,
      departmentId: _departmentManager[0].department_id,
      employeeId: managerToEdit.department_manager
    }
    console.log(data)
    let res = await api.post('/update_department_manager', data)
    if (!res.error) {
      console.log(res)
    }
    setManagerToEdit(DepartmentManager)
    fetchDepartmentManagers(dispatch)
    fetchDepartmentEmployees(dispatch)
    setIsChange(false)
    modal.current.toggle();
    setIsLoading(false)
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
              handleDeleteEmployee(departmentEmployeeId)
            },
            title: "Are you sure you want to do this?",
          }}
        >
        </ConfirmDialog>
        <Modal
          ref={modal}
          centered
          title={removeEmployee ? "Are you sure to do this?" : updatePM ? "Update Project Manager" : "Add Department Employee"}
          hidden
          modalOnClose={() => {
            modal.current.toggle()
            setUpdatePM(false)
          }}
          closeButton
          footer={
            <>
              <CButton color="primary" disabled={isLoading || updatePM && !isChange} onClick={updatePM ? validateUpdate : validate}>
                {
                  isLoading ? <CSpinner color="secondary" size="sm" /> : updatePM === true ? 'Update' : 'Submit'
                }
              </CButton>
              <CButton color="danger" onClick={toggleModal}>Cancel</CButton>
            </>
          }
          hideCancelButton
        >
          {
            // removeEmployee ? "Test Delete?" : <AddDepartmentEmployee {...{ _departmentManager, onChange, data, renderFeedback, errors }} />
            // : updatePM === true ? <UpdateDepartmentManager /> : ""
            updatePM === true ? <UpdateDepartmentManager {...{ handleChange, managerToEdit, _departmentManager }} /> : <AddDepartmentEmployee {...{ _departmentManager, onChange, data, renderFeedback, errors }} />
          }
        </Modal>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="6">
                <h4 className="card-title mb-0 blockqoute">{`Team Leader: ${_departmentManager[0].manager_firstname} ${_departmentManager[0].manager_lastname}`}</h4>
              </CCol>
              {
                <CCol sm="6" className="d-none d-md-block">
                  <div className="float-right">
                    <CButton color={"danger"} onClick={() => {
                      removeEmployee ? cancelRemoveDepartmentEmployee() : removeDepartmentEmployee()
                    }} disabled={_departmentEmployees.length === 0}>
                      {removeEmployee ? "Cancel" : "Remove Employees"}
                    </CButton>
                  </div>
                  {
                    !removeEmployee ?
                      <div className="float-right mr-2">
                        <CButton color={"primary"} onClick={() => {
                          modal.current.toggle()
                          setUpdatePM(true)
                        }} >
                          {"Update Manager"}
                        </CButton>
                      </div>
                      : ""
                  }
                </CCol>
              }
            </CRow>
          </CCardHeader>

          <CCardBody>
            {
              _departmentEmployees.length === 0 && user.accountType !== 1 ? <NoData title="No Employee/s Added Yet" /> :
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
                            textClass={"blockquote font-weight-bold text-center"}
                            textRoleStyle={{ position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
                            imgClass={"img_dept"}
                            imgSrc={key.profile_img !== null ? `${getBaseUrl()}/file/images/${key.profile_img}` : department_icon_default}
                            textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', width: '100%' }}
                            onClickMethod={() => {
                              if (removeEmployee) {
                                dialog.current.toggle()
                                setDepartmentEmployeeId(key.department_employeeId)
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
                    user.accountType === 1 ?
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
                      : ""
                  }
                </CRow>
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default DepartmentEmployees;
