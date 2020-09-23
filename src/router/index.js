import React from 'react'
const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'))
const Users = React.lazy(() => import('views/users/Users'))
const User = React.lazy(() => import('views/users/User'))
const LeaveRequests = React.lazy(() => import('views/leave-management/LeaveRequests'))
const LeaveRequest = React.lazy(() => import('views/leave-management/LeaveRequest'))
const LeaveCalendar = React.lazy(() => import('views/leave-management/LeaveCalendar')) 
const BasicForms = React.lazy(() => import('templates/base/cards/Cards'))
const ListGroup = React.lazy(() => import('templates/base/list-groups/ListGroups'))
const Cards = React.lazy(() => import('templates/base/cards/Cards')) 
const Calendar = React.lazy(() => import('views/calendar/Calendar')) 

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/employees', exact: true, name: 'Employees', component: Users },
    { path: '/employees/profile/:id', exact: true, name: 'Profile', component: User },
    { path: '/leave/requests', exact: true, name: 'Leave Requests', component: LeaveRequests },
    { path: '/leave/requests/:id', exact: true, name: 'Request Details', component: LeaveRequest },
    { path: '/leave/calendar', exact: true, name: 'Leave Calendar', component: LeaveCalendar },
    { path: '/forms', name: 'Forms', component: BasicForms },
    { path: '/cards', name: 'Cards', component: Cards },
    { path: '/repository', name: 'Repository', component: ListGroup },
    { path: '/calendar', name: 'Calendar', component: Calendar },

]

export default routes