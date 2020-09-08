import { ActionTypes } from "utils/actions";

const initial_state = {
    employees:[]
}

export default function changeState(state = initial_state, action) {
    switch (action.type) {
      case ActionTypes.FETCH_EMPLOYEES:
        return { ...state, ...action.payload};
      case ActionTypes.UPDATE_EMPLOYEE:
        return { ...state, ...action.payload};
      case ActionTypes.DELETE_EMPLOYEE:
        return { ...state, ...action.payload};
      case ActionTypes.ADD_EMPLOYEE:
        return { ...state, ...action.payload};
      default:
        return state;
    }
  }
