import React, { Component } from 'react'
import Calendar from './Calendar'
class LeaveCalendar extends Component {
  render() {
    return <Calendar {...{
      header: false,
      showHeader: true
    }} />
  }
}
export default React.memo(LeaveCalendar)
