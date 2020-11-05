import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CBadge, CCard, CCardBody, CCol, CDataTable, CRow, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Modal, ConfirmDialog, NoData } from "reusable";
import { ActionTypes, actionCreator } from 'utils/actions';
import { TICKET_STATUS } from "utils/constants/constant";
import { renameKey } from 'utils/helpers';
import TicketFilter from "./component/TicketFilter";
import TicketForm from "./component/TicketForm";
import TicketDetails from "./component/TicketDetails";
import api from 'utils/api'


const Ticket = (props) => {

  const dispatch = useDispatch();

  const [status, setStatus] = useState("All");
  const [collapse, setCollapse] = useState(true);
  const [tickets, setTickets] = useState();
  const [remarks, setRemarks] = useState();
  const [ticketsDisplay, setTicketsDisplay] = useState();
  const [now, setNow] = useState(new Date)

  const default_filter = {
    year: now.getFullYear(),
    month: now.getMonth(),
    status: status
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
      userId: authed.userId
    }
  })

  const fields = [
    { key: 'transaction no', label: 'request no.' },
    { key: 'date requested', _style: { width: '15%' } },
    { key: 'name', label: 'Requestor', _style: { width: '15%' } },
    { key: 'item', _style: { width: '15%' } },
    { key: 'price' },
    { key: 'quantity' },
    { key: 'total' },
    { key: 'status' },
    { key: 'date needed' }
  ]

  const requestsData = useSelector((state) => {
    return state.appState.ticket.ticket_requests
  });

  const [filteredTicketRequest, setFilteredTicketRequest] = useState();

  useEffect(() => {
    setFilteredTicketRequest(requestsData)
  }, [requestsData]);

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

  const resolveTicket = async (msg) => {
    setRemarks(1)
    dialog.current.toggle();
    modal.current.toggle();
  }

  const onConfirm = async () => {
    let data = {
      ticketId: tickets.id,
      employeeId: user.employeeId,
      indicator: remarks
    }
    let res = await api.post("/close_officeRequest", data)
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.CLOSE_TICKET, renameKey(res.data.ticket_information[0])))
    } else {
      alert("error")
    }
  }

  const onClearFilter = () => {
    setFilter(default_filter)
    setFilteredTicketRequest(requestsData)
  }

  return (
    <CRow>
      <CCol xl={12}>
        <ConfirmDialog
          ref={dialog}
          {...{
            show: dialog,
            centered: true,
            onConfirm,
            title: "Resolve Request?",
            onCloseCallback: () => {
              modal.current.toggle();
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
            (tickets && tickets.status === 1) &&
            <>
              <CButton color="primary" onClick={() => {
                resolveTicket('resolve')
              }}>Resolve</CButton>
            </>
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
                <h4 className="card-title mb-0">{Number(status) === 1 ? 'Open' : status === 'All' ? status : 'Closed'} Requests</h4>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <div className="float-right  mr-3">
                  <TicketForm />
                </div>
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
              items={filteredTicketRequest}
              fields={fields}
              itemsPerPage={5}
              hover
              pagination
              onRowClick={toggleModal}
              clickableRows
              noItemsViewSlot={<NoData />}
              scopedSlots={{
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
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Ticket;
