import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mdiAccount } from '@mdi/js'
import _ from 'lodash';
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
import moment from 'moment';
import {
  toCapitalize,
  getAdminResponse,
  respondToRequest,
  formatDate,
  getDuration
} from "utils/helpers";
import { LeaveRequestFilter, LeaveRequestForm } from ".";
import NoData from "reusable/NoData";
import { ConfirmDialog } from "reusable";
import { STATUS, MONTHS, CURRENT_MONTH, CURRENT_YEAR } from "utils/constants/constant";

const LeaveRequests = (props) => {
  const dispatch = useDispatch();
  const { history, location } = props;
  const query = new URLSearchParams(location.search);
  const queryPage = location.search.match(/page=([0-9]+)/, "");
  const queryStatus = query.get("status");
  const default_filter = {
    status: queryStatus ? queryStatus : "All",
    employee: "All",
    date_from: formatDate(Date.now()),
    date_to: null,
    month: CURRENT_MONTH,
    year: CURRENT_YEAR,
    category: 'All'
  }
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [collapse, setCollapse] = useState(true);
  const [filter, setFilter] = useState(default_filter)
  const [payload, setPayload] = useState({
    id: null,
    status: "",
    statusCode: null,
  });
  const dialog = useRef();
  const requestsData = useSelector((state) => {
    return state.appState.leave.leave_requests
  });

  const [filteredLeaveRequest, setFilteredLeaveRequest] = useState(requestsData);
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
    // "approver",
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
    currentPage !== newPage && goToRoute(newPage, filter.status);
  };

  const goToRoute = (page, status) => {
    history.push(`/leave/requests?page=${page}&status=${filter.status}`);
  };

  const viewRequestInfo = (id) => {
    history.push(`/leave/requests/${id}`);
  };

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const onClearFilter = () => {
    setFilter(default_filter)
    setFilteredLeaveRequest(requestsData)
  }

  const onFilterRequests = _filter => {
    setFilter(_filter)
    setFilteredLeaveRequest(requestsData.filter((el) => {
      let { status, employee, date_from, date_to, category } = _filter
      let filter_result = {
        date: false,
        status: false,
        category: false,
        employee: false
      }

      let leave_from = moment(el["date from"]);
      let leave_to = moment(el["date to"]);

      let date_filter = {
        from: moment(formatDate(date_from)),
        to: _filter.date_to ? moment(formatDate(date_to)) : ""
      }

      if (status === "" || status.toLowerCase() === "all" || el.status.toLowerCase() === status.toLowerCase()) {
        filter_result.status = true;
      }

      if (category === "" || category.toLowerCase() === "all" || el.category.toLowerCase().includes(category.toLowerCase()) || category.includes(el.category.toLowerCase())) {
        filter_result.category = true;
      }

      if (employee === "" || employee.toLowerCase() === "all" || el.name.toLowerCase().includes(employee.toLowerCase())) {
        filter_result.employee = true;
      }

      // date range
      if (date_filter.to === "" || date_filter.to === null) {
        filter_result.date = leave_from.isAfter(date_filter.from) || leave_from.isSame(date_filter.from)
      } else {
        filter_result.date = (leave_from.isSame(date_filter.from) || leave_from.isAfter(date_filter.from))
          && (leave_to.isBefore(date_filter.to) || leave_to.isSame(date_filter.to))
      }
      return !_.valuesIn(filter_result).includes(false);
    }));
  }
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
                <h4 className="card-title mb-0">Leave Request</h4>
              </CCol>
              <CCol sm="7" className=" d-sm-block">
                <div className="float-right  mr-3">
                  <LeaveRequestForm />
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
                <LeaveRequestFilter
                  {...{
                    filter,
                    onFilterRequests,
                    onClearFilter,
                    show: collapse,
                  }}
                />
              </CCol>
            </CRow>
            <CDataTable
              className="table-responsive mt-2"
              items={filteredLeaveRequest}
              itemsPerPage={10}
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
                  < td > {getDuration(item["date from"], item["date to"])}</td>
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
                          {!isPending && "View Details"}
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
    </CRow >
  );
};

export default LeaveRequests;
