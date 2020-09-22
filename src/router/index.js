import React from 'react';
const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));
const Employees = React.lazy(() => import('views/employee/Employees'));
const Employee = React.lazy(() => import('views/employee/Employee'));
const LeaveRequests = React.lazy(() => import('views/leave-management/LeaveRequests'));
const LeaveRequest = React.lazy(() => import('views/leave-management/LeaveRequest'));
const LeaveCalendar = React.lazy(() => import('views/leave-management/LeaveCalendar'));
const BasicForms = React.lazy(() => import('views/base/cards/Cards'));
const ListGroup = React.lazy(() => import('views/base/list-groups/ListGroups'));
const Buttons = React.lazy(() => import('views/buttons/buttons/Buttons'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/employees', exact: true, name: 'Employees', component: Employees },
    { path: '/employees/profile/:id', exact: true, name: 'Employee', component: Employee },
    { path: '/leave/requests', exact: true, name: 'Leave Requests', component: LeaveRequests },
    { path: '/leave/requests/:id', exact: true, name: 'Request Details', component: LeaveRequest },
    { path: '/leave/calendar', exact: true, name: 'Leave Calendar', component: LeaveCalendar },
    { path: '/forms', name: 'Forms', component: BasicForms },
    { path: '/buttons', name: 'Buttons', component: Buttons },
    { path: '/repository', name: 'Repository', component: ListGroup },

]

export default routes;