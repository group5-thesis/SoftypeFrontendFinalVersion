import React, { Component } from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import { Modal } from 'reusable'
export default class Calendar extends Component {
  render() {
      let { _events = [{ // this object will be "parsed" into an Event Object
      title: 'The Title', // a property!
      start: '2018-09-01', // a property!
      end: '2018-09-02' // a property! ** see important note below about 'end' **
    }], title = 'staticc event', header = true, showHeader = true, startDate = null } = this.props
    // console.log(_events)
    return (

      <FullCalendar
        themeSystem="bootstrap"
        slotMinWidth='100%'
        dayMinWidth='100%'
        weekends={true}
        defaultDate={_events.length && _events[0]["start"]}
        eventOverlap={title}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        footerToolbar={null}
        dateClick={this.dateHandleClick}
        headerToolbar={
                {
                  left: 'prev,next,today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }
            }
        events={_events}
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
