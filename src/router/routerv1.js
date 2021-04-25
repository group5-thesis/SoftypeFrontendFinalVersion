import React from 'react'
const Dashboard = React.lazy(() => import('templates/dashboard/Dashboard'))
const Users = React.lazy(() => import('templates/users/Users'))
const User = React.lazy(() => import('templates/users/User'))
const Events = React.lazy(() => import('templates/events/events'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/users', exact: true, name: 'Users', component: Users },
    { path: '/users/:id', exact: true, name: 'User Details', component: User },
    { path: '/events', exact: true, name: 'Events', component: Events }
]

export default routes