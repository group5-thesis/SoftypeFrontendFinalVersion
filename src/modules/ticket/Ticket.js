import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CBadge, CCard, CCardBody, CCol, CDataTable, CRow, CButton, CSelect } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Modal, ConfirmDialog, NoData } from "reusable";
import { ActionTypes, actionCreator } from 'utils/actions';
import { TICKET_STATUS, CURRENT_MONTH, CURRENT_YEAR } from "utils/constants/constant";
import { renameKey, dispatchNotification, toCapitalize } from 'utils/helpers';
import TicketFilter from "./component/TicketFilter";
import TicketForm from "./component/TicketForm";
import TicketDetails from "./component/TicketDetailsV1";
import api from 'utils/api'
import { config } from 'utils/config'
import _ from 'lodash';
import { fetchTickets } from 'utils/helpers/fetch';


const Ticket = (props) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("All");
  const [collapse, setCollapse] = useState(true);
  const [tickets, setTickets] = useState();
  const [clickedRejectBtn, setClickedRejectBtn] = useState(false);
  const [clickedApproveBtn, setClickedApproveBtn] = useState(false);
  const [clickedDeleteBtn, setClickedDeleteBtn] = useState(false);
  const [now, setNow] = useState(new Date)
  const [loading, setLoading] = useState(false)
  const [ticketFilter, setTicketFilter] = useState("emp_request")

  const default_filter = {
    year: CURRENT_YEAR,
    month: CURRENT_MONTH,
    status: 'All'
  }
  const [filter, setFilter] = useState(default_filter)
  const modal = useRef();
  const dialog = useRef();
  const user = useSelector(state => {
    let authed = state.appState.auth.user;
    return {
      firstname: authed.firstname,
      lastname: authed.lastname,
      employeeId: authed.employeeId,
      userId: authed.userId,
      accountType: authed.accountType
    }
  })
  const fields = [
    { key: 'date requested', _style: { width: '15%' } },
    { key: 'transaction no', label: 'request no.' },
    { key: 'name', label: 'Requestor', _style: { width: '15%' } },
    { key: 'item', _style: { width: '15%' } },
    { key: 'price' },
    { key: 'quantity' },
    { key: 'total price', label: 'Total' },
    { key: 'status' },
    { key: 'date needed' }
  ]
  const requestsData = useSelector((state) => {
    return state.appState.ticket.ticket_requests
  });

  const [filteredTicketRequest, setFilteredTicketRequest] = useState();

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const getBadge = (STATUS, status) => {
    return STATUS[status];
  };

  const toggleModal = (e) => {
    setTickets(e);
    modal.current.toggle();

  };

  const rejectRequestBtn = () => {
    setClickedRejectBtn(true)
    modal.current.toggle();
    dialog.current.toggle();
  }

  const approveRequestBtn = () => {
    setClickedApproveBtn(true)
    modal.current.toggle();
    dialog.current.toggle();
  }

  const deleteRequestBtn = () => {
    setClickedDeleteBtn(true)
    modal.current.toggle();
    dialog.current.toggle();
  }

  const onConfirm = async () => {
    let data = {
      officeRequestId: tickets.id,
      employeeId: user.employeeId,
      indicator: clickedApproveBtn ? 1 : clickedRejectBtn ? 0 : 0
    }
    dispatchNotification(dispatch, { type: 'info', message: "Please wait" })
    let res = await api.post("/close_officeRequest", data)
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.CLOSE_TICKET, renameKey(res.data.officeRequest_information[0])))
      fetchTickets(dispatch)
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setClickedApproveBtn(false)
    setClickedDeleteBtn(false)
    setClickedRejectBtn(false)
  }

  const onDelete = async () => {
    let res = await api.post("/delete_officeRequest", { id: tickets.id })
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.DELETE_TICKET), tickets.id)
      fetchTickets(dispatch)
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setClickedApproveBtn(false)
    setClickedDeleteBtn(false)
    setClickedRejectBtn(false)
  }

  const onClearFilter = () => {
    setFilter(default_filter)
    setFilteredTicketRequest(requestsData)
  }

  useEffect(() => {
    setFilteredTicketRequest(requestsData)
  }, [requestsData]);

  return (
    <CRow>
      <CCol xl={12}>
        <ConfirmDialog
          ref={dialog}
          {...{
            show: dialog,
            centered: true,
            onConfirm: clickedDeleteBtn ? onDelete : onConfirm,
            title: `${clickedApproveBtn ? "Approve" : clickedRejectBtn ? "Reject" : clickedDeleteBtn ? "Delete" : ""} request?`,
            onCloseCallback: () => {
              modal.current.toggle();
              setClickedApproveBtn(false)
              setClickedRejectBtn(false)
              setClickedDeleteBtn(false)
            }
          }}
        ></ConfirmDialog>
        <Modal
          ref={modal}
          centered
          title="Request Details"
          modalOnClose={toggleModal}
          hidden
          closeButton
          footer={
            (tickets && tickets.status === 1) && user.accountType === 1 ?
              <>
                <CButton color="success" onClick={() => {
                  approveRequestBtn()
                }}>Approve</CButton>
                <CButton color="danger" onClick={() => {
                  rejectRequestBtn()
                }}>Reject</CButton>
              </>
              : user.accountType === 2 || user.accountType === 3 ?
                <>
                  <CButton color="danger" onClick={() => {
                    deleteRequestBtn()
                  }}>Delete Request</CButton>
                  <CButton color="primary" onClick={() => {
                    // deleteRequestBtn()
                  }}>Edit Request</CButton>
                </>
                : ""
          }
          hideCancelButton
        >
          <TicketDetails
            {...tickets}
          />
        </Modal>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                {
                  user.accountType !== 1 ?
                    <h4 className="card-title mb-0">{Number(status) === 1 ? 'Open' : status === 'All' ? status : 'Closed'} Requests</h4> :
                    <CSelect
                      custom
                      className="input-md"
                      size="md"
                      name="ticketfilter"
                      id="ticketfilter"
                      value={ticketFilter}
                      onChange={(e) => {
                        setTicketFilter(e.target.value)
                      }}
                    >
                      <option value="emp_request">
                        {"Employee Office Requests"}
                      </option>
                      <option value="my_request">{"My Office Requests"}</option>
                      )}
                </CSelect>
                }
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                {
                  // user.roleId > 1 &&
                  <div className="float-right  mr-3">
                    <TicketForm />
                  </div>
                }
                <div className={`float-right mr-3 ${!collapse && "mb-2"}`} >
                  <CButton
                    color={`${collapse ? "secondary" : "primary"}`}
                    onClick={toggle}
                    className={"mb-1"}
                  >
                    {collapse ? "Hide" : "Show "} Filter
                    <CIcon
                      size={"sm"}
                      name={`${
                        !collapse ? "cil-chevron-bottom" : "cil-chevron-top"
                        }`}
                    />
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <TicketFilter
                  {...{
                    show: collapse,
                    onStatusChange: handleChange,
                    filter: filter,
                    onClearFilter
                  }} />
              </CCol>
            </CRow>
            <CDataTable
              items={user.accountType === 1 ? filteredTicketRequest : user.accountType === 3 || user.accountType === 2 ? _.filter(filteredTicketRequest, ['requestor', user.employeeId]) : []}
              fields={fields}
              itemsPerPage={5}
              hover
              pagination
              onRowClick={toggleModal}
              clickableRows
              noItemsViewSlot={<NoData />}
              scopedSlots={{
                'requestor':
                  (item) => (
                    <td>
                      {toCapitalize(item['requestor'])}
                    </td>
                  ),
                'date requested':
                  (item) => (
                    <td>
                      {item['date requested']}
                    </td>
                  ),
                'status': (item) => (
                  <td>
                    <CBadge color={getBadge(TICKET_STATUS, item.status)}>
                      {item.status === 1 ? "Open" : "Closed"}
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

export default Ticket;
