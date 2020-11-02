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
        user: [4],
        icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
    },
    // Employee module
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Employee Directory'],
        user: [4],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Employee Profile',
        to: '/employees',
        user: [1, 2],
        icon: 'cil-user',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Organization Chart',
        to: '/employee/organization-chart',
        user: [4],
        icon: 'cil-group',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Performance Reviews',
        to: '/employee/performance-review',
        user: [4],
        icon: 'cil-smile-plus',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Departments',
        to: '/employee/departments',
        user: [4],
        icon: 'cil-group',
    },
    // Leave management module
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Leave Management'],
        user: [4],

    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Leave Requests',
        to: '/leave/requests',
        user: [4],
        icon: 'cil-car-alt',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Leave Calendar',
        to: '/leave/calendar',
        user: [4],
        icon: 'cil-calendar',
    },
    //
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Others'],
        user: [4],
    },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Monitoring',
    //     to: '/monitoring',
    //     user: [1],
    //     icon: 'cil-graph',
    // },
    {
        _tag: 'CSidebarNavItem',
        name: 'Tickets',
        to: '/ticket',
        user: [2,4],
        icon: 'cil-graph',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Company Repository',
        to: '/repository',
        user: [4],
        icon: 'cil-folder',
    },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Tasks',
    //     to: '/tasks',
    //     user: 4,
    //     icon: 'cil-task',
    // },

]

