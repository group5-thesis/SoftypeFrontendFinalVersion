import { ActionTypes } from "utils/actions";

const initial_state = {
  department_employees: [],
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTMENT_EMPLOYEE:
      return { ...state, department_employees: [...state.department_employees, action.payload] };
    case ActionTypes.FETCH_DEPARTMENT_EMPLOYEES:
      return { ...state, department_employees: action.payload }
    default:
      return state;
  }
}
