import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CLink,
  CPopover,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  checkDateRange,
  toCapitalize,
  getAdminResponse,
  respondToRequest,
} from "utils/helpers";
import { LeaveRequestFilter, LeaveRequestForm } from ".";
import NoData from "reusable/NoData";
import { ConfirmDialog } from "reusable";
import { STATUS } from "utils/constants/constant";
const LeaveRequests = (props) => {
  const dispatch = useDispatch();
  const { history, location } = props;
  const query = new URLSearchParams(location.search);
  const queryPage = location.search.match(/page=([0-9]+)/, "");
  const queryStatus = query.get("status");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [status, setStatus] = useState(queryStatus ? queryStatus : "All");
  const [collapse, setCollapse] = useState(true);
  const [payload, setPayload] = useState({
    id: null,
    status: "",
    statusCode: null,
  });
  const dialog = useRef();
  const requestsData = useSelector((state) => {
    return state.appState.leave.leave_requests.filter((el) => {
      return (
        el.status === status.toLowerCase() || status.toLowerCase() === "all"
      );
    });
  });
  const header = [
    {
      key: "name",
      _classes: "font-weight-bold",
    },
    "date from",
    "date to",
    {
      key: "no of days",
      label: "Days",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "category",
      sorter: false,
      filter: false,
    },
    {
      key: "reason",
      _style: { width: "20%" },
      sorter: false,
      filter: false,
    },
    "status",
    "approver",
    {
      key: "actions",
      label: "Options",
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (STATUS, status) => {
    return STATUS[toCapitalize(status)];
  };

  const pageChange = (newPage) => {
    setPage(newPage);
    currentPage !== newPage && goToRoute(newPage, status);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
    goToRoute(currentPage, e.target.value);
  };

  const goToRoute = (page, status) => {
    history.push(`/leave/requests?page=${page}&status=${status}`);
  };

  const viewRequestInfo = (id) => {
    history.push(`/leave/requests/${id}`);
  };

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  return (
    <CRow>
      <CCol xl={12}>
        <ConfirmDialog
          ref={dialog}
          id="cutom_dialog"
          {...{
            show: dialog,
            onConfirm: () => {
              respondToRequest(dispatch, payload);
            },
            title: `${payload.statusCode ? "Approve" : "Reject"}`,
          }}
        ></ConfirmDialog>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 className="card-title mb-0">{status} Request</h4>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <div className="float-right  mr-3">
                  <LeaveRequestForm />
                </div>
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
                <LeaveRequestFilter
                  {...{
                    show: collapse,
                    onStatusChange: handleChange,
                  }}
                />
              </CCol>
            </CRow>
            <CDataTable
              className="table-responsive mt-2"
              items={requestsData}
              itemsPerPage={5}
              fields={header}
              pagination
              sorter
              onPageChange={(e) => {
                pageChange(e);
              }}
              activePage={page}
              noItemsViewSlot={<NoData />}
              clickableRows
              scopedSlots={{
                "no of days": (item) => (
                  <td>{checkDateRange(item["date from"], item["date to"])}</td>
                ),
                reason: (item) => (
                  <td>
                    <p className="wrap-content-text"> {item.reason}</p>
                  </td>
                ),
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(STATUS, item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                ),
                actions: (item) => {
                  let isPending = item.status.toLowerCase() === "pending";
                  return (
                    <td>
                      <CPopover header="View Details">
                        <CLink
                          onClick={() => viewRequestInfo(item.id)}
                          className="card-header-action"
                        >
                          <CIcon name="cib-indeed" className="text-dark " />
                          {!isPending ? " View Details" : ""}
                        </CLink>
                      </CPopover>
                      {isPending &&
                        [
                          {
                            header: "Approve",
                            code: 1,
                            color: "success",
                            icon: "check",
                          },
                          {
                            header: "Reject",
                            code: 0,
                            color: "danger",
                            icon: "x-circle",
                          },
                        ].map((el, id) => {
                          return (
                            <CPopover header={el.header} key={id}>
                              <CLink
                                onClick={() => {
                                  setPayload({
                                    id: item.id,
                                    status: getAdminResponse(el.code),
                                    statusCode: el.code,
                                  });
                                  dialog.current.toggle();
                                }}
                                className="card-header-action"
                              >
                                <CIcon
                                  name={`cil-${el.icon}`}
                                  className={`text-${el.color}`}
                                />
                              </CLink>
                            </CPopover>
                          );
                        })}
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default LeaveRequests;
