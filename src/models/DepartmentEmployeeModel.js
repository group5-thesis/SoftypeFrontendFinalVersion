export default {
  employeeId: null,
  department_managerId: null,
  department_headId: null
}

export class DepartmentEmployee {
  constructor(employeeId, department_managerId, department_headId) {
    this.employeeId = employeeId
    this.department_managerId = department_managerId
    this.department_headId = department_headId
  }
}
