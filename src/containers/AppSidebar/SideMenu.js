import React from 'react'
import CIcon from '@coreui/icons-react'
/**
 * access levels
 * 1 - admin only
 * 2 - managers
 * 3 - regular employee
 * 4 - all
 */

export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        user: 4,
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
        user: 4,
        icon: 'cil-user',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Organization Chart',
        to: '/employee/organization',
        user: 4,
        icon: 'cil-group',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Performance Reviews',
        to: '/employee/performance-review',
        user: 4,
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
        user: 4,
        icon: 'cil-car-alt',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Leave Calendar',
        to: '/leave/calendar',
        user: 4,
        icon: 'cil-calendar',
    },
    // 
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Others'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Monitoring',
        to: '/monitoring',
        user: 4,
        icon: 'cil-graph',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Company Repository',
        to: '/repository',
        user: 4,
        icon: 'cil-folder',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Tasks',
        to: '/tasks',
        user: 4,
        icon: 'cil-task',
    },

]

