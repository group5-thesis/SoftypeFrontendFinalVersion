import React from 'react';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = ({ _events, header = true }) => {
    return (
        <CCard style={{ height: '95%' }}>
            {
                header  && 
                <CCardHeader>
                    Calendar View
                </CCardHeader>
            }

            <CCardBody >
                <FullCalendar
                    initialView="dayGridMonth"
                    themeSystem="bootstrap"
                    slotMinWidth='100%'
                    eventOverlap
                    plugins={[dayGridPlugin]}
                    footerToolbar={null}
                    headerToolbar={{
                        right: '',
                        center: 'title',
                        left: ''
                    }}
                    events={_events ? _events : []}
                />
            </CCardBody>
        </CCard>
    )
}
export default Calendar;