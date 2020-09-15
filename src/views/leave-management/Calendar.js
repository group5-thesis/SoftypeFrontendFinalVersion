import React from 'react';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = ({ _events, header = true, showHeader = false }) => {
    return (
        <CCard style={{ height: '95%' }}>
            {
                header &&
                <CCardHeader>
                    Calendar View
                </CCardHeader>
            }

            <CCardBody >
                <FullCalendar
                    initialView="dayGridMonth"
                    themeSystem="bootstrap"
                    slotMinWidth='100%'
                    dayMinWidth='100%'
                    monthMode
                    eventOverlap
                    plugins={[dayGridPlugin]}
                    footerToolbar={null}
                    headerToolbar={{
                        right: showHeader && 'prev,next',
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