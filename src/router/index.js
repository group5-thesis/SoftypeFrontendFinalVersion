import React from 'react'
const Dashboard = React.lazy(() => import('modules/dashboard/Dashboard'))
const Employees = React.lazy(() => import('modules/employee/Employees'));
const Employee = React.lazy(() => import('modules/employee/Employee'));
const LeaveRequests = React.lazy(() => import('modules/leave-management/LeaveRequests'))
const LeaveRequest = React.lazy(() => import('modules/leave-management/LeaveRequest'))
const LeaveCalendar = React.lazy(() => import('modules/leave-management/LeaveCalendar'))
const BasicForms = React.lazy(() => import('templates/base/cards/Cards'))
// const Upload = React.lazy(() => import('templates/base/forms/Upload'))
// const Cards = React.lazy(() => import('templates/base/cards/Cards'))
// const Calendar = React.lazy(() => import('views/calendar/Calendar'))
const Test = React.lazy(() => import('modules/test/chart'));

const Repository = React.lazy(() => import('modules/repository/Repositoryv1'))
const RepositoryFiles = React.lazy(() => import('modules/repository/RepositoryFiles'))
const Upload = React.lazy(() => import('templates/base/forms/Upload'))
const Cards = React.lazy(() => import('templates/base/cards/Cards'))
<<<<<<< HEAD
const Calendar = React.lazy(() => import('modules/calendar/Calendar'))
const Ticket = React.lazy(() => import('modules/ticket/Ticket'))
const PerformanceReview = React.lazy(() => import('modules/performance-review/PerformanceReview'))
const Departments = React.lazy(() => import('modules/departments/Departments'))
const Department = React.lazy(() => import('modules/departments/component/Department'))

/**
 * access levels
 * 1 - admin only
 * 2 - managers
 * 3 - regular employee
 * 4 - all
 */
=======
const Calendar = React.lazy(() => import('views/calendar/Calendar'))
const Test =  React.lazy(() => import('views/test/fileupload'));
//path = url, 
>>>>>>> gogoo
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
    { path: '/repository', exact:true, name: 'Repository', component: Repository, user: [4] },
    { path: '/repository/:type', exact:true, name: 'Files', component: RepositoryFiles, user: [4] },
    // { path: '/calendar', name: 'Calendar', component: Calendar, user: [4] },
    // { path: '/chart', name: 'Organizational Chart', component: Test, user: [4] },
    { path: '/cards', name: 'Cards', component: Cards, user: [4] },
    { path: '/calendar', name: 'Calendar', component: Calendar, user: [4] },
<<<<<<< HEAD
    { path: '/upload', name: 'Upload', component: Upload, user: [4] },
    { path: '/ticket', exact: true, name: 'Ticket', component: Ticket, user: [4] },
    { path: '/employee/departments', exact: true, name: 'Departments', component: Departments, user: [4] }
=======
    { path: '/upload', name: 'FIle Upload', component: Test, user: [4] },
>>>>>>> gogoo

]

export default routes
