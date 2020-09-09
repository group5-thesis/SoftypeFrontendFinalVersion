import { ActionTypes } from "utils/actions";

const initial_state = {
    leave_requests:[],
}

export default function changeState(state = initial_state, action) {
    switch (action.type) {
      case ActionTypes.ADD_LEAVE_REQUEST:
        return { ...state, ...action.payload};
      default:
        return state;
    }
  }
