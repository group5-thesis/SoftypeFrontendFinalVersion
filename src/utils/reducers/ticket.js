import { ActionTypes } from "utils/actions";

const initial_state = {
  ticket_requests: [],
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_TICKET:
      return { ...state, ticket_requests: [...state.ticket_requests, action.payload] };
    case ActionTypes.FETCH_TICKETS:
      return { ...state, ticket_requests: action.payload }
    default:
      return state;
  }
}
