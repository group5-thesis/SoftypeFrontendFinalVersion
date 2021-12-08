import React, { useState, useEffect } from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CSelect
} from '@coreui/react'
import EmployeeModal from './EmployeeModal';
import { toCapitalize } from 'utils/helpers';
import { NoData } from 'reusable'
import moment from 'moment';
import _ from 'lodash';
import {
    retrieveEmployees
} from "utils/helpers/fetch";

const getBadge = status => {
    switch (status) {
        case 1: return 'success'
        case 0: return 'secondary'
    }
}

const checkIsActive = (status, isActive) => {
    if (status === 'All') {
        return true;
    }

    if (status === 'Active') {
        return isActive === 1;
    }

    if (status === 'Inactive') {
        return isActive === 0;
    }
}
let headers = [
    {
        key: 'name',
        _style: { width: "25%" },
    },
    {
        key: 'mobileno',
        label: "Mobile No.",
        _style: {
            width: "10%",
        },


    },
    {
        key: "role",
        label: "Position",

    },
    { key: 'gender', },
    { key: 'birthdate', },
    { key: 'department_name', label: "Department" },
    { key: 'isActive', label: 'Status', }
]

const Users = (props) => {
    const { history, location } = props
    const user = props.appState.auth.user
    const [status, setStatus] = useState('Active');
    const usersData = props.appState.employee.employees.filter(emp => {
        return (emp.employeeId !== user.employeeId) && (checkIsActive(status, emp.isActive))
    })
    const queryPage = location.search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage);
    const [sort, toggleSort] = useState('asc')
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
                                <h4 className="card-title mb-0">{toCapitalize(status)} {" "}Employees</h4>
                            </CCol>
                            {
                                <CCol sm="7" className="d-none d-md-block">
                                    {user.accountType === 1 && <div className="float-right" >
                                        <EmployeeModal retrieveEmployees={props.retrieveEmployees} />
                                    </div>}
                                    <div className="float-right mr-3" >
                                        <CSelect
                                            custom
                                            className="input-md"
                                            size="md"
                                            value={status}
                                            onChange={(e) => {
                                                setStatus(e.target.value)
                                            }}
                                        >
                                            <option value="All">All</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            )
                                        </CSelect>
                                    </div>
                                </CCol>
                            }
                        </CRow>
                        {/* .filter(item => ) */}
                        <CDataTable
                            items={_.orderBy(usersData, ['lastname'], [sort])}
                            fields={headers}
                            hover
                            itemsPerPage={10}
                            activePage={page}
                            pagination
                            outlined
                            noItemsViewSlot={<NoData />}
                            onPageChange={(e) => {
                                pageChange(e);
                            }}
                            clickableRows
                            onRowClick={(emp) => {
                                history.push(`/employees/profile/${emp.employeeId}`)
                            }}
                            scopedSlots={{
                                'name':
                                    (item) => (
                                        <td>
                                            {`${toCapitalize(item.lastname)}, ${toCapitalize(item.firstname)} ${toCapitalize(item.middlename && item.middlename[0]) + "."}`.toString()}
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
                                                {item.isActive === 1 ? 'Active' : 'Inactive'}
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
