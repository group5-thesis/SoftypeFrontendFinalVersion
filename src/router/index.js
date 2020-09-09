import React from 'react';
const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));
const Users = React.lazy(() => import('views/users/Users'));
const User = React.lazy(() => import('views/users/User'));
const LeaveRequests = React.lazy(() => import('views/leave-management/LeaveRequests'));
const LeaveRequest = React.lazy(() => import('views/leave-management/LeaveRequest'));
const BasicForms = React.lazy(() => import('views/base/cards/Cards'));
const Buttons = React.lazy(() => import('views/buttons/buttons/Buttons'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/employees', exact: true, name: 'Employees', component: Users },
    { path: '/employees/profile/:id', exact: true, name: 'Profile', component: User },
    { path: '/leave/requests', exact: true, name: 'Leave Requests', component: LeaveRequests },
    { path: '/leave/requests/:id', exact: true, name: 'Request Details', component: LeaveRequest },
    { path: '/forms', name: 'Forms', component: BasicForms },
    { path: '/buttons', name: 'Buttons', component: Buttons },

]

export default routes;