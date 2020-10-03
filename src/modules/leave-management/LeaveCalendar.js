import React, { Component } from 'react'
import Calendar from './component/Calendar'
class LeaveCalendar extends Component {
  render() {
    return <Calendar {...{
      header: false,
      showHeader: true
    }} />
  }
}
export default LeaveCalendar
