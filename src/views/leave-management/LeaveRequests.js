import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CFormGroup,
    CSelect,
    CLabel,
    CAlert,
    CForm,
    CInput
} from '@coreui/react'

import mockData from './LeaveRequestData'

import { checkDateRange, toCapitalize, insertProperty, plotArray, renameKey } from 'utils/helpers';
import LeaveFormRequest from './LeaveRequestForm';
import NoData from 'reusable/NoData';
const Users = () => {
    const history = useHistory()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const queryPage = location.search.match(/page=([0-9]+)/, '')
    const queryStatus = query.get('status')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)
    const [status, setStatus] = useState(queryStatus ? queryStatus : 'All')
    const [requestsData, setRequestsData] = useState(mockData)
    const header = [
        { key: 'name', _classes: 'font-weight-bold' },
        'date from', 'date to', 'no of days', 'category', 'reason', 'status', 'approver'
    ]

    const STATUS = {
        'Pending': 'primary',
        'Approved': 'success',
        'Rejected': 'danger',
        'Cancelled': 'warning'
    }

    const getBadge = (STATUS, status) => {
        return STATUS[toCapitalize(status)];
    }

    const pageChange = newPage => {
        currentPage !== newPage && goToRoute(newPage, status)
    }

    const handleChange = (e) => {
        setStatus(e.target.value)
        goToRoute(currentPage, e.target.value)
    }

    const computedData = React.useMemo(
        () =>
            requestsData.filter((data) => {
                return data.status.toLocaleLowerCase() == status.toLocaleLowerCase() || status.toLowerCase() === 'all'
            }),
        [status]
    );

    const goToRoute = (page, status) => {
        history.push(`/leave/requests?page=${page}&status=${status}`)
    }

    const addRequest = (request) => {
        request = insertProperty(request, 'id', requestsData.length + 1, 0)
        let arrCopy = requestsData;
        arrCopy.push(renameKey(request))
        arrCopy = plotArray(arrCopy)
        setRequestsData(arrCopy)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    return (
        <CRow>
            <CCol xl={12}>
                <CRow>
                    <CCol xl={12}>
                        <CAlert color="info" closeButton>
                            Click the row to show the full information.
                </CAlert>
                    </CCol>
                </CRow>
                <CCard>

                    <CCardHeader>

                        {status} Requests
                        <div className="card-header-actions">
                            <CForm inline >
                                <CFormGroup >
                                    <CSelect custom name="status" id="status" onChange={handleChange}>
                                        <option value='' hidden>{status}</option>
                                        <option value="All">All</option>
                                        <option value={Object.keys(STATUS)[0]}>Pending</option>
                                        <option value={Object.keys(STATUS)[1]}>Approved</option>
                                        <option value={Object.keys(STATUS)[2]}>Rejected</option>
                                        <option value={Object.keys(STATUS)[3]}>Cancelled</option>
                                    </CSelect>
                                </CFormGroup>
                            </CForm>
                        </div>
                        <LeaveFormRequest {...{ onSubmit: addRequest }} />
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={requestsData}
                            fields={header}
                            itemsPerPageSelect
                            hover
                            pagination
                            onPagesChange={(e)=>{
                                console.log(e)
                            }}
                            striped
                            activePage={page}
                            noItemsViewSlot={<NoData />}
                            clickableRows
                            onRowClick={(item) => history.push(`/leave/requests/${item.id}`)}
                            scopedSlots={{
                                'no of days': (item) => (
                                    <td >
                                        {checkDateRange(item['date from'], item['date to'])}
                                    </td>
                                ),
                                'reason':
                                    (item) => (
                                        <td >
                                            <p className="wrap-content-text"> {item.description}</p>
                                        </td>
                                    ),
                                'status':
                                    (item) => (
                                        <td>
                                            <CBadge color={getBadge(STATUS, item.status)}>
                                                {item.status}
                                            </CBadge>
                                        </td>
                                    )
                            }}
                        />
                        {/* <CPagination
                            activePage={page}
                            onActivePageChange={pageChange}
                            pages={Math.ceil(requestsData.length / 5)}
                            doubleArrows={false}
                            align="center"
                        /> */}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Users
