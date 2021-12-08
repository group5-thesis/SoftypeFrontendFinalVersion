import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  CButton,
  CCol,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CInvalidFeedback,
  CSpinner,
  CAlert,
} from '@coreui/react'
import { Modal } from 'reusable'
import LeaveRequestModel from 'models/LeaveRequestModel'
import { checkDateRange, toCapitalize, renameKey, dispatchNotification } from 'utils/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { LEAVE_TYPES, LEAVE_REQUEST_FILTER } from 'utils/constants/constant'
import { actionCreator, ActionTypes } from 'utils/actions';
import { retrieveLeaveRequests } from 'utils/helpers/fetch'
import api from 'utils/api'
import _ from 'lodash'
import moment from 'moment';
const LeaveFormRequest = ({ request }) => {
  const invalidRange = 'Invalid date range';
  const limitReached = 'You have reached your maximum number of leave.';

  let _errors = {
    dates: false,
    reason: false,
    category: false
  }
  const dispatch = useDispatch();
  const user = useSelector(state => {
    let authed = state.appState.auth.user;
    return {
      firstname: authed.firstname,
      lastname: authed.lastname,
      employeeId: authed.employeeId,
      userId: authed.userId,
      remaining_leave: authed.remaining_leave,
      accountType: authed.accountType
    }
  })
  let departmentDetail = useSelector(state => state.appState.employee.employees.filter(emp => emp.employeeId === user.employeeId)[0])
  const employeesHr = useSelector(state => {
    return state.appState.employee.employees.filter(emp => {
      return emp.accountType === 1
    })
  })

  let { department_id, department_head, department_headId, isHead, isManager, deparment_IdM } = departmentDetail
  const dept_head = useSelector(state => {
    return state.appState.department.departments.filter(dep => {
      return dep['department_id'] === department_id ? department_id : deparment_IdM
    })
  })

  // console.log(dept_head[0].department_head_employeeId)

  LeaveRequestModel.name = `${toCapitalize(user.firstname)} ${toCapitalize(user.lastname)}`
  LeaveRequestModel.employeeID = user.employeeId;
  // LeaveRequestModel.approverId = user.accountType === 3 ? department_headId : user.accountType === 1 ? user.employeeId : employeesHr[0].employeeId;
  LeaveRequestModel.approverId = user.accountType === 3 ? department_headId : user.accountType === 1 ? user.employeeId : employeesHr[0].employeeId;
  LeaveRequestModel.approver = user.accountType === 3 ? department_head : (user.accountType === 3 && isManager !== null) ? dept_head[0].department_head : user.accountType === 2 ? `${employeesHr[0].firstname} ${employeesHr[0].lastname}` : `${user.firstname} ${user.lastname}`;
  // LeaveRequestModel.approver = department_head && department_head;
  const modalRef = useRef()
  const [data, setData] = useState(request ? request : LeaveRequestModel)
  const [noOfDays, setNoOfDays] = useState(checkDateRange(data.date_from, data.date_to))
  const [remainingLeave, setRemainingLeave] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(_errors);
  const [isLimitError, toggleLimitError] = useState(false)
  const [isRangeError, toggleRangeError] = useState(false)
  const [placeholder, setPlaceholder] = useState('')
  const validateDate = () => {
    toggleLimitError(false)
    toggleRangeError(false)
    let checkBefore = (date) => {
      if (moment(date).isBefore(moment())) {
        toggleLimitError(false)
        setNoOfDays(invalidRange)
        toggleRangeError(true)
      }
    }
    if (data.date_from !== "") {
      checkBefore(data.date_from)
    }

    if (data.date_to !== "") {
      checkBefore(data.date_to)
    }
    if (data.date_from === "" || data.date_to === "") {
      return setNoOfDays(0)
    }

    let gap = checkDateRange(data.date_from, data.date_to);

    if (gap > 0) {
      if (remainingLeave < gap) {
        toggleRangeError(false)
        toggleLimitError(true)
      }

      return setNoOfDays(gap);
    } else {
      setNoOfDays(invalidRange)
      toggleLimitError(false)
      toggleRangeError(true)
    }
  }

  const validateInfo = async () => {
    let { category, date_from, date_to, reason } = data
    if (category === "" || category === null) {
      _errors.category = true;
    }
    if (date_from === "" || date_to === null || date_to === "" || date_from === "" || noOfDays === invalidRange || isLimitError) {
      _errors.dates = true;
    }

    if (reason === "" || reason === null) {
      if (!placeholder.length) {
        _errors.reason = true;
      } else {
        handleOnChange({
          target: {
            name: 'reason',
            value: placeholder
          }
        })
      }
    }
    _errors.dates = invalidDate;
    setErrors(_errors);
    if (!Object.values(_errors).includes(true)) {
      handleSubmit()
    }

  }

  const handleOnChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    let copy = { ...data }
    _errors = { ...errors }
    _errors[key.includes('date_') ? 'dates' : key] = false;
    setErrors(_errors);
    copy[key] = value;
    let _placeholder = '';
    if (copy['category']) {
      _placeholder = `I am having my ${copy['category']} ${(copy['date_from']) ? 'from ' + moment(copy['date_from']).format('ll') : ''} ${(copy['date_to']) ? 'until ' + moment(copy['date_to']).format('ll') : ''}`
    }
    if (copy['reason'].includes(`I am having my ${copy['category']}`)) {
      copy['reason'] = _placeholder;
    }
    setPlaceholder(_placeholder)
    validateDate()
    setData(copy)
  }
  const invalidDate = useMemo(() => {
    return (noOfDays <= 0 || noOfDays === invalidRange || noOfDays === limitReached)
  }, [noOfDays])

  const modalOnClose = () => {
    setData(LeaveRequestModel)
    _errors = _.mapValues(_errors, () => false);
    setErrors(_errors)
  }
  const checkRemainingLeave = async () => {
    try {
      let res = await api.get(`/checkRemainingLeave/${user.employeeId}`);
      if (res.error) return dispatchNotification(dispatch, { type: 'error', message: res.message });
      setRemainingLeave(res.data.remaining_leave);
      if (res.data.remaining_leave === 0) {
        toggleLimitError(true)
        setNoOfDays(limitReached)
      }
    } catch (error) {
      return dispatchNotification(dispatch, { type: 'error', message: error.toString() })
    }

  }

  const handleSubmit = async () => {
    setIsLoading(true)
    if (user.accountType === 3 && isManager) {
      data.approverId = dept_head[0].department_head_employeeId
      data.approver = dept_head[0].department_head
    }
    setData({ ...data, reason: data.reason || placeholder });
    let res = await api.post("/create_request_leave", data)
    if (!res.error) {
      const { employeeId, roleId } = user;
      let payload = LEAVE_REQUEST_FILTER('All');
      dispatch(actionCreator(ActionTypes.ADD_LEAVE_REQUEST, renameKey(res.data[0])))
      retrieveLeaveRequests(dispatch, { ...payload, ...{ employeeId, roleId: user.accountType } })
      modalRef.current.toggle()
      modalOnClose()
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message });
    }
    setIsLoading(false)
  }

  useEffect(() => {
    validateDate()
    checkRemainingLeave();
  }, [data, setNoOfDays])

  const actions = () => (
    <>
      <CButton color="primary" disabled={isLoading || isLimitError || (department_id === null && isManager === null && user.accountType === 3) || (isHead === null && user.accountType === 2)} onClick={validateInfo}>
        {
          isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
        }
      </CButton>
    </>
  )

  return (
    <Modal ref={modalRef} {...{
      title: `Request Leave`,
      footer: actions(),
      modalOnClose,
      cancelBtnTitle: "Close",
      size: "lg"
    }}>
      {(isLimitError || isRangeError) && <CAlert color="danger">
        <>
          {
            isRangeError && <><strong>Date Criteria : </strong>
              <ul>
                <li>Start date must be later than today.</li>
                <li>Start date and End date must have difference for atleast 1 day.</li>
              </ul>
            </>
          }
          {
            isLimitError && <p style={{ margin: '0' }}>{limitReached}</p>
          }
        </>
      </CAlert>}
      {<CAlert color={(!department_id && isManager === null && user.accountType === 3) || (isHead === null && user.accountType === 2) ? "danger" : "info"}>
        {(department_id === null && isManager === null && user.accountType === 3) || (isHead === null && user.accountType === 2) ? "Leave requests is available for department employees only." : `You still have ${user.remaining_leave} remaining leave.`}
      </CAlert>}
      <CFormGroup >
        <CLabel>Name : </CLabel>
        <CInput id="company" value={data.name} disabled />
      </CFormGroup>
      <CFormGroup row className="my-0">
        <CCol xs="6">
          <CFormGroup >
            <CLabel htmlFor="date-input">Date From : </CLabel>
            <CInput
              type="date"
              disabled={(department_id === null && isManager === null && user.accountType === 3) || (isHead === null && user.accountType === 2)}
              id="date-from"
              name="date_from"
              value={data.date_from}
              onChange={handleOnChange}
              invalid={errors.dates}
              placeholder="Date From" />
          </CFormGroup>
        </CCol>
        <CCol xs="6">
          <CFormGroup >
            <CLabel htmlFor="date-input">Date To : </CLabel>
            <CInput
              type="date"
              id="date-to"
              disabled={(department_id === null && isManager === null && user.accountType === 3) || (isHead === null && user.accountType === 2)}
              onChange={handleOnChange}
              name="date_to"
              value={data.date_to}
              invalid={errors.dates}
              placeholder="Date To" />
          </CFormGroup>
        </CCol>
      </CFormGroup>
      <CFormGroup row className="my-0">
        <CCol xs="6">
          <CFormGroup >
            <CLabel>No of Days : </CLabel>
            <CInput id="noofdays" value={noOfDays} disabled />
          </CFormGroup>
        </CCol>
        <CCol xs="6">
          <CFormGroup>
            <CLabel htmlFor="Category">Category : </CLabel>
            <CSelect
              custom name="category"
              disabled={(department_id === null && isManager === null && user.accountType === 3) || (isHead === null && user.accountType === 2)}
              invalid={errors.category}
              value={data.category || ""}
              onChange={handleOnChange}
              id="category">
              <option value="" hidden>Please select</option>
              {LEAVE_TYPES.map((category, idx) => {
                return <option key={idx} value={category}>{category}</option>
              })}
            </CSelect>
          </CFormGroup>
        </CCol>
      </CFormGroup>
      <CFormGroup>
        <CLabel htmlFor="textarea-input">Reason : </CLabel>
        <CTextarea
          onChange={handleOnChange}
          name="reason"
          disabled={(department_id === null && isManager === null && user.accountType === 3) || (isHead === null && user.accountType === 2)}
          placeholder={placeholder && placeholder}
          value={data.reason}
          invalid={errors.reason}
          rows="5"
        />
        <CInvalidFeedback className="help-block">
          Please provide a valid information
        </CInvalidFeedback>
      </CFormGroup>
    </Modal>
  )

}
export default LeaveFormRequest
