import React from 'react'
// import { momentLocalizer, Views } from 'react-big-calendar'
import events from './events'
// import * as dates from './dates'
// import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import views from 'views';
import { CCard, CCardBody } from '@coreui/react';

const localizer = momentLocalizer(moment)


// let allViews = Object.keys(Views).map(k => Views[k])

// const ColoredDateCellWrapper = ({ children }) =>
//   React.cloneElement(React.Children.only(children), {
//     style: {
//       backgroundColor: 'lightblue'
//     },
//   })

const Basic = ({ header }) => {
  // const localizer =  Calendar.momentLocalizer(moment)
  // return(
  return(
  < div >
    <CCard>
      <CCardBody>
        <Calendar
          localizer={localizer}
          // view= {views.month}
          events={events}

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
        // components={{
        //   timeSlotWrapper: ColoredDateCellWrapper,
        // }}
        // localizer={localizer}


        />
      </CCardBody>
    </CCard>

    {/* <CCard
       events = {events}
    /> */}
  </div >)
}
// }





export default Basic