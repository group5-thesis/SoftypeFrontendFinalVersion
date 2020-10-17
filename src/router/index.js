import React from 'react'
const Dashboard = React.lazy(() => import('modules/dashboard/Dashboard'))
const Employees = React.lazy(() => import('modules/employee/Employees'));
const Employee = React.lazy(() => import('modules/employee/Employee'));
const LeaveRequests = React.lazy(() => import('modules/leave-management/LeaveRequests'))
const LeaveRequest = React.lazy(() => import('modules/leave-management/LeaveRequest'))
const LeaveCalendar = React.lazy(() => import('modules/leave-management/LeaveCalendar'))
const BasicForms = React.lazy(() => import('templates/base/cards/Cards'))
const ListGroup = React.lazy(() => import('templates/base/list-groups/ListGroups'))
const Upload = React.lazy(() => import('templates/base/forms/Upload'))
const Cards = React.lazy(() => import('templates/base/cards/Cards'))
const Calendar = React.lazy(() => import('modules/calendar/Calendar'))
const Ticket = React.lazy(() => import('modules/ticket/Ticket'))
const PerformanceReview = React.lazy(() => import('modules/performance-review/PerformanceReview'))
const Departments = React.lazy(() => import('modules/departments/Departments'))

/**
 * access levels
 * 1 - admin only
 * 2 - managers
 * 3 - regular employee
 * 4 - all
 */
const routes = [
    { path: '/', exact: true, name: 'Home', user: [4] },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, user: [4] },
    { path: '/employees', exact: true, name: 'Employees', component: Employees, user: [2, 1] },
    { path: '/employees/profile/:id', exact: true, name: 'Employee', component: Employee, user: [2, 1] },
    { path: '/leave/requests', exact: true, name: 'Leave Requests', component: LeaveRequests, user: [4] },
    { path: '/leave/requests/:id', exact: true, name: 'Request Details', component: LeaveRequest, user: [4] },
    { path: '/leave/calendar', exact: true, name: 'Leave Calendar', component: LeaveCalendar, user: [4] },
    { path: '/forms', name: 'Forms', component: BasicForms, user: [4] },
    { path: '/cards', name: 'Cards', component: Cards, user: [4] },
    { path: '/repository', name: 'Repository', component: ListGroup, user: [4] },
    { path: '/calendar', name: 'Calendar', component: Calendar, user: [4] },
    { path: '/upload', name: 'Upload', component: Upload, user: [4] },
    { path: '/ticket', exact: true, name: 'Ticket', component: Ticket, user: [4] },
    { path: '/employee/performance-review', exact: true, name: 'PerformanceReview', component: PerformanceReview, user: [4] },
    { path: '/employee/departments', exact: true, name: 'Departments', component: Departments, user: [4] }

]

export default routes
