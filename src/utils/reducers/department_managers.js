import { ActionTypes } from "utils/actions";

const initial_state = {
  "department_managers": [
    {
      "employeeId": 14,
      "managerId": 1,
      "userId": 2,
      "accountType": 3,
      "role": "Associate Technical Consultant",
      "department_id": 1,
      "department_name": "IT",
      "department_headId": 1,
      "department_head": "ltorres ltorres",
      "manager_firstname": "leo",
      "manager_middlename": null,
      "manager_lastname": "nilo",
      "manager_gender": "male",
      "manager_mobileno": "9222222222",
      "manager_birthdate": "1999-12-24",
      "manager_email": "ltorres@vonex.com.au",
      "manager_street": "talisay",
      "manager_city": "talisay",
      "manager_country": "phiilippines",
      "phil_health_no": null,
      "sss": null,
      "pag_ibig_no": null,
      "isActive": 1,
      "manager_qrcode": "qr_1638664119",
      "profile_img": null
    }
  ]
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTMENT_MANAGER:
      return { ...state, department_managers: [...state.department_managers, action.payload] };
    case ActionTypes.FETCH_DEPARTMENT_MANAGERS:
      return { ...state, department_managers: action.payload }
    default:
      return state;
  }
}
