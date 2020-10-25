
export const ROLE = [
  'HR',
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

export const FILE_TYPES = [
  {
    name: "Documents",
    extensions: ["pdf", "doc", "docx", "xls", "ppt"]
  },
  {
    name: "Images",
    extensions: ["png", "jpg", "jpeg", "gif", "bmp", "svg"]
  },
  {
    name: "Videos",
    extensions: ["mp4", "avi", "mov", "webpm", "mpeg", "3gp", "flv"],
  },
  {
    name: "Others",
    extensions: ["*"]
  }
]

export const ACCOUNT_ROLES = [
  {
    "accountType": 1,
    "category": "Admin Roles",
    "roles":
      [
        "Admin",
        "CEO",
        "CIO",
        "CFO",
        "COO",
        "CTO",
        "HR Admin/Manager",
      ],
  }, {
    "accountType": 2,
    "category": "Managerial Roles",
    "roles":
      [
        "Associate Technical Lead",
        "IT Admin",
        "Program Manager",
        "Project Manager",
        "Team Leader",
        "Technical Lead",
        "VP - Sales & Marketing",
      ],
  },
  {
    "accountType": 3,
    "category": "Regular Roles",
    "roles":
      [
        "Associate Technical Consultant",
        "Jr Functional Consultant",
        "Jr Marketing Consultant",
        "Jr Technical Consultant",
        "Sales Associate",
        "Sr Functional Consultant",
        "Sr Marketing Consultant",
        "Sr Sales Consultant",
        "Sr Tecnical Consultant",
        "Support & Documentation",
        "Trainee",
      ]
  }
]

export const CURRENT_MONTH = MONTHS[new Date().getMonth()];
export const CURRENT_YEAR = new Date().getFullYear();
