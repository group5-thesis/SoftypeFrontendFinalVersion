export default {
    id: null,
    name: '',
    date_from: '',
    date_to: '',
    category: '',
    reason: '',
    status: 'pending',
    approver: 'admin',
    employeeID: null,
}


export class Leave {
    constructor(id, name, date_from, date_to, category, reason, approver, employeeID) {
        this.id = id
        this.name = name
        this.date_from = date_from
        this.date_to = date_to
        this.category = category
        this.reason = reason
        this.status = 'pending'
        this.approver = approver ? approver : 'admin'
        this.employeeID = employeeID
    }

    updateStatus(status) {
        this.status = status
    }

}