import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CBadge, CCard, CCardBody, CCol, CDataTable, CRow, CPopover, CCollapse, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import NoData from "reusable/NoData";
import { ActionTypes, actionCreator } from 'utils/actions';
import { STATUS } from "utils/constants/constant";
import { toCapitalize, formatDate } from 'utils/helpers';
import api from 'utils/api'
import TicketFilter from "./component/TicketFilter";



const Ticket = (props) => {

  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([])
  const [status, setStatus] = useState("All");
  const [collapse, setCollapse] = useState(true);

  const usersData = [];
  const fields = [
    { key: 'date requested', _style: { width: '20%' } },
    { key: 'name', _style: { width: '20%' } },
    { key: 'item', _style: { width: '15%' } },
    { key: 'description', _style: { width: '20%' } },
    { key: 'quantity', _style: { width: '%5' } }
  ]

  const requestsData = useSelector((state) => {
    return state.appState.ticket.ticket_requests
  });


  useEffect(() => {
    console.log(requestsData, 'tickets');
  }, [requestsData]);


  const toggle = (e) => {
    console.log(e);
    setCollapse(!collapse);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 className="card-title mb-0">{Number(status) === 1 ? 'Open' : status === 'All' ? status : 'Closed' } Requests</h4>
              </CCol>
              <CCol>
                <div className="float-right mr-3">
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
                  }} />
              </CCol>
            </CRow>
            <CDataTable
              items={requestsData}
              fields={fields}
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              pagination
              noItemsViewSlot={<NoData />}
              scopedSlots={{
                'date requested':
                  (item) => (
                    <td>
                      {formatDate(item['date requested'])}
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
