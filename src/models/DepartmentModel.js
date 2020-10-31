export default {
  department_head: null,
  department_name: ''
}

export class Department {
  constructor(department_head, department_name) {
    this.department_name = department_name
    this.department_head = department_head
  }
}
