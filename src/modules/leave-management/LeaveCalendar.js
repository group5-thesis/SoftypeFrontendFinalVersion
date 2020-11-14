import React, { useState, useEffect } from 'react'
import Calendar from 'modules/calendar/Calendar'
import { CURRENT_MONTH, CURRENT_YEAR } from "utils/constants/constant";
import api from 'utils/api';
import { useDispatch } from 'react-redux';
import { plotArray } from 'utils/helpers';
import { ActionTypes, actionCreator } from 'utils/actions';
const LeaveCalendar = () => {
  const [events, setEvents] = useState([])
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [year, setYear] = useState(CURRENT_YEAR)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const getEvents = async () => {
    let payload = {
      month,
      year,
      status: 'All',
      category: 'All',
      roleId: 1,
    }
    setIsLoading(true)
    let res = await api.post("/filterLeaveRequest", payload);
    setIsLoading(false)
    if (!res.error) {
      let { leave_requests } = res.data;
      if (leave_requests.length) {
        let formattedArray = leave_requests.map(request => {
          let { name, category, date_from, date_to, reason } = request;
          return {
            id: 0,
            employee: name,
            category,
            reason: reason,
            title: `${name} : ${category} `,
            allDay: true,
            date_from,
            date_to,
            start: new Date(date_from),
            end: new Date(date_to),
          }
        })
        setEvents(formattedArray)
      }
    } else {
      dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: 'error', message: "Error in fetching data" }));
    }
  }
  useEffect(() => {
    getEvents()
  }, [year, month]);
  return <Calendar  {...{
    events,
    isLoading,
    onMonthChange: setMonth,
    onYearChange: setYear
  }} />
}

export default LeaveCalendar
