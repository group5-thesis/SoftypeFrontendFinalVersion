import moment from 'moment';
export const RULES = {
    required: value => !!value || "Required.",
    usernameRules: v => (v && v.length <= 10) || "Name must be less than 10 characters",
    min: v => (v && v.length >= 8) || "Min 8 characters",
    max: v => (v && v.length <= 20) || "Name must be less than 20 characters",
    nameRules: v => (/^[A-Z a-z]+$/.test(v)) || "This field must be letters only",
    emailRules: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
    passwordRules: v => (v && v.length >= 8) || "Password must be more than 8 characters",
    ageRules: v => v >= 18 || "Must be in legal age"
}

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
];

export const splitCamelCase = (text) => {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
}
export const splitSnakeCase = (text) => {
    return text.replaceAll("_", " ").toLowerCase()
}
export const renameKey = (obj) => {
    const altObj = Object.fromEntries(
        Object.entries(obj).map(([key, value]) =>
            [splitSnakeCase(splitCamelCase(key)), value]
        )
    )
    return altObj;
}
export const plotArray = (arr) => {
    return arr.map(data => {
        return renameKey(data);
    })
}

export const computeDays = (day1, day2) => {
    const date1 = new Date(day1);
    const date2 = new Date(day2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export const insertProperty = (obj, key, value, index) => {
    var temp = {};
    var i = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (i === index && key && value) {
                temp[key] = value;
            }
            temp[prop] = obj[prop];
            i++;

        }
    }
    if (!index && key && value) {
        temp[key] = value;
    }
    return temp;
};

export const toCapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatDate = (date) => {
    return moment(new Date(date)).format('YYYY-MM-DD')
}

export const shallowCopy = (obj) => {
    let copy = Object.assign({}, obj);
    return copy;
}

export const hasMissingFieds = (obj, rules) => {
    for (const [key, value] of Object.entries(obj)) {
        if (value === '' || value === null) {
            return true;
        }
    }
    return false;
}

export const checkDateRange = (start, end) => {
    if (start === '' || end === '') {
        return 0;
    }
    start = moment(start, 'YYYY-MM-DD');
    end = moment(end, 'YYYY-MM-DD')

    if (start.isSameOrBefore(moment()) || start.isSameOrBefore(moment())) {
        return 0;
    }
    let gap = moment.duration(end.diff(start)).asDays();
    return gap;
}
export * from './leaveRequestHelpers';
