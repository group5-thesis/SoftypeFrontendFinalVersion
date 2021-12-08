import { ActionTypes } from "utils/actions";

const initial_state = {
  "employees": [
    {
      "employeeId": 13,
      "userId": 1,
      "accountType": 1,
      "role": "1",
      "department_id": null,
      "department_name": null,
      "department_headId": null,
      "department_head": null,
      "department_managerId": null,
      "department_manager": null,
      "isManager": null,
      "isHead": null,
      "department_nameM": null,
      "deparment_IdM": null,
      "deparment_IdH": null,
      "department_nameH": null,
      "firstname": "yol",
      "middlename": "r",
      "lastname": "torres",
      "gender": "Male",
      "mobileno": "09380738443",
      "birthdate": "2020-09-25",
      "email": "lorly@gmail.com",
      "street": "Lapu-lapu street",
      "city": "Cebu",
      "country": "Philippines",
      "phil_health_no": null,
      "sss": null,
      "pag_ibig_no": null,
      "isActive": 1,
      "profile_img": "uploads_1638632167.png",
      "qrcode": "qr_1638630124"
    },
    {
      "employeeId": 14,
      "userId": 2,
      "accountType": 3,
      "role": "Associate Technical Consultant",
      "department_id": null,
      "department_name": null,
      "department_headId": null,
      "department_head": null,
      "department_managerId": null,
      "department_manager": null,
      "isManager": 14,
      "isHead": null,
      "department_nameM": "IT",
      "deparment_IdM": 1,
      "deparment_IdH": null,
      "department_nameH": null,
      "firstname": "leo",
      "middlename": null,
      "lastname": "nilo",
      "gender": "male",
      "mobileno": "9222222222",
      "birthdate": "1999-12-24",
      "email": "ltorres@vonex.com.au",
      "street": "talisay",
      "city": "talisay",
      "country": "phiilippines",
      "phil_health_no": null,
      "sss": null,
      "pag_ibig_no": null,
      "isActive": 1,
      "profile_img": null,
      "qrcode": "qr_1638664119"
    },
    {
      "employeeId": 15,
      "userId": 3,
      "accountType": 2,
      "role": "Program Manager",
      "department_id": null,
      "department_name": null,
      "department_headId": null,
      "department_head": null,
      "department_managerId": null,
      "department_manager": null,
      "isManager": null,
      "isHead": 15,
      "department_nameM": null,
      "deparment_IdM": null,
      "deparment_IdH": 1,
      "department_nameH": "IT",
      "firstname": "ltorres",
      "middlename": null,
      "lastname": "ltorres",
      "gender": "male",
      "mobileno": "9999999999",
      "birthdate": "1999-12-24",
      "email": "ltorres@c.vom",
      "street": "test",
      "city": "test",
      "country": "test",
      "phil_health_no": null,
      "sss": null,
      "pag_ibig_no": null,
      "isActive": 1,
      "profile_img": null,
      "qrcode": "qr_1638664317"
    },
    {
      "employeeId": 16,
      "userId": 4,
      "accountType": 3,
      "role": "CIO",
      "department_id": null,
      "department_name": null,
      "department_headId": null,
      "department_head": null,
      "department_managerId": null,
      "department_manager": null,
      "isManager": null,
      "isHead": null,
      "department_nameM": null,
      "deparment_IdM": null,
      "deparment_IdH": null,
      "department_nameH": null,
      "firstname": "yol",
      "middlename": "r",
      "lastname": "torres",
      "gender": "male",
      "mobileno": "9999999999",
      "birthdate": "1999-12-24",
      "email": "ltorres@testc.com",
      "street": "test",
      "city": "test",
      "country": "test",
      "phil_health_no": null,
      "sss": null,
      "pag_ibig_no": null,
      "isActive": 1,
      "profile_img": null,
      "qrcode": "qr_1638866063"
    }
  ],
  "chartData": []
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_EMPLOYEES:
      return { ...state, employees: action.payload };
    case ActionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((content, i) => content.id === action.payload.id ? {
          ...content, employees: action.payload.employees
        } : content)
      }
    case ActionTypes.DELETE_EMPLOYEE:
      return { ...state, ...action.payload };
    case ActionTypes.ADD_EMPLOYEE:
      return { ...state, employees: [...state.employees, action.payload] };
    case ActionTypes.FETCH_CHART_DATA:
      return { ...state, chartData: action.payload };
    default:
      return state;
  }
}
