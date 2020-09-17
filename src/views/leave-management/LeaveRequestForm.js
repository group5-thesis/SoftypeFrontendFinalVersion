import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    CButton,
    CCol,
    CFormGroup,
    CTextarea,
    CInput,
    CLabel,
    CSelect,
    CInvalidFeedback,
} from '@coreui/react';
import { Modal } from 'reusable';
import LeaveRequestModel from 'models/LeaveRequestModel';
import { shallowCopy, checkDateRange } from 'utils/helpers';

const LeaveFormRequest = ({ request, onSubmit }) => {
    LeaveRequestModel.name = 'Yol';
    const modalRef = useRef()
    const [data, setData] = useState(request ? request : LeaveRequestModel)
    const [noOfDays, setNoOfDays] = useState(checkDateRange(data.date_from, data.date_to));
    const [hasErrors, setHasErrors] = useState(true);
    const handleOnChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        let copy = shallowCopy(data);
        copy[key] = value;
        setData(copy)
    }
    const CATEGORY = [
        "Sick Leave (SL)",
        "Vacation Leave (VL)",
        "Service Incentive Leave (SIL)",
        "Maternity Leave (ML)",
        "Paternity Leave",
        "Parental Leave",
        "Rehabilitation Leave",
        "Study Leave"
    ]

    const invalidDate = useMemo(() => {
        return (noOfDays <= 0);
    }, [noOfDays]);

    const modalOnClose = () => {
        setData(LeaveRequestModel)
    }

    const checkErrors = () => {
        for (const [_, value] of Object.entries(data)) {
            if (value === '') {
                setHasErrors(true);
                return;
            }
        }
        setHasErrors(false);
    }

    useEffect(() => {
        let gap = checkDateRange(data.date_from, data.date_to);
        setNoOfDays(gap > 0 ? gap : 0);
        checkErrors()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const actions = () => (
        <>
            <CButton color="primary" disabled={hasErrors || invalidDate} onClick={() => {
                onSubmit(data)
                modalRef.current.toggle()
                modalOnClose()
            }}>Submit</CButton>
        </>
    )
    return (
        <Modal ref={modalRef} {...{
            title: "Request Leave",
            footer: actions(),
            modalOnClose,
            size: "lg"

        }}>
            <CFormGroup >
                <CLabel>Name : </CLabel>
                <CInput id="company" value="Yol Torres" disabled />
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
                    value={data.category}
                    onChange={handleOnChange}
                    id="category">
                    <option value="" hidden>Please select</option>
                    {CATEGORY.map((category, idx) => {
                        return <option key={idx} value={category}>{category}</option>

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
export default LeaveFormRequest;