import React, { Component } from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid'
import { Modal } from 'reusable'
export default class Calendar extends Component {


  render() {
      let { _events = [], title = 'staticc event', header = true, showHeader = true, startDate = null } = this.props
    // console.log(_events)
    return (

      <FullCalendar
        themeSystem="bootstrap"
        slotMinWidth='100%'
        dayMinWidth='100%'
        weekends={true}
        // defaultDate={_events.length && _events[0]["start"]}
        // eventOverlap={title}
        plugins={[dayGridPlugin, interactionPlugin]}
        footerToolbar={null}
        dateClick={this.dateHandleClick}
        headerToolbar={{
          right: showHeader && 'prev,next',
          center: 'title',
          left: ''
        }}
        // events={_events}
      />
    )
  }

  dateHandleClick = () => {
    // alert(arg.dateStr)
    var dateStr = prompt('Enter a date in YYYY-MM-DD format');
    var date = new Date(dateStr + 'T00:00:00');

    if (!isNaN(date.valueOf())) {
      FullCalendar.eventOverlap({
        title: 'dynamic event',
        start: date,
        allDay: true
      });
      alert('Done...');
    } else {
      alert('Invalid date.');
    }

  }
}
