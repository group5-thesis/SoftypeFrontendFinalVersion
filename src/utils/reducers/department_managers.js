import { ActionTypes } from "utils/actions";

const initial_state = {
  department_managers: [],
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTMENT_MANAGER:
      return { ...state, department_managers: [...state.department_managers, action.payload] };
    case ActionTypes.FETCH_DEPARTMENT_MANAGERS:
      return { ...state, department_managers: action.payload }
    default:
      return state;
  }
}
