import moment from "moment";
import { ActionTypes, actionCreator } from "../actions";
import { Promise } from "q";
import { config } from "utils/config";
import api from 'utils/api';
export const RULES = {
  required: (value) => !!value || "Required.",
  usernameRules: (v) =>
    (v && v.length <= 10) || "Name must be less than 10 characters",
  min: (v) => (v && v.length >= 8) || "Min 8 characters",
  max: (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
  nameRules: (v) => /^[A-Z a-z]+$/.test(v) || "This field must be letters only",
  emailRules: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  passwordRules: (v) =>
    (v && v.length >= 8) || "Password must be more than 8 characters",
  ageRules: (v) => v >= 18 || "Must be in legal age",
  numberRules: (v) => /^\d+$/.test(v) || "Input must be numbers only",
  existed: (value, record) => `${value} is existed to this ${record}`
};

export const getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};


export const dispatchNotification = (dispatch, payload) => {
  dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, payload))
  setTimeout(() => {
    dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: '', message: '' }))
  }, payload.type === "error" ? 7000 : 5000);
}

export const splitCamelCase = (text) => {
  return text && text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
};
export const splitSnakeCase = (text) => {
  return text && text.replaceAll("_", " ").toLowerCase();
};
export const renameKey = (obj) => {
  const altObj = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      splitSnakeCase(splitCamelCase(key)),
      value !== null ? value : "",
    ])
  );
  return altObj;
};
export const plotArray = (arr) => {
  return arr.map((data) => {
    return renameKey(data);
  });
};


export const computeDays = (day1, day2) => {
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

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
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const formatDate = (date) => {
  return moment(new Date(date)).format("YYYY-MM-DD");
};

export const shallowCopy = (obj) => {
  let copy = Object.assign({}, obj);
  return copy;
};

export const hasMissingFieds = (obj, rules) => {
  for (const [key, value] of Object.entries(obj)) {
    if (value === "" || value === null) {
      return true;
    }
  }
  return false;
};

export const checkDateRange = (start, end, isFilter = false) => {
  //console.log({start, end});
  if (start === "" || end === "") {
    //console.log(1);
    return -1;
  }
  if (start === end) {
    //console.log(2);
    return -1;
  }
  start = moment(start, "YYYY-MM-DD");
  end = moment(end, "YYYY-MM-DD");

  if (!isFilter) {
    if (start.isSameOrBefore(moment()) || end.isSameOrBefore(moment())) {
      //console.log(3);
      return -1;
    }
  }
  return computeDays(start, end)
  // let gap = moment.duration(end.diff(start)).asDays();
  // return gap;
};

export const getDuration = (start, end) => {
  end = moment(end, "YYYY-MM-DD")
  let duration = moment.duration(end.diff(moment(start, "YYYY-MM-DD")))
  return duration.asDays()
}


export const getAdminResponse = (code) => {
  return code ? "approved" : "rejected";
};


export const toggleDialog = (dispatch) => {
  dispatch(actionCreator(ActionTypes.TOGGLE_DIALOG));
};
export const respondToRequest = async (dispatch, payload) => {
  dispatchNotification(dispatch, { type: 'info', message: 'Please Wait!' });
  let res = await api.post("/update_leave_request", payload);
  if (res.error) {
    return dispatchNotification(dispatch, { type: 'error', message: res.message })
  }
  dispatch(actionCreator(ActionTypes.RESPOND_TO_LEAVE_REQUEST, payload));
  return dispatchNotification(dispatch, { type: 'success', message: "Success!" })
};

export const cancelRequest = async (dispatch, id) => {
  dispatchNotification(dispatch, { type: 'info', message: 'Please wait' });
  let res = await api.post(`/cancel_leave_request`, { id });
  if (res.error) {
    dispatchNotification(dispatch, { type: 'error', message: res.message });
  } else {
    dispatch(actionCreator(ActionTypes.CANCEL_LEAVE_REQUEST, { id }))
    dispatchNotification(dispatch, { type: 'success', message: 'Cancelled successfuly!' });
  }
}

export const filterModule = (modules, roleId) => {
  let availableModule = modules.filter(({ user }) => {
    return user.includes(Number(roleId)) || user.includes(4);
  });
  return availableModule;
};

export const setWidth = (width) => {
  return (
    {
      // xs: width,
      // sm: width,
      md: width,
      lg: width,
      xl: width,  
    })
}

export const setHeight = (height) => {
  return (
    {
      height: height
    })
}

export const setVerticallyHorizontallyCentered = () => {
  return (
    {
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    })
}


export const copyArray = (arr) => {
  return arr && Array.from(arr)
}
export const checkNull = (str) => {
  return str ? str : ""
}

export const getFileExtension = (filename) => {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}

export const getBaseUrl = () => {
  return !config.IS_DEV ? config.API_URL_BASE_LIVE : config.API_URL_BASE_DEV;
}

export const downloadFile = async (route, filename, callback) => {
  fetch(route)
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      callback(true)
    })
    .catch((err) => callback(false, err));
}

