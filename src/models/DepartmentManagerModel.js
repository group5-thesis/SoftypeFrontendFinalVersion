export default {
  department_manager: null,
  department_id: null
}

export class DepartmentManager {
  constructor(department_manager, department_id) {
    this.department_manager = department_manager
    this.department_id = department_id
  }
}
