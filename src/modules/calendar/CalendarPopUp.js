import React from 'react';
import { CCard, CCardBody } from '@coreui/react';

const CalendarPopUp = ({ event = {} }) => {
    let { employee, category, date_from, date_to } = event;

    return (
        <>
            <CCard>
                <CCardBody style={{ overflowY: 'auto', }}>
                    <p className="title">Name : <strong>{employee}</strong></p>
                    <p className="title">Type : <strong>{category}</strong></p>
                    <p className="title">Start Date : <strong>{date_from}</strong></p>
                    <p className="title">End Date : <strong>{date_to}</strong></p>
                </CCardBody>
            </CCard>
        </>
    )
}

export default CalendarPopUp;