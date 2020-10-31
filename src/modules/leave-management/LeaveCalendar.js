import React, { Component } from 'react'
import Calendar from 'modules/calendar/Calendar'
class LeaveCalendar extends Component {
  render() {
    return <Calendar {...{
      header: false,
      showHeader: true,
    }} />
  }
}
export default LeaveCalendar
