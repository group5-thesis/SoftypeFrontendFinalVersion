import { ActionTypes } from "utils/actions";
import DATA from 'mock_data/LeaveRequestData'

const initial_state = {
  leave_requests: [],
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_LEAVE_REQUEST:
      return { ...state, leave_requests: [...state.leave_requests, action.payload] };
    case ActionTypes.CANCEL_LEAVE_REQUEST:
      return {
        ...state, leave_requests: state.leave_requests.filter((request) => {
          return request.id.toString() !== action.payload.id.toString()
        })
      };
    case ActionTypes.RESPOND_TO_LEAVE_REQUEST:
      return {
        ...state,
        leave_requests: state.leave_requests.map((request) => {
          return request.id.toString() === action.payload.id.toString() ? { ...request, status: action.payload.status }
            : request
        })
      }
    case ActionTypes.FETCH_LEAVE_REQUEST:
      let { payload } = action
      return { ...state, leave_requests: payload ? payload : DATA };
    default:
      return state;
  }
}
