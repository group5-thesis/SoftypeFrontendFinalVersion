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
import moment from 'moment';
import _ from 'lodash';


const getBadge = status => {
    switch (status) {
        case 1: return 'success'
        case 0: return 'secondary'
    }
}
let headers = [
    { key: 'Name', _classes: 'font-weight-bold', _style: { width: "20%" }, },
    {
        key: 'mobileno', label: "Mobile No.", _style: { width: "10%" },
        sorter: false,
        filter: false,
    },
    // { key: 'email', _style: { width: "10%" } },
    {
        key: "role",
        label: "Position",
        sorter: false,
        filter: false,
    },
    'gender',
    'birthdate',
    { key: 'department_name', label: "Department" },
    { key: 'isActive', label: 'Status' }
]

const Users = (props) => {
    const { history, location } = props
    const user = props.appState.auth.user
    const usersData = props.appState.employee.employees.filter(emp => emp.employeeId !== user.employeeId)
    const queryPage = location.search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)
    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/employees?page=${newPage}`)
    }
    useEffect(() => {

        console.log("v1.0")
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
                            {
                                user.accountType === 1 ?
                                    <CCol sm="7" className="d-none d-md-block">
                                        <div className="float-right" >
                                            <EmployeeModal retrieveEmployees={props.retrieveEmployees} />
                                        </div>
                                    </CCol>
                                    : ""
                            }
                        </CRow>
                        <CDataTable
                            items={_.orderBy(usersData, ['lastname'], ['asc'])}
                            fields={headers}
                            hover
                            sorter
                            itemsPerPage={10}
                            activePage={page}
                            pagination
                            noItemsViewSlot={<NoData />}
                            onPageChange={(e) => {
                                pageChange(e);
                            }}
                            clickableRows
                            onRowClick={(emp) => {
                                history.push(`/employees/profile/${emp.employeeId}`)
                            }}
                            scopedSlots={{
                                'Name':
                                    (item) => (
                                        <td>
                                            {`${toCapitalize(item.lastname)}, ${toCapitalize(item.firstname)} ${toCapitalize(item.middlename && item.middlename[0]) + "."}`}
                                        </td>
                                    ),
                                'department_name':
                                    (item) => {
                                        return (
                                            <td>
                                                {item.department_name ? item.department_name : item.department_nameM ? item.department_nameM : item.department_nameH ? item.department_nameH : <em>UNSET</em>}
                                            </td>
                                        )
                                    },
                                'gender':
                                    (item) => {
                                        return (
                                            <td>
                                                {item['gender'][0].toUpperCase()}
                                            </td>
                                        )
                                    },
                                'birthdate':
                                    (item) => {
                                        return (
                                            <td>
                                                {moment(item['birthdate']).format("MM-DD-YY")}
                                            </td>
                                        )
                                    },
                                'isActive':
                                    (item) => (
                                        <td>
                                            <CBadge color={getBadge(item.isActive)}>
                                                {item.isActive === 1 ? 'active' : 'inactive'}
                                            </CBadge>
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
