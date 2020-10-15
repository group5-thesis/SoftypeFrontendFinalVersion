import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
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

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const Users = () => {   
    const usersData = useSelector(state => {
        return state.appState.employee.employees
    })
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
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
                        <CRow>
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
                            fields={[
                              { key: 'firstname', _classes: 'font-weight-bold' },
                              'lastname', 'middlename','role','department', 'gender', 'mobile number', 'birthdate', 'email', 'street', 'city', 'country'
                             ]}
                            hover
                            striped
                            itemsPerPage={5}
                            activePage={page}
                            pagination
                            onPageChange={(e) => {
                                pageChange(e);
                              }}
                              activePage={page}
                            clickableRows
                            onRowClick={(item) => history.push(`/employees/profile/${item.id}`)}
                            scopedSlots={{
                                'status':
                                    (item) => (
                                        <td>
                                            <CBadge color={getBadge(item.status)}>
                                                {item.status}
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
