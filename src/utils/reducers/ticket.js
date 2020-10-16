import { ActionTypes } from "utils/actions";
import { copyArray } from "../helpers";

const initial_state = {
  ticket_requests: [],
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_TICKET:
      return { ...state, ticket_requests: [...state.ticket_requests, action.payload] };
    case ActionTypes.FETCH_TICKETS:
      return { ...state, ticket_requests: action.payload }
    case ActionTypes.CLOSE_TICKET:
      let copy = copyArray(state.ticket_requests)
      copy = copy.map(ticket => {
        if (ticket.id === action.payload.id) {
          ticket = action.payload
        }
        return ticket;
      })
      return { ...state, ticket_requests: copy }
    default:
      return state;
  }
}
