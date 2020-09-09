import React from 'react';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = ({ _events }) => {
    return (
        <CCard style={{ height: '95%' }}>
            <CCardHeader>
                Calendar View
        </CCardHeader>
            <CCardBody >
                <FullCalendar
                    initialView="dayGridMonth"
                    themeSystem="bootstrap"
                    height='100%'
                    plugins={[dayGridPlugin]}
                    footerToolbar={null}
                    headerToolbar={{
                        right: '',
                        center: 'title',
                        left: ''
                    }}
                    events={_events}
                />
            </CCardBody>
        </CCard>
    )
}
export default Calendar;