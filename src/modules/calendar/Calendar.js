import React, { useRef, useState } from 'react'
import { CCard, CCardBody, CAlert } from '@coreui/react';
import CalendarToolbar from './CalendarToolbar';
import CalendarPopUp from './CalendarPopUp';
import { Modal } from 'reusable'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
const localizer = momentLocalizer(moment)
const MyCalendar = ({
  header = { right: true, left: true },
  events = [],
  style = { height: 500 },
  onYearChange,
  onMonthChange,
  isLoading = false }) => {
  const modal = useRef();
  const [selected, setSelected] = useState()
  return (
    <div >
      <Modal {...{
        title: 'Leave Request Detais',
        centered: true,
        closeButton: true,
        hideCancelButton: true,
        hidden: true,
        size:'sm'
      }} ref={modal}>
        <CalendarPopUp event={selected} />
      </Modal>
      <CCard>
        {
          isLoading && <CAlert color="info">Approved will be loaded soon. Please wait.</CAlert>
        }
        <CCardBody>
          <Calendar
            localizer={localizer}
            events={events}
            popup
            startAccessor='start'
            endAccessor='end'
            selectable
            style={style}
            defaultDate={events.length ? events[0]['start'] : new Date(Date.now())}
            onSelectEvent={event => {
              setSelected(event);
              modal.current.toggle();
            }}
            components={{
              toolbar: (rest) => <CalendarToolbar {...rest} {...{ header, onMonthChange, onYearChange }} />,
            }}
          />
        </CCardBody>
      </CCard>
    </div >)
}


export default MyCalendar
