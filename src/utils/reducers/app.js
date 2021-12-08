import { ActionTypes } from "utils/actions";

const initial_state = {
  "sidebarShow": "responsive",
  "sideMenu": [],
  "loading": false,
  "notify": false,
  "notification": {
    "type": "",
    "message": ""
  }
};

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return { ...state, ...action.payload };
    case ActionTypes.TOGGLE_NOTIFICATION:
      let { notify } = state
      return {
        ...state,
        ...{ notify: !notify, notification: action.payload },
      };

    case ActionTypes.LOADING_STARTED:
      return { ...state, loading: true };
    case ActionTypes.LOADING_DONE:
      return { ...state, loading: false };
    default:
      return state;
  }
}
