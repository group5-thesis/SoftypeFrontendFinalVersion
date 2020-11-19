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
  CImg
} from '@coreui/react';
import { copyArray, setWidth, toCapitalize, shallowCopy, RULES, getBaseUrl } from 'utils/helpers';
import { NoData, Card, Modal } from 'reusable';
import colors from "assets/theme/colors"
import AddDepartmentManager from './AddDepartmentManager'
import DepartmentManager from "models/DepartmentManagerModel"
import Icon from '@mdi/react';
import { useHistory, Redirect } from "react-router-dom";
import { APP_MESSAGES } from 'utils/constants/constant';
import {
  mdiPlus,
  mdiTrashCanOutline
} from '@mdi/js';
import _ from 'lodash';
import api from 'utils/api';
import { actionCreator, ActionTypes } from 'utils/actions';
import department_icon_default from "../../../assets/img/default_dept_icon.png"

const Department = ({ match, location }) => {

  const defaultErrors = {
    department_manager: false
  }

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setError] = useState(defaultErrors)
  const [data, setData] = useState(DepartmentManager)
  const query = new URLSearchParams(location.search);
  // const [deptId, setDeptId] = useState()
  const history = useHistory();
  const dispatch = useDispatch();
  let deptId = query.get("id");
  if (deptId === null || deptId === '' || deptId === undefined) {
    deptId = sessionStorage.getItem('deptId')
    history.replace({
      pathname: '/employee/departments/departmentDetails',
      search: `?id=${deptId.toString()}`
    })
  }
  sessionStorage.setItem('deptId', deptId)
  const modal = useRef();

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
    history.push(`/employee/departments/departmentDetails/employees/${e.managerId}`);
  }

  const viewDepartmentDetails = async (e) => {
    let res = await api.get(`/retrieve_limited_department/${e.department_id}`)
    if (res.error) {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
  }
  // useEffect(() => {
  //   // router params pass as department Id
  //   console.log(match.params.id, "Params Id")
  //   if (match.params.id === "employees") {
  //     // http://localhost:3000/employee/departments/1
  //     let d = sessionStorage.getItem('deptId');
  //     setDeptId(d);
  //   }
  //   console.log(deptId, "dept Id")
  // }, [deptId])

  return (
    !request.length ? <NoData /> :
      <CRow className="justify-content-center">
        <CCol {...setWidth("12")}>
          <Modal
            ref={modal}
            centered
            title="Add Department Manager"
            hidden
            modalOnClose={toggleModal}
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
            <AddDepartmentManager {...{ employees, onChange, data, renderFeedback, errors, departmentDetails }} />
          </Modal>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol className="d-none d-md-block">
                  {/* <div className="float-right" >
                    <CButton color="primary" onClick={() => {
                      modal.current.toggle()
                    }}>Add Department Manager</CButton>
                  </div> */}
                  <div className="float-right" >
                    <CButton color="primary" onClick={() => {
                      // modal.current.toggle()
                      viewDepartmentDetails(departmentDetails)
                    }}>View Department Details</CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="px-1 py-1">
                  <Card
                    clickable
                    centeredText
                    height={200}
                    animation
                    text={departmentDetails.department_name}
                    textClass={"text-dark font-weight-bold h1"}
                    isIcon={false}
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
                    text={departmentDetails.department_head}
                    textClass={"font-weight-bold"}
                    textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}
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
                            `${key.manager_firstname}`
                          }
                          imgSrc={key.profile_img === null ? department_icon_default : `${getBaseUrl()}/file/images/${key.profile_img}`}
                          dept_role={key.role}
                          textClass={"font-weight-bold"}
                          textRoleStyle={{ position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
                          imgClass={"img_dept"}
                          textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}
                          onClickMethod={() => {
                            viewEmployees(key)
                          }}
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

export default Department
