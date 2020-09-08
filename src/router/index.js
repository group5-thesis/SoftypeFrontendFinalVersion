import React from 'react';
const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));
const Users = React.lazy(() => import('views/users/Users'));
const User = React.lazy(() => import('views/users/User'));
const Employees = React.lazy(() => import('views/employee/Employees'));
const Employee = React.lazy(() => import('views/employee/Employee'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/users/:id', exact: true, name: 'User Details', component: User },
    { path: '/users', exact: true, name: 'Users', component: Users },
    { path: '/employees', exact: true, name: 'Employees', component: Employees },
    { path: '/employees/profile/:id', exact: true, name: 'Employee', component: Employee },
]

export default routes;