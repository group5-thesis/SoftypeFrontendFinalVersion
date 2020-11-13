import { ActionTypes } from "utils/actions";

const initial_state = {
  accounts: [],
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_EMPLOYEES_ACCOUNTS:
      return { ...state, accounts: action.payload }
    case ActionTypes.DELETE_DEPARTMENT_EMPLOYEE:
      return { ...state, accounts: action.payload }
    case ActionTypes.RESET_EMPLOYEE_ACCOUNT:
      return { ...state, accounts: action.payload }
    default:
      return state;
  }
}
