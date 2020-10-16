import React, { Component } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
export default class Calendar extends Component {
  render() {
    let { _events = [], header = true, showHeader = false } = this.props
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
            themeSystem="bootstrap"
            slotMinWidth='100%'
            dayMinWidth='100%'
            weekends
            eventOverlap
            plugins={[dayGridPlugin]}
            footerToolbar={null}
            headerToolbar={{
              right: showHeader && 'prev,next',
              center: 'title',
              left: ''
            }}
            events={_events}
          />
        </CCardBody>
      </CCard>
    )
  }
}