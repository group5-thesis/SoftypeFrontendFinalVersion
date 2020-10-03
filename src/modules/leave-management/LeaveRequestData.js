
import { plotArray } from "utils/helpers";

let date_from = "2020-09-09";
let date_to = "2020-09-22"
const leaveRequest = plotArray([
    { id: 1, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Vacation Leave", status: "approved", reason: "naa ko lakaw", approver: "Admin" },
    { id: 2, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Vacation Leave", status: "approved", reason: "naa ko lakaw", approver: "Admin" },
    { id: 3, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Vacation Leave", status: "approved", reason: "naa ko lakaw", approver: "Admin" },
    { id: 4, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Vacation Leave", status: "approved", reason: "naa ko lakaw", approver: "Admin" },
    { id: 5, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Vacation Leave", status: "approved", reason: "naa ko lakaw", approver: "Admin" },
])

export default leaveRequest;
