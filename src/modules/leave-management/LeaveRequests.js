import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  toCapitalize,
  getAdminResponse,
  respondToRequest,
  plotArray,
  getDuration,
  dispatchNotification,
  cancelRequest,
  formatDate
} from "utils/helpers";
import { LeaveRequestFilter, LeaveRequestForm } from ".";
import NoData from "reusable/NoData";
import { ConfirmDialog } from "reusable";
import { STATUS, LEAVE_REQUEST_FILTER } from "utils/constants/constant";
import { ActionTypes, actionCreator } from "utils/actions";
import { retrieveLeaveRequests } from "utils/helpers/fetch";
import { config } from 'utils/config';
import moment from 'moment'

const LeaveRequests = (props) => {
  const dispatch = useDispatch();
  const { history, location } = props;
  const query = new URLSearchParams(location.search);
  const queryPage = location.search.match(/page=([0-9]+)/, "");
  const queryStatus = query.get("status");
  const default_filter = LEAVE_REQUEST_FILTER(queryStatus)
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [collapse, setCollapse] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState(default_filter)
  const [isCancel, setIsCancel] = useState(false)
  const [payload, setPayload] = useState({
    id: null,
    status: "",
    statusCode: null,
    noOfDays: 0
  });
  const dialog = useRef();

  const [leaveFilter, setLeaveFilter] = useState("emp_request")

  const requestsData = useSelector((state) => {
    return state.appState.leave.leave_requests
  });


  const user = useSelector(state => state.appState.auth.user);

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
    onFilterRequests(default_filter)
  }

  const onFilterRequests = async (_filter) => {
    setFilter(_filter)
    let { status, month, year, category } = _filter
    let { employeeId, roleId } = user
    let payload = {
      month,
      year,
      status,
      category,
      employeeId,
      roleId,
    }
    if (JSON.stringify(default_filter) !== JSON.stringify(_filter)) {
      setLoading(true)
      let filterRes = await retrieveLeaveRequests(dispatch, payload)
      setLoading(false)
      if (filterRes.error) {
        dispatchNotification(dispatch, { type: 'error', message: filterRes.message })
      } else {
        dispatch(actionCreator(ActionTypes.FETCH_LEAVE_REQUEST, plotArray(filterRes.data.leave_requests)));
      }
    }
  }

  useEffect(() => {
    if (requestsData.length === 0) {
      setCollapse(false)
    }
    return () => { }
  }, [leaveFilter])
  return (
    <CRow>
      <CCol xl={12}>
        <ConfirmDialog
          ref={dialog}
          id="cutom_dialog"
          {...{
            show: dialog,
            onConfirm: () => {
              if (!isCancel) {
                return respondToRequest(dispatch, payload);
              }
              dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: 'info', message: "Please wait" }))

              return cancelRequest(dispatch, payload.id)
            },
            title: isCancel ? "Cancel Request?" : `${payload.statusCode ? "Approve" : "Reject"}`,
          }}
        ></ConfirmDialog>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                {
                  user.accountType === 3 ?
                    <h4 className="card-title mb-0">My Leave Requests</h4>
                    :
                    <CSelect
                      custom
                      className="input-md"
                      size="md"
                      name="leavefilter"
                      id="leavefilter"
                      value={leaveFilter}
                      onChange={(e) => {
                        setLeaveFilter(e.target.value)
                      }}
                    >
                      <option value="emp_request">
                        {"Employee Leave Requests"}
                      </option>
                      <option value="my_request">{"My Leave Requests"}</option>
                      )}
                </CSelect>
                }
              </CCol>
              <CCol sm="7" className="d-sm-block">
                {
                  // (config.IS_DEV || user.roleId > 1 )
                  (user.accountType === 1 && leaveFilter === "my_request") ||
                    (user.accountType === 2 && leaveFilter === "my_request") || (user.accountType === 3) ?
                    <div className="float-right mr-3">
                      <LeaveRequestForm />
                    </div> : ""
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
                <LeaveRequestFilter
                  {...{
                    filter,
                    onFilterRequests,
                    onClearFilter,
                    show: collapse,
                    isLoading
                  }}
                />
              </CCol>
            </CRow>
            <CDataTable
              className="table-responsive mt-2"
              items={user.accountType !== 3 ? _.filter(requestsData, [`${leaveFilter === "my_request" ? "employee id" : "approver id"}`, user.employeeId]) : requestsData}
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
                      {(item['employee id'] === user.employeeId && isPending) &&
                        <CPopover header={"cancel request"}>
                          <CLink
                            onClick={() => {
                              setPayload({
                                id: item.id,
                              });

                              setIsCancel(true);
                              dialog.current.toggle();
                            }}
                            className="card-header-action"
                          >
                            <CIcon name="cil-trash" className="text-danger" />
                          </CLink>
                        </CPopover>}

                      <CPopover header="View Details">
                        <CLink
                          onClick={() => viewRequestInfo(item.id)}
                          className="card-header-action"
                        >
                          <CIcon name="cib-indeed" className="text-dark " />
                          {!isPending && "View Details"}
                        </CLink>
                      </CPopover>
                      {(user.roleId < 3 && isPending && leaveFilter === "emp_request") &&
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
                                  let isBefore = moment(item["date from"]).isBefore(moment());
                                  setIsCancel(false);
                                  setPayload({
                                    noOfDays: getDuration(isBefore ? formatDate(new Date()) : item['date from'], item["date to"]),
                                    id: item.id,
                                    status: getAdminResponse(el.code),
                                    statusCode: el.code,
                                    approver: user.employeeId,
                                    employeeId: item['employee id']
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
