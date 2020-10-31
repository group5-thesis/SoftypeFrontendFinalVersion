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
} from '@coreui/react'
import { Modal } from 'reusable'
import LeaveRequestModel from 'models/LeaveRequestModel'
import { shallowCopy, checkDateRange, toCapitalize, renameKey, hasMissingFieds } from 'utils/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { LEAVE_TYPES } from 'utils/constants/constant'
import { actionCreator, ActionTypes } from 'utils/actions';
import api from 'utils/api'

const LeaveFormRequest = ({ request }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        let authed = state.appState.auth.user;
        return {
            firstname: authed.firstname,
            lastname: authed.lastname,
            employeeId: authed.employeeId,
            userId: authed.userId
        }
    })
    LeaveRequestModel.name = `${toCapitalize(user.firstname)} ${toCapitalize(user.lastname)}`
    LeaveRequestModel.employeeID = user.employeeId
    const modalRef = useRef()
    const [data, setData] = useState(request ? request : LeaveRequestModel)
    const [noOfDays, setNoOfDays] = useState(checkDateRange(data.date_from, data.date_to))
    const [hasErrors, setHasErrors] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
   
    const validateDate = () => {
        let gap = checkDateRange(data.date_from, data.date_to)
        setNoOfDays(gap > 0 ? gap : 0)
        checkErrors()
    }

    const handleOnChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        let copy = shallowCopy(data)
        copy[key] = value
        validateDate()
        setData(copy)
        setHasErrors(hasMissingFieds(copy))
    }

    const invalidDate = useMemo(() => {
        return (noOfDays <= 0)
    }, [noOfDays])

    const modalOnClose = () => {
        setData(LeaveRequestModel)
    }

    const checkErrors = () => {
        for (const [_, value] of Object.entries(data)) {
            if (value === '') {
                setHasErrors(true)
                return
            }
        }
        setHasErrors(false)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        let res = await api.post("/create_request_leave", data)
        if (!res.error) {
            dispatch(actionCreator(ActionTypes.ADD_LEAVE_REQUEST, renameKey(res.data[0])))
            modalRef.current.toggle()
            modalOnClose()
        } else {
            alert("error")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        validateDate()
        checkErrors()
    }, [data ,validateDate])

    const actions = () => (
        <>
            <CButton color="primary" disabled={hasErrors || invalidDate || isLoading} onClick={handleSubmit}>
                {
                    isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
                }
            </CButton>
        </>
    )
    
    return (
        <Modal ref={modalRef} {...{
            title: "Request Leave",
            footer: actions(),
            modalOnClose,
            cancelBtnTitle:"Close",
            size: "lg"
        }}>
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
                            id="date-from"
                            name="date_from"
                            value={data.date_from}
                            onChange={handleOnChange}
                            invalid={invalidDate}
                            valid={!invalidDate}
                            placeholder="Date From" />
                    </CFormGroup>
                </CCol>
                <CCol xs="6">
                    <CFormGroup >
                        <CLabel htmlFor="date-input">Date To : </CLabel>
                        <CInput
                            type="date"
                            id="date-to"
                            onChange={handleOnChange}
                            name="date_to"
                            value={data.date_to}
                            invalid={invalidDate}
                            valid={!invalidDate}
                            placeholder="Date To" />
                    </CFormGroup>
                </CCol>
                <CCol xs="12">
                    <CInvalidFeedback className="help-block" style={{ display: invalidDate ? 'block' : 'none' }}>
                        <strong>Criteria : </strong>
                        <ul>
                            <li>Start date must be later than today.</li>
                            <li>Start date and End date must have difference for atleast 1 day.</li>
                        </ul>
                    </CInvalidFeedback>
                </CCol>
            </CFormGroup>
            <CFormGroup >
                <CLabel>No of Days : </CLabel>
                <CInput id="noofdays" value={noOfDays} disabled />
            </CFormGroup>
            <CFormGroup>
                <CLabel htmlFor="Category">Category : </CLabel>
                <CSelect
                    custom name="category"
                    invalid={!data.category}
                    valid={data.category !== ''}
                    value={data.category || ""}
                    onChange={handleOnChange}
                    id="category">
                    <option value="" hidden>Please select</option>
                    {LEAVE_TYPES.map((category, idx) => {
                        return <option key={idx} value={Number(idx + 1)}>{category}</option>
                    })}
                </CSelect>
            </CFormGroup>
            <CFormGroup>
                <CLabel htmlFor="textarea-input">Reason : </CLabel>
                <CTextarea
                    onChange={handleOnChange}
                    name="reason"
                    value={data.reason}
                    invalid={!data.reason}
                    valid={data.reason !== ''}
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