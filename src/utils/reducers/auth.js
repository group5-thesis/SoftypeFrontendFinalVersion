import { ActionTypes } from "utils/actions";

const initial_state = {
  auth_checked: true,
  already_logged: true,
  user: {
    "employeeId": 13,
    "userId": 1,
    "firstname": "yol",
    "middlename": "r",
    "lastname": "torres",
    "mobileno": "09380738443",
    "birthdate": "2020-09-25",
    "gender": "Male",
    "street": "Lapu-lapu street",
    "city": "Cebu",
    "country": "Philippines",
    "email": "lorly@gmail.com",
    "qr_code": "qr_1638630124",
    "isActive": 1,
    "position": "1",
    "is_password_changed": 1,
    "remaining_leave": 21,
    "roleId": 1,
    "accountType": 1,
    "sss": null,
    "pag_ibig_no": null,
    "phil_health_no": null,
    "profile_img": "uploads_1638632167.png",
    "is_deactivated": 0
  }
};

export default function AppReducer(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('uId');
      return { ...state, ...{ already_logged: false } };
    case ActionTypes.LOGIN:
      return { ...state, already_logged: true };
    case ActionTypes.AUTH_CHECKED:
      return { ...state, auth_checked: true };
    case ActionTypes.FETCH_PROFILE_PENDING:
      return { ...state, user: null };
    case ActionTypes.FETCH_PROFILE_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
