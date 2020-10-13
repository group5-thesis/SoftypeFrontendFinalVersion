
import { plotArray } from "utils/helpers"

let date_from = "2020-09-15"
let date_to = "2020-09-22"
const leaveRequest = plotArray([
    { id: 1, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Vacation Leave (VL)", status: "approved", reason: "naa ko lakaw ana si mama muadto kog merkado kay mopalit kog  gatas ug kape ug bugas ug uyab hahah", approver: "Admin" },
    { id: 2, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Service Incentive Leave (SIL)", status: "rejected", reason: "Bebe time", approver: "Admin" },
    { id: 3, name: "Yol Torres", date_from: date_from, date_to: date_to, category: "Vacation Leave (VL)", status: "pending", reason: "naa ko lakaw", approver: "Admin" }
])

export default leaveRequest
