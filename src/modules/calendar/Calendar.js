import React from 'react'
// import { momentLocalizer, Views } from 'react-big-calendar'
import _events from './events'
import CalendarToolbar from './CalendarToolbar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { CCard, CCardBody } from '@coreui/react';
const localizer = momentLocalizer(moment)
const MyCalendar = ({ header = { right: true, left: true, center: true }, events = [] }) => {
  return (
    < div >
      <CCard>
        <CCardBody>
          <Calendar
            localizer={localizer}
            // view= {views.month}
            events={events}
            popup
            startAccessor='start'
            endAccessor='end'
            style={{ height: 600, backgroundColor: 'white' }}

            // events={events}
            // culture = 'en-GB'
            // views={allViews}
            // step={60}
            // showMultiDayTimes
            // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            // defaultDate={new Date(2015, 3, 1)}
            components={{
              toolbar: (rest) => <CalendarToolbar {...rest} {...{ header }} />,
            }}
          />
        </CCardBody>
      </CCard>
    </div >)
}
// }





export default MyCalendar
