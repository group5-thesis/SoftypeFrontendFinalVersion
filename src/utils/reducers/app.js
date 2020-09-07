import { ActionTypes } from "utils/actions";

const initial_state = {
    sidebarShow: 'responsive'
}

export default function changeState(state = initial_state, action) {
    switch (action.type) {
      case ActionTypes.SET:
        return { ...state, ...action.payload};
      default:
        return state;
    }
  }
