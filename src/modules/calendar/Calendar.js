import React from 'react'
<<<<<<< HEAD
import events from './events'
=======
// import { momentLocalizer, Views } from 'react-big-calendar'
import _events from './events'
import CalendarToolbar from './CalendarToolbar';
>>>>>>> f11a8a596a0923489be51ed1b27efbe90875cc40
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { CCard, CCardBody } from '@coreui/react';
const localizer = momentLocalizer(moment)
const MyCalendar = ({ header = { right: true, left: true, center: true }, events = [], style = { height: 500 } }) => {
  return (
    < div >
      <CCard>
        <CCardBody>
          <Calendar
            localizer={localizer}
            events={events.length ? events : _events}
            popup
            startAccessor='start'
            endAccessor='end'
            style={style}

            // events={events}
            // culture = 'en-GB'
            // views={allViews}
            // step={60}
            // showMultiDayTimes
            // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            defaultDate={events.length && events[0]['start']}
            components={{
              toolbar: (rest) => <CalendarToolbar {...rest} {...{ header }} />,
            }}
          />
        </CCardBody>
      </CCard>
    </div >)
}


export default MyCalendar
