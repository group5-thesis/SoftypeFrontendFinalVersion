export default {
    id: null,
    name: '',
    date_from: '',
    date_to: '',
    category: null,
    reason: '',
    status: 'Pending',
    approver: '',
    employeeID: null,
    approverId: null
}


export class Leave {
    constructor(id, name, date_from, date_to, category, reason, approver, employeeID, approverId) {
        this.id = id
        this.name = name
        this.date_from = date_from
        this.date_to = date_to
        this.category = category
        this.reason = reason
        this.status = 'Pending'
        this.approver = approver ? approver : 'admin'
        this.employeeID = employeeID
        this.approverId = approverId
    }

    updateStatus(status) {
        this.status = status
    }

}
