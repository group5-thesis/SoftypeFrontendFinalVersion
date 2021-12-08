import { ActionTypes } from "utils/actions";

const initial_state = {
  "accounts": [
    {
      "userId": 3,
      "employeeId": 15,
      "employee_username": "lltorres15",
      "employee_accountType": 2,
      "isDeactivated": 0,
      "isPasswordChanged": 0,
      "employee_name": "ltorres ltorres"
    },
    {
      "userId": 2,
      "employeeId": 14,
      "employee_username": "lnilo14",
      "employee_accountType": 3,
      "isDeactivated": 0,
      "isPasswordChanged": 0,
      "employee_name": "nilo leo"
    },
    {
      "userId": 1,
      "employeeId": 13,
      "employee_username": "ytorres13",
      "employee_accountType": 1,
      "isDeactivated": 0,
      "isPasswordChanged": 1,
      "employee_name": "torres yol"
    },
    {
      "userId": 4,
      "employeeId": 16,
      "employee_username": "ytorres16",
      "employee_accountType": 3,
      "isDeactivated": 0,
      "isPasswordChanged": 0,
      "employee_name": "torres yol"
    }
  ]
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_EMPLOYEES_ACCOUNTS:
      return { ...state, accounts: action.payload }
    case ActionTypes.DISABLE_EMPLOYEE_ACCOUNT:
      return { ...state, accounts: action.payload }
    case ActionTypes.RESET_EMPLOYEE_ACCOUNT:
      return { ...state, accounts: action.payload }
    default:
      return state;
  }
}
