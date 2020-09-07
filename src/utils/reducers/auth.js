import { ActionTypes } from "utils/actions";

const initial_state = {
  auth_checked: false,
  already_logged: false,
  fetch_user: false,
  user: null
};

export default function AppReducer(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.LOGOUT:
      return { ...state, already_logged: false };
    case ActionTypes.LOGIN:
      return { ...state, already_logged: true };
    case ActionTypes.AUTH_CHECKED:
      return { ...state, auth_checked: true };
    case ActionTypes.FETCH_PROFILE_PENDING:
      return { ...state, user: null };
    case ActionTypes.FETCH_PROFILE_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
