import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CBadge, CCard, CCardBody, CCol, CDataTable, CRow, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Modal, ConfirmDialog, NoData } from "reusable";
import { ActionTypes, actionCreator } from 'utils/actions';
import { TICKET_STATUS, CURRENT_MONTH, CURRENT_YEAR } from "utils/constants/constant";
import { renameKey, dispatchNotification } from 'utils/helpers';
import TicketFilter from "./component/TicketFilter";
import TicketForm from "./component/TicketForm";
import TicketDetails from "./component/TicketDetailsV1";
import api from 'utils/api'
import { config } from 'utils/config'

const Ticket = (props) => {

  const dispatch = useDispatch();

  const [status, setStatus] = useState("All");
  const [collapse, setCollapse] = useState(true);
  const [tickets, setTickets] = useState();
  const [clickedRejectBtn, setClickedRejectBtn] = useState(false);
  const [clickedApproveBtn, setClickedApproveBtn] = useState(false);
  const [now, setNow] = useState(new Date)
  const [loading, setLoading] = useState(false)

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
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    setClickedApproveBtn(false)
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
            onConfirm,
            title: `${clickedApproveBtn ? "Approve" : clickedRejectBtn ? "Reject" : ""} request?`,
            onCloseCallback: () => {
              modal.current.toggle();
              setClickedApproveBtn(false)
              setClickedRejectBtn(false)
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
              <CButton color="success" onClick={() => {
                approveRequestBtn()
              }}>Approve</CButton>
              <CButton color="danger" onClick={() => {
                rejectRequestBtn()
              }}>Reject</CButton>
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
                {
                  (config.IS_DEV || user.roleId > 1) &&
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
