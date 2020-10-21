export const USER_TYPES = [
  'Junior consultant',
  'Senior consultant',
  'Team Leader',
  'Project Manager',
  'CEO',
  'CIO',
  'CTO',
  'COO',
]

export const ROLE = [
  // 'Admin',
  // 'HR',
  'Trainee',
  'Junior Consultant (Technical/Functional)',
  'Senior Consultant (Technical/Functional)',
  'Associate Team Lead',
  'Team Leader',
  'Project Manager',
  'CTO',
  'CIO',
  'COO',
  'CEO',
  'IT Admin',
  'Sales Associate',
  'Technical Associate',
  'Support and Documentation',
  'Senior Sales Consultant',
  'VP Sales and Marketing'
]

export const LEAVE_TYPES = [
  "Sick Leave (SL)",
  "Vacation Leave (VL)",
  "Service Incentive Leave (SIL)",
  "Maternity Leave (ML)",
  "Paternity Leave",
  "Parental Leave",
  "Rehabilitation Leave",
  "Study Leave"
]

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

export const YEARS = [
  2018,
  2019,
  2020
]

export const TICKET_STATUS = {
  1: "primary",
  0: "success"
}

export const QUESTIONS = [
  "In past quarter that employee worked on how many projects?",
  "How much tasks completed by him/her?",
  "Is he/she taking initiatives in the project?",
  "Is he/she giving his thoughts for solutioning and providing the best what we can do?",
  "Contribution of him/her in every project?"
]

export const STATUS = {
  Pending: "primary",
  Approved: "success",
  Rejected: "danger",
  Cancelled: "warning",
};

export const APP_MESSAGES = {
  LOGIN_SUCCESS: (username) => `Welcome back ${username}`,
  INPUT_REQUIRED: "Please provide a valid information",
  INVALID_CREDENTIALS: "Invalid credentials"
}

export const CURRENT_MONTH = MONTHS[new Date().getMonth()];
export const CURRENT_YEAR = new Date().getFullYear();
