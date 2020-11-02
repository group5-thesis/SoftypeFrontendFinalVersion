import api from 'utils/api';
import { plotArray } from 'utils/helpers'
import { ActionTypes, actionCreator } from "utils/actions"


const retrieveLeaveRequests = async (dispatch, payload) => {
    let res = await api.post("/getLeaveRequest", payload);
    if (!res.error) {
        let { leave_requests } = res.data;
        dispatch(actionCreator(ActionTypes.FETCH_LEAVE_REQUEST, leave_requests));
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
    let response = await api.get('/retrieve_tickets')
    if (!response.error) {
        let payload = response.data.ticket_information;
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

export {
    retrieveLeaveRequests,
    retrieveEmployees,
    fetchTickets,
    fetchCompanyFiles,
    fetchCompanyVideos,
    fetchCompanyImages,
    fetchCompanyDocuments,
    fetchDepartments
}
