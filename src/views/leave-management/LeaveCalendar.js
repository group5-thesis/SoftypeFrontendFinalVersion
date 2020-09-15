import React from 'react';
import Calendar from './Calendar';
const LeaveCalendar = () => {
  return <Calendar {...{
    header: false,
    showHeader: true
  }} />
}

export default LeaveCalendar;