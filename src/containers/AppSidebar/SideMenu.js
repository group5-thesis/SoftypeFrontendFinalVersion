import React from 'react'
import CIcon from '@coreui/icons-react'
import { mdiHammerScrewdriver, mdiViewDashboard, mdiFamilyTree, mdiAccountCog } from '@mdi/js';/**
 * access levels
 * 1 - admin only
 * 2 - managers
 * 3 - regular employee
 * 4 - all
 */

const generateIcon = (path) => {
    return `<svg viewBox="0 0 24 24" role="presentation" ><path d="${path}" /></svg>`
}

const customIcon = path => {
    return <CIcon content={generateIcon(path)} customClasses="c-sidebar-nav-icon" />
}
export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        user: [4],
        icon: customIcon(mdiViewDashboard)
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
        icon: customIcon(mdiFamilyTree),
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
    {
        _tag: 'CSidebarNavItem',
        name: 'Office Equipment Requests',
        to: '/requests',
        user: [2, 4],
        icon: customIcon(mdiHammerScrewdriver)
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Company Repository',
        to: '/repository',
        user: [4],
        icon: 'cil-folder',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'My Account',
        to: '/myAccount',
        user: [4],
        icon: customIcon(mdiAccountCog)
    },

]

