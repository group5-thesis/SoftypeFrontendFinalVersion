export default {
  employeeId: null,
  name: '',
  item: '',
  quantity: 0,
  // description: '',
  date_needed: '',
  price: 0,
  total_price: 0
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
