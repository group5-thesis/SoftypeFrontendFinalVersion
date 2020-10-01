import React, { useRef, useState, useEffect } from 'react'
import { Modal } from 'reusable'
import { useSelector, useDispatch } from 'react-redux'
import { LEAVE_TYPES, MONTHS } from 'utils/constants/constant'
import { actionCreator, ActionTypes } from 'utils/actions';
import api from 'utils/api'
import { CFormGroup, CSelect } from '@coreui/react';


const LeaveRequestFilter = (props) => {
    const modalRef = useRef()
    const modalOnClose = () => { }
    const handleChange = () => { }
    return (
        <Modal ref={modalRef} {...{
            title: "Advance Filter",
            // footer: actions(),
            modalOnClose,
            cancelBtnTitle: "Close",
            btnTitle: "Filter",
            theme: "info",
            size: "lg"
        }}>
            <CFormGroup >
                <CSelect custom name="status" id="status" onChange={handleChange}>
                    <option value='' hidde>select month</option>
                    {
                        MONTHS.map((month, idx) => {
                            return <option key={idx} value={idx}>{month}</option>
                        })
                    }
                </CSelect>
            </CFormGroup>
        </Modal>
    )
}

export default LeaveRequestFilter