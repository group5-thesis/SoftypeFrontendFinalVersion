import {
  LOGIN,
  LOGOUT,
  AUTH_CHECKED,
  FETCH_PROFILE_PENDING,
  FETCH_PROFILE_SUCCESS,
  SET,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  FETCH_EMPLOYEES,
  FETCH_LEAVE_REQUEST,
  ADD_LEAVE_REQUEST,
  RESPOND_TO_LEAVE_REQUEST,
  TOGGLE_SIDEBAR,
  TOGGLE_DIALOG,
  ADD_TICKET,
  FETCH_TICKETS,
  CLOSE_TICKET
} from "utils/constants/action-types";

const ActionTypes = {
  AUTH_CHECKED,
  LOGOUT,
  LOGIN,
  FETCH_PROFILE_PENDING,
  FETCH_PROFILE_SUCCESS,
  SET,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  FETCH_EMPLOYEES,
  TOGGLE_SIDEBAR,
  FETCH_LEAVE_REQUEST,
  ADD_LEAVE_REQUEST,
  RESPOND_TO_LEAVE_REQUEST,
  TOGGLE_DIALOG,
  ADD_TICKET,
  FETCH_TICKETS,
  CLOSE_TICKET
};

const actionCreator = (type, payload = null) => ({ type, payload });
export { ActionTypes, actionCreator };

// export function updateEmployee(data) {  
//   return dispatch => {  
//       return dispatch({  
//           type: 'UPDATE_EMPLOYEE',  
//           payload: data  
//       });  
//   }  
// };  
