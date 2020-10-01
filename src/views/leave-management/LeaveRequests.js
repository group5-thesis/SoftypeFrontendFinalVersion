import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    CBadge,
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CFormGroup,
    CSelect,
    CLink,
    CPopover,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { checkDateRange, toCapitalize, getAdminResponse, toggleDialog, respondToRequest } from 'utils/helpers';
import {LeaveRequestForm,LeaveRequestFilter} from '.';
import NoData from 'reusable/NoData';
import { ConfirmDialog } from 'reusable';
// import LeaveRequestFilter from './LeaveRequestFilter';
const LeaveRequests = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const queryPage = location.search.match(/page=([0-9]+)/, '')
    const queryStatus = query.get('status')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)
    const [status, setStatus] = useState(queryStatus ? queryStatus : 'All')
    const requestsData = useSelector(state => {
        return state.appState.leave.leave_requests.filter(el => {
            return el.status === status.toLowerCase() || status.toLowerCase() === 'all'
        })
    })
    const [payload, setPayload] = useState({
        id: null,
        status: '',
        statusCode: null,

    })

    const header = [
        {
            key: 'name'
            , _classes: 'font-weight-bold'
        },
        'date from', 'date to', {
            key: 'no of days',
            label: 'Days',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'category',
            sorter: false,
            filter: false
        },
        {
            key: 'reason',
            _style: { width: '20%' },
            sorter: false,
            filter: false
        }, 'status', 'approver',
        {
            key: 'actions',
            label: 'Options',
            sorter: false,
            filter: false
        }

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
        setPage(newPage)
        currentPage !== newPage && goToRoute(newPage, status)
    }

    const handleChange = (e) => {
        setStatus(e.target.value)
        goToRoute(currentPage, e.target.value)
    }

    const goToRoute = (page, status) => {
        history.push(`/leave/requests?page=${page}&status=${status}`)
    }

    const viewRequestInfo = (id) => {
        history.push(`/leave/requests/${id}`)
    }

    return (
        <CRow>
            <CCol xl={12}>
                <ConfirmDialog id="cutom_dialog"  {...{ onConfirm: ()=>{
                    respondToRequest(dispatch , payload)
                }, title: `${payload.statusCode ? 'Approve' : 'Reject'}` }}></ConfirmDialog>
                <CCard>
                    <CCardBody>
                        <CRow>
                            <CCol sm="5">
                                <h4 className="card-title mb-0">{status} Request</h4>
                            </CCol>
                            <CCol sm="7" className="d-none d-md-block">
                                <div className="float-right  mr-3" >
                                    <LeaveRequestForm />
                                </div>
                                <div className="float-right mr-3" >
                                    <LeaveRequestFilter />
                                </div>
                                <div className="float-right mr-3">
                                    <CFormGroup >
                                        <CSelect custom name="status" id="status" onChange={handleChange}>
                                            <option value='' hidden>{status}</option>
                                            <option value="All">All</option>
                                            {
                                                Object.keys(STATUS).map((key) => {
                                                    return <option key={key} value={key}>{key}</option>
                                                })
                                            }
                                        </CSelect>
                                    </CFormGroup>
                                </div>
                            </CCol>
                        </CRow>
                        <CDataTable
                            className="table-responsive"
                            items={requestsData}
                            itemsPerPage={5}
                            fields={header}
                            pagination
                            sorter
                            onPageChange={(e) => {
                                pageChange(e)
                            }}
                            activePage={page}
                            noItemsViewSlot={<NoData />}
                            clickableRows
                            scopedSlots={{
                                'no of days': (item) => (
                                    <td >
                                        {checkDateRange(item['date from'], item['date to'])}
                                    </td>
                                ),
                                'reason':
                                    (item) => (
                                        <td >
                                            <p className="wrap-content-text"> {item.reason}</p>
                                        </td>
                                    ),
                                'status':
                                    (item) => (
                                        <td>
                                            <CBadge color={getBadge(STATUS, item.status)}>
                                                {item.status}
                                            </CBadge>
                                        </td>
                                    ),
                                'actions':
                                    (item) => {
                                        let isPending = item.status.toLowerCase() === "pending";
                                        return (
                                            <td >
                                                <CPopover header="View Details" >
                                                    <CLink onClick={() => viewRequestInfo(item.id)} className="card-header-action">
                                                        <CIcon name="cib-indeed" className="text-dark " />
                                                        {!isPending ? ' View Details' : ''}
                                                    </CLink>
                                                </CPopover>
                                                {
                                                    isPending && [
                                                        {
                                                            header: "Approve",
                                                            code: 1,
                                                            color: "success",
                                                            icon: "check"
                                                        }, {
                                                            header: "Reject",
                                                            code: 0,
                                                            color: "danger",
                                                            icon: "x-circle"
                                                        }
                                                    ].map((el, id) => {
                                                        return (
                                                            <CPopover header={el.header} key={id} >
                                                                <CLink onClick={() => {
                                                                    setPayload({ id: item.id, status: getAdminResponse(el.code), statusCode: el.code })
                                                                    toggleDialog(dispatch)
                                                                }} className="card-header-action">
                                                                    <CIcon name={`cil-${el.icon}`} className={`text-${el.color}`} />
                                                                </CLink>
                                                            </CPopover>
                                                        )
                                                    })
                                                }

                                            </td>
                                        )
                                    },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default LeaveRequests
