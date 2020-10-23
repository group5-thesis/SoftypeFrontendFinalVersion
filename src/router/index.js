import React from 'react'
const Dashboard = React.lazy(() => import('modules/dashboard/Dashboard'))
const Employees = React.lazy(() => import('modules/employee/Employees'));
const Employee = React.lazy(() => import('modules/employee/Employee'));
const LeaveRequests = React.lazy(() => import('modules/leave-management/LeaveRequests'))
const LeaveRequest = React.lazy(() => import('modules/leave-management/LeaveRequest'))
const LeaveCalendar = React.lazy(() => import('modules/leave-management/LeaveCalendar'))
const BasicForms = React.lazy(() => import('templates/base/cards/Cards'))
const ListGroup = React.lazy(() => import('templates/base/list-groups/ListGroups'))
// const Upload = React.lazy(() => import('templates/base/forms/Upload'))
// const Cards = React.lazy(() => import('templates/base/cards/Cards'))
// const Calendar = React.lazy(() => import('views/calendar/Calendar'))
const Test =  React.lazy(() => import('modules/test/chart'));
//path = url, 


const routes = [
    { path: '/', exact: true, name: 'Home', user: [4] },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, user: [4] },
    { path: '/employees', exact: true, name: 'Employees', component: Employees, user: [2, 1] },
    { path: '/employees/profile/:id', exact: true, name: 'Employee', component: Employee, user: [2, 1] },
    { path: '/leave/requests', exact: true, name: 'Leave Requests', component: LeaveRequests, user: [4] },
    { path: '/leave/requests/:id', exact: true, name: 'Request Details', component: LeaveRequest, user: [4] },
    { path: '/leave/calendar', exact: true, name: 'Leave Calendar', component: LeaveCalendar, user: [4] },
    { path: '/forms', name: 'Forms', component: BasicForms, user: [4] },
    { path: '/cards', name: 'Cards', component: Test, user: [4] },
    { path: '/repository', name: 'Repository', component: ListGroup, user: [4] },
    // { path: '/calendar', name: 'Calendar', component: Calendar, user: [4] },
    // { path: '/chart', name: 'Organizational Chart', component: Test, user: [4] },
    

]
export default routes