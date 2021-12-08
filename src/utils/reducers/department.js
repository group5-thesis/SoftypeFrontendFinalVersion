import { ActionTypes } from "utils/actions";

const initial_state = {
  "departments": [
    {
      "department_id": 1,
      "department_name": "IT",
      "department_headId": 1,
      "department_head": "ltorres ltorres",
      "department_head_employeeId": 15,
      "department_head_profileImg": null
    }
  ]
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTMENT:
      return { ...state, departments: [...state.departments, action.payload] };
    case ActionTypes.FETCH_DEPARTMENTS:
      return { ...state, departments: action.payload }
    default:
      return state;
  }
}
