import api from 'utils/api';
import { plotArray } from 'utils/helpers'
import { ActionTypes, actionCreator } from "utils/actions"

const retrieveLeaveRequests = async (dispatch, payload) => {
  // let res = await api.post("/getLeaveRequest", payload);
  let res = await api.post("/filterLeaveRequest", payload);
  if (!res.error) {
    let { leave_requests } = res.data;
    dispatch(actionCreator(ActionTypes.FETCH_LEAVE_REQUEST, plotArray(leave_requests)));
  }
  return res;
}

const retrieveEmployees = async dispatch => {
  let res = await api.get("/retrieve_employees");
  if (!res.error) {
    dispatch(actionCreator(ActionTypes.FETCH_EMPLOYEES, res.data.employee_information));
  }
  return res;
}

const fetchTickets = async dispatch => {
  let response = await api.get('/retrieve_officeRequests')
  if (!response.error) {
    let payload = response.data.officeRequest_information;
    payload = plotArray(payload)
    dispatch(actionCreator(ActionTypes.FETCH_TICKETS, payload))
  }
  return response;
}

const fetchCompanyVideos = async dispatch => {
  let response = await api.get('/retrieve_files_by_type/videos')
  if (!response.error) {
    let payload = response.data.files;
    payload = plotArray(payload)
    dispatch(actionCreator(ActionTypes.FILE_VIDEOS, payload))
  }
  return response;
}
const fetchCompanyImages = async dispatch => {
  let response = await api.get('/retrieve_files_by_type/images')
  if (!response.error) {
    let payload = response.data.files;
    payload = plotArray(payload)
    dispatch(actionCreator(ActionTypes.FILE_IMAGES, payload))
  }
  return response;
}
const fetchCompanyDocuments = async dispatch => {
  let response = await api.get('/retrieve_files_by_type/documents')
  if (!response.error) {
    let payload = response.data.files;
    payload = plotArray(payload)
    dispatch(actionCreator(ActionTypes.FILE_DOCUMENTS, payload))
  }
  return response;
}
const fetchCompanyFiles = async dispatch => {
  let response = await api.get('/retrieve_files_by_type/others')
  if (!response.error) {
    let payload = response.data.files;
    payload = plotArray(payload)
    dispatch(actionCreator(ActionTypes.FILE_OTHERS, payload))
  }
  return response;
}

const fetchDepartments = async dispatch => {
  let response = await api.get('/retrieve_departments')
  if (!response.error) {
    let payload = response.data.departments;
    dispatch(actionCreator(ActionTypes.FETCH_DEPARTMENTS, payload))
  }
  return response;
}

const fetchDepartmentManagers = async dispatch => {
  let response = await api.get('/retrieve_department_managers')
  if (!response.error) {
    let payload = response.data.department_manager_information;
    dispatch(actionCreator(ActionTypes.FETCH_DEPARTMENT_MANAGERS, payload))
  }
  return response;
}

const fetchDepartmentEmployees = async dispatch => {
  let response = await api.get('/retrieve_department_employees')
  if (!response.error) {
    let payload = response.data.employee_information;
    dispatch(actionCreator(ActionTypes.FETCH_DEPARTMENT_EMPLOYEES, payload))
  }
  return response;
}

const fetchPerformanceReviews = async dispatch => {
  let response = await api.get('/retrieve_performance_reviews')
  if (!response.error) {
    let payload = response.data.performance_review_information;
    dispatch(actionCreator(ActionTypes.FETCH_PERFORMANCE_REVIEWS, payload))
  }
  return response;
}

export {
  retrieveLeaveRequests,
  retrieveEmployees,
  fetchTickets,
  fetchCompanyFiles,
  fetchCompanyVideos,
  fetchCompanyImages,
  fetchCompanyDocuments,
  fetchDepartments,
  fetchDepartmentManagers,
  fetchDepartmentEmployees,
  fetchPerformanceReviews
}
