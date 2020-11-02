export default {
  c1: null,
  c2: null,
  c3: null,
  c4: null,
  c5: null,
  employee_reviewed: null,
  reviewer: null
}

export class PerformanceReview {
  constructor(c1, c2, c3, c4, c5, employee_reviewed, reviewer) {
    this.c1 = c1
    this.c2 = c2
    this.c3 = c3
    this.c4 = c4
    this.c5 = c5
    this.employee_reviewed = employee_reviewed
    this.reviewer = reviewer
  }
}
