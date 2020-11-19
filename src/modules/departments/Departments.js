import React, { useState, useRef, useEffect } from 'react';
import {
  CRow,
  CCol,
  CButton,
  CSpinner,
  CInvalidFeedback
} from '@coreui/react'
import { Card, Modal } from 'reusable'
import AddDepartment from './component/AddDepartment'
import DepartmentModel from "models/DepartmentModel"
import { shallowCopy, RULES  , dispatchNotification} from 'utils/helpers';
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from "utils/constants/constant";
import { actionCreator, ActionTypes } from 'utils/actions';
import { APP_MESSAGES } from 'utils/constants/constant';
import api from 'utils/api';
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import colors from "assets/theme/colors"
import { retrieveEmployees } from 'utils/helpers/fetch';

const Departments = (props) => {

  const defaultErrors = {
    department_name: false,
    department_head: false,
  }

  const employees = useSelector(state => {
    let emp = state.appState.employee.employees;
    return emp.map(e => {
      return {
        name: `${e.firstname} ${e.lastname}`,
        employeeId: e.employeeId,
        accountType: e.accountType,
        role: e.role
      }
    })
  })

  const history = useHistory();

  const dispatch = useDispatch();
  const modal = useRef();

  const [data, setData] = useState(DepartmentModel)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setError] = useState(defaultErrors)

  const handleSubmit = async () => {
    setIsLoading(true)
    dispatchNotification(dispatch, { type: 'info', message: "Please wait" })
    let res = await api.post("/add_department", { name: data.department_name, department_head: +data.department_head }) // data [department_head, department_name as name]
    if (!res.error) {
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
      dispatch(actionCreator(ActionTypes.ADD_DEPARTMENT, res.data.department[0]))
      retrieveEmployees(dispatch)
      toggleModal()
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setIsLoading(false)
  }

  const stateDepartments = useSelector((state) => {
    return state.appState.department.departments
  });

  console.log(stateDepartments)

  const validateInfo = (name, value) => {
    const { required } = RULES
    if (name === "department_name") {
      stateDepartments.filter(dept => {
        return name === dept.department_name
      });
      return required(value)
    }
    if (name === "department_head") {
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

  const toggleModal = () => {
    setData(DepartmentModel)
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

  const viewDepartmentInfo = (id) => {
    sessionStorage.setItem('deptId', id);
    history.push(`/employee/departments/${id}`);
  };

  return (
    <>
      <CRow>
        {
          stateDepartments.map((dept, index) => {
            return (
              <CCol sm="6" lg="3" key={dept.department_id + "crd"}>
                <Card
                  color={COLORS[Math.ceil(index / COLORS.length)]}
                  clickable
                  animation
                  centeredText
                  height={200}
                  text={dept.department_name}
                  textClass={"text-white font-weight-bold h2"}
                  onClickMethod={() => {
                    viewDepartmentInfo(dept.department_id)
                  }}
                />
              </CCol>
            )
          })
        }
        <CCol sm="6" lg="3">
          <Modal
            ref={modal}
            centered
            title="Add Department"
            modalOnClose={toggleModal}
            hidden
            closeButton
            footer={
              <>
                <CButton color="primary" disabled={isLoading} onClick={validate}>
                  {
                    isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
                  }
                </CButton>
              </>
            }
          >
            <AddDepartment {...{ employees, onChange, data, renderFeedback, errors }} />
          </Modal>
          <Card
            text={
              <Icon path={mdiPlus}
                size={4}
                horizontal
                vertical
                rotate={180}
                color={colors.$grey}
              />
            }
            animation
            isIcon
            clickable
            centeredText
            height={200}
            onClickMethod={toggleModal}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Departments
