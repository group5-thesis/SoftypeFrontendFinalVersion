import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CInvalidFeedback,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import { copyArray, setWidth, dispatchNotification, shallowCopy, RULES, getBaseUrl } from 'utils/helpers';
import { NoData, Card, Modal, ConfirmDialog, Loader } from 'reusable';
import colors from "assets/theme/colors"
import AddDepartmentManager from './AddDepartmentManager'
import UpdateDepartmentDetails from './UpdateDepartmentDetails'
import DeleteDepartment from './DeleteDepartment'
import DepartmentModel from "models/DepartmentModel"
import DepartmentManager from "models/DepartmentManagerModel"
import Icon from '@mdi/react';
import { useHistory } from "react-router-dom";
import { APP_MESSAGES } from 'utils/constants/constant';
import {
  mdiPlus,
  mdiPencilCircleOutline,
  mdiTrashCanOutline
} from '@mdi/js';
import _ from 'lodash';
import api from 'utils/api';
import { actionCreator, ActionTypes } from 'utils/actions';
import department_icon_default from "../../../assets/img/default_dept_icon.png"
import { fetchDepartments, retrieveEmployees, fetchDepartmentEmployees, fetchDepartmentManagers, retrieveLeaveRequests } from 'utils/helpers/fetch';
import { CIcon } from '@coreui/icons-react';

const Department = ({ location }) => {

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
    department_manager: false
  }

  const defaultName = {
    department_name: ''
  }

  const [dname, setDname] = useState(defaultName)
  const [dataToEdit, setDataToEdit] = useState(DepartmentModel)
  const [isChange, setIsChange] = useState(false)
  const [editDepartment, setEditDepartment] = useState(false)
  const [removeTeam, setRemoveTeam] = useState(false)
  const [onHover, setOnHover] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setError] = useState(defaultErrors)
  const [data, setData] = useState(DepartmentManager)
  const [departmentManagerId, setDepartmentManagerId] = useState()
  const [deleteDepartment, setDeleteDepartment] = useState(false)
  const query = new URLSearchParams(location.search);
  const history = useHistory();
  const dispatch = useDispatch();
  let deptId = query.get("id") || sessionStorage.getItem('deptId');
  const [searchParams, setSearchParams] = useState(1)
  sessionStorage.setItem('deptId', deptId)
  const modal = useRef();
  const dialog = useRef();

  // use to display only the department name and head
  const _request = useSelector(state => {
    return state.appState.department.departments.filter(el => {
      return el.department_id.toString() === deptId.toString()
    })
  })

  // use to display all the managers in the department
  const _departmentManagers = useSelector(state => {
    return state.appState.department_manager.department_managers.filter(el => {
      return el.department_id.toString() === deptId.toString()
    })
  })

  // use to display as option to add department manager
  const employees = useSelector((state) => {
    return state.appState.employee.employees
  });

  let request = copyArray(_request);

  const departmentDetails = request[0]

  const toggleModal = () => {
    setData(DepartmentManager)
    setError(defaultErrors)
    setEditDepartment(false)
    setDataToEdit(DepartmentModel)
    setIsChange(true)
    setDeleteDepartment(false)
    modal.current.toggle();
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    data.department_id = deptId
    dispatchNotification(dispatch, { type: 'info', message: 'Please wait' })
    let res = await api.post("/add_department_manager", { department_manager: data.department_manager, departmentId: data.department_id })
    if (!res.error) {
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
      dispatch(actionCreator(ActionTypes.ADD_DEPARTMENT_MANAGER, res.data.department_manager_information[0]))
      retrieveEmployees(dispatch)
      fetchDepartmentEmployees(dispatch)
      fetchDepartmentManagers(dispatch)
      toggleModal()
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setIsLoading(false)
  }

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
    if (name === "department_manager") {
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

  const viewEmployees = (e) => {
    sessionStorage.setItem('managerId', e.managerId);
    history.push(`/employee/departments/department/employees/${e.managerId}`);
  }

  const viewDepartmentDetails = (e) => {
    sessionStorage.setItem("dept_detailsId", e.department_id)
    history.push(`/employee/departments/department/details?id=${searchParams}&aqs=${e.department_id}`);
  }

  const editDepartmentDetails = () => {
    modal.current.toggle();
    setEditDepartment(true)
  }

  const validateUpdate = async () => {
    setIsLoading(true)
    if (dataToEdit.department_name === null || dataToEdit.department_name === "") {
      dataToEdit.department_name = departmentDetails.department_name
    }
    if (dataToEdit.department_head === null || dataToEdit.department_head === "") {
      dataToEdit.department_head = departmentDetails.department_head_employeeId
    }
    let data = {
      departmentId: departmentDetails.department_id,
      name: dataToEdit.department_name ? dataToEdit.department_name.charAt(0).toUpperCase() + dataToEdit.department_name.slice(1) : departmentDetails.department_name,
      department_head_pk_id: departmentDetails.department_headId,
      departmentHeadId: +dataToEdit.department_head
    }
    let res = await api.post('/update_department', data)
    if (!res.error) {
      let payload = res.data.department;
      dispatch(actionCreator(ActionTypes.FETCH_DEPARTMENTS, payload))
      fetchDepartmentEmployees(dispatch)
      fetchDepartmentManagers(dispatch)
      fetchDepartments(dispatch)
      retrieveEmployees(dispatch)
      retrieveLeaveRequests(dispatch)
    }
    setDataToEdit(DepartmentModel)
    fetchDepartments(dispatch)
    setIsChange(false)
    setDeleteDepartment(false)
    setEditDepartment(false)
    modal.current.toggle();
    setIsLoading(false)
  }

  const handleChange = (e) => { // value is employee ID
    let key = e.target.name
    let value = e.target.value
    if (key === "department_name_delete") {
      setDname(value.trim())
    }
    
    let copy = shallowCopy(dataToEdit)
    copy[key] = value
    if (value === "") {
      setIsChange(false)
    } else {
      setIsChange(true)
    }
    if (key === "department_head") {
      if (value === departmentDetails.department_head_employeeId) {
        setIsChange(false)
      }
      else {
        setIsChange(true)
      }
    } else {
      if (value.replace(" ", "").toLowerCase() === departmentDetails.department_name.replace(" ", "").toLowerCase()) {
        setIsChange(false)
      } else {
        setIsChange(true)
      }
    }
    setDataToEdit(copy)
  }

  const removeDepartmentTeam = () => {
    setRemoveTeam(true)
  }

  const cancelRemoveDepartmentTeam = () => {
    setRemoveTeam(false)
  }

  const handleDeleteTeam = async (dept_employeeId) => {
    let res = await api.post('/delete_department_manager', { id: dept_employeeId })
    dispatchNotification(dispatch, { type: 'info', message: 'Please wait' })
    if (!res.error) {
      fetchDepartmentEmployees(dispatch);
      retrieveEmployees(dispatch)
      fetchDepartmentManagers(dispatch)
      fetchDepartments(dispatch)
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    if (_departmentManagers.length <= 1) {
      setRemoveTeam(false)
    }
  }

  const handleDeleteDepartment = async () => {
    setLoading(true)
    let res = await api.post('/delete_department', { id: departmentDetails.department_id, headId: departmentDetails.department_headId })
    dispatchNotification(dispatch, { type: 'info', message: 'Please wait' })
    if (!res.error) {
      fetchDepartmentEmployees(dispatch);
      retrieveEmployees(dispatch)
      fetchDepartmentManagers(dispatch)
      fetchDepartments(dispatch)
      retrieveLeaveRequests(dispatch)
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setLoading(false)
    history.push(`/employee/departments`);
  }

  const clickProceedToDeleteDept = () => {
    dialog.current.toggle()
    modal.current.toggle();
  }

  useEffect(() => {
    history.replace({
      pathname: '/employee/departments/department',
      search: `?id=${deptId.toString()}`
    })
    return () => {

    }
  }, [])

  return (
    loading ? <Loader bg="rgba(255,255,255,0.5)" /> :
      !request.length ? <NoData /> :
        <CRow className="justify-content-center">
          <CCol {...setWidth("12")}>
            <ConfirmDialog
              ref={dialog}
              id="custom_dialog1"
              {...{
                show: dialog,
                onConfirm: () => {
                  deleteDepartment ? handleDeleteDepartment() : handleDeleteTeam(departmentManagerId)
                },
                title: "Are you sure you want to do this?",
              }}
            >
            </ConfirmDialog>
            <Modal
              ref={modal}
              centered
              title={editDepartment ? "Update Department" : deleteDepartment ? "Delete Department" : "Add Department Manager"}
              hidden
              modalOnClose={toggleModal}
              closeButton
              footer={
                <>
                <CButton color="primary" disabled={isLoading || isChange && !dataToEdit.department_name || dataToEdit.department_name === departmentDetails.department_name || deleteDepartment && dname !== departmentDetails.department_name}
//                   <CButton color="primary" disabled={isLoading || editDepartment && !dataToEdit.department_name || dataToEdit.department_name === departmentDetails.department_name || deleteDepartment && dname !== departmentDetails.department_name}
                  {/* <CButton color="primary" disabled={isLoading || isChange || deleteDepartment && dname !== departmentDetails.department_name}*/}
                    onClick={editDepartment ? validateUpdate : deleteDepartment ? clickProceedToDeleteDept : validate}>
                    {
                      isLoading ? <CSpinner color="secondary" size="sm" /> : editDepartment ? 'Update' : deleteDepartment ? "Proceed" : 'Submit'
                    }
                  </CButton>
                  <CButton color="danger" onClick={toggleModal}>Cancel</CButton>
                </>
              }
              hideCancelButton
            >
              {
                editDepartment ? <UpdateDepartmentDetails {...{ dataToEdit, handleChange, renderFeedback, errors, departmentDetails }} /> :
                  deleteDepartment ? <DeleteDepartment {...{ departmentDetails, handleChange }} /> :
                    <AddDepartmentManager {...{ employees, onChange, data, renderFeedback, errors, departmentDetails }} />
              }
            </Modal>
            <CCard>
              <CCardHeader>
                <CRow>
                  {
                    user.accountType === 1 ?
                      <CCol className="d-md-block">
                        <div className="float-right">
                          <CDropdown color={"primary"}>
                            <CDropdownToggle>
                              <CIcon name="cil-options" />
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                              <CDropdownItem onClick={() => {
                                setDeleteDepartment(true)
                                setRemoveTeam(false)
                                modal.current.toggle()
                              }}>Delete This Department
                            </CDropdownItem>
                              <CDropdownItem onClick={() => {
                                editDepartmentDetails()
                                setRemoveTeam(false)
                              }}>Update Department
                            </CDropdownItem>
                              <CDropdownItem disabled={_departmentManagers.length === 0} onClick={() => {
                                removeTeam ? cancelRemoveDepartmentTeam() : removeDepartmentTeam()
                              }}>{removeTeam ? "Cancel Deletetion" : "Delete Department Team"}
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      </CCol>
                      : ""
                  }
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol className="px-1 py-1">
                    <Card
                      centeredText
                      height={200}
                      animation
                      text={onHover ? <Icon path={mdiPencilCircleOutline}
                        size={4}
                        horizontal
                        vertical
                        rotate={180}
                        color={colors.$grey}
                      /> : departmentDetails.department_name}
                      textClass={"text-dark font-weight-bold h1"}
                      isIcon={editDepartment}
                    />
                  </CCol>
                  <CCol sm="6" lg="3" className="px-1 py-1">
                    <Card
                      clickable
                      height={200}
                      animation
                      setImg
                      imgClass={"img_dept_head"}
                      imgSrc={departmentDetails.department_head_profileImg !== null ? `${getBaseUrl()}/file/images/${departmentDetails.department_head_profileImg}` : department_icon_default}
                      text={`H: ${departmentDetails.department_head}`}
                      textClass={"blockquote font-weight-bold text-center"}
                      textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', width: '100%' }}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  {
                    _departmentManagers.map((key, index) => {
                      return (
                        <CCol sm="6" lg="3" className="px-1 py-1" key={index}>
                          <Card
                            clickable
                            height={200}
                            animation
                            setImg
                            text={
                              `M: ${key.manager_firstname}`
                            }
                            imgSrc={key.profile_img === null ? department_icon_default : `${getBaseUrl()}/file/images/${key.profile_img}`}
                            dept_role={key.role}
                            textClass={"blockquote font-weight-bold  text-center"}
                            textRoleStyle={{ position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
                            imgClass={"img_dept"}
                            textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', width: '100%' }}
                            onClickMethod={() => {
                              removeTeam ? dialog.current.toggle() : viewEmployees(key)
                              removeTeam && setDepartmentManagerId(key.managerId)
                            }}
                            deleteCard={removeTeam}
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
                    user.accountType === 1 && !editDepartment && !removeTeam ?
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
              </CCardBody>
            </CCard>
          </CCol>
        </CRow >
  )
}

export default Department
