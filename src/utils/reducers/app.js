import { ActionTypes } from "utils/actions";

const initial_state = {
  sidebarShow: 'responsive',
  confirmDialog: false
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return { ...state, ...action.payload };
    case ActionTypes.TOGGLE_DIALOG:
      return { ...state, ...{ confirmDialog: !state.confirmDialog } };
    default:
      return state;
  }
}
