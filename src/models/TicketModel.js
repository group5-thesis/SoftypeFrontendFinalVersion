export default {
  employeeId: null,
  name: '',
  item: '',
  quantity: '',
  description: ''
}


export class Ticket {
  constructor(employeeId, name, item, quantity, description) {
    this.employeeId = employeeId
    this.name = name
    this.item = item
    this.quantity = quantity
    this.description = description
  }
}
