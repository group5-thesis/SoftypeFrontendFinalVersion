import React, { useState, useEffect } from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CPagination
} from '@coreui/react'
import EmployeeModal from './EmployeeModal';
import { toCapitalize } from 'utils/helpers';
import { NoData } from 'reusable'


const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
    }
}
let headers = [
    { key: 'Name', _classes: 'font-weight-bold' },
    { key: 'mobileno', label: "Mobile No." },
    'email',
    {
        key: "role",
        label: "Position",
        sorter: false,
        filter: false,
    },
    'gender',
    'birthdate',
    'department'
]

const Users = (props) => {
    const { history, location } = props
    const usersData = props.appState.employee.employees
    const user = props.appState.auth.user
    const queryPage = location.search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)
    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/employees?page=${newPage}`)
    }
    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardBody>
                        <CRow className="mb-2">
                            <CCol sm="5">
                                <h4 className="card-title mb-0">Employees</h4>
                            </CCol>
                            <CCol sm="7" className="d-none d-md-block">
                                <div className="float-right" >
                                    <EmployeeModal />
                                </div>
                            </CCol>
                        </CRow>
                        <CDataTable
                            items={usersData}
                            fields={headers}
                            hover
                            // striped
                            itemsPerPage={10}
                            activePage={page}
                            pagination
                            noItemsViewSlot={<NoData />}
                            onPageChange={(e) => {
                                pageChange(e);
                            }}
                            activePage={page}
                            clickableRows
                            onRowClick={(emp) => {
                                history.push(`/employees/profile/${emp.employeeId}`)

                            }}
                            scopedSlots={{
                                'Name':
                                    (item) => (
                                        <td>
                                            {`${toCapitalize(item.lastname)}, ${toCapitalize(item.firstname)} ${toCapitalize(item.middlename && item.middlename)[0] + "."}`}
                                        </td>
                                    )
                            }}
                        />

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Users
