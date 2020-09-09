import React, { useState } from 'react';
import { CBadge, CButton, CCollapse, CCardBody, CDataTable } from '@coreui/react';
import mockData from './LeaveRequestData'

export default function () {
    const usersData = mockData
    const header = [
        { key: 'name', _classes: 'font-weight-bold' },
        'date from', 'date to', 'no of days', 'category', 'reason', 'status', 'approver'
    ]

    const getBadge = (status) => {
        switch (status) {
            case 'Active': return 'success'
            case 'Inactive': return 'secondary'
            case 'Pending': return 'warning'
            case 'Banned': return 'danger'
            default: return 'primary'
        }
    }

    return (
        <CDataTable
            items={usersData}
            fields={header}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots={{
                'status':
                    (item) => (
                        <td>
                            <CBadge color={getBadge(item.status)}>
                                {item.status}
                            </CBadge>
                        </td>
                    ),

            }}
        />
    )
};