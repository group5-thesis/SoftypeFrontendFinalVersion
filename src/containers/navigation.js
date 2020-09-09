import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
    },
    // Employee module
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Employee Directory'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Employee Profile',
        to: '/employees',
        icon: 'cil-user',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Organization Chart',
        to: '/employee/organization',
        icon: 'cil-group',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Performance Reviews',
        to: '/employee/performance-review',
        icon: 'cil-smile-plus',
    },
    // Leave management module
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Leave Management'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Leave Requests',
        to: '/leave/requests',
        icon: 'cil-car-alt',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Leave Calendar',
        to: '/leave/calendar',
        icon: 'cil-calendar',
    },
    // 
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Others'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Company Repository',
        to: '/repository',
        icon: 'cil-folder',
    },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Leave Calendar',
    //     to: '/leave/calendar',
    //     icon: 'cil-calendar',
    // },

]

