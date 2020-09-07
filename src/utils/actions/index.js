import {
  LOGIN,
  LOGOUT,
  AUTH_CHECKED,
  FETCH_PROFILE_PENDING,
  FETCH_PROFILE_SUCCESS,
  SET
} from "utils/constants/action-types";

const ActionTypes = {
  AUTH_CHECKED: AUTH_CHECKED,
  LOGOUT: LOGOUT,
  LOGIN: LOGIN,
  FETCH_PROFILE_PENDING: FETCH_PROFILE_PENDING,
  FETCH_PROFILE_SUCCESS: FETCH_PROFILE_SUCCESS,
  SET: SET
};

const actionCreator = (type, payload = null) => ({ type, payload });
export { ActionTypes, actionCreator };
