import React from 'react'
import events from './events'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import views from 'views';
import { CCard, CCardBody } from '@coreui/react';

const localizer = momentLocalizer(moment)


const Basic = ({header}) => {
  const {right=true, left=true, center=true} = header
  return(
    <div>
    <CCard>
      <CCardBody>
        <Calendar
          // header={}
          localizer={localizer}
          // view= {views.month}
          events={events}
          // components={toolbar}
          components = {{toolbar : null}}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 600, backgroundColor: 'white' }}

        />
      </CCardBody>
    </CCard>

   
  </div>
  )
}


export default Basic
