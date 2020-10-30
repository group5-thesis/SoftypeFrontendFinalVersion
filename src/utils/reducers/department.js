import { ActionTypes } from "utils/actions";

const initial_state = {
  departments: [],
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
