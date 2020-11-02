import moment from "moment";
import { ActionTypes, actionCreator } from "../actions";
import { Promise } from "q";
import { config } from "utils/config"
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
  numberRules: (v) => /^\d+$/.test(v) || "Input must be numbers only"
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
      value,
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
  const diffTime = Math.abs(date2 - date1);
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
  let gap = moment.duration(end.diff(start)).asDays();
  return gap;
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
export const respondToRequest = (dispatch, payload) => {
  dispatch(actionCreator(ActionTypes.RESPOND_TO_LEAVE_REQUEST, payload));
};

export const checkCamera = () => {
  return new Promise((resolve, reject) => {
    const defaultError = "Please Allow the app to use the camera";
    let result = {
      camera: false,
      cameraError: defaultError,
    };
    let hasCamera = false;

    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind === "videoinput") {
            hasCamera = true;
          }
        });
        if (hasCamera) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              result.camera = true;
              resolve(result);
            })
            .catch((err) => {
              result.cameraError = err.name + ": " + err.message;
              //console.log(err);
              if (err.name == "NotAllowedError") {
                result.cameraError = defaultError;
              }
              reject(result);
            });
        } else {
          result.cameraError = "Camera not supported";
          reject(result);
        }
      })
      .catch(function (err) {
        result.camera = false;
        result.cameraError = err.name + ": " + err.message;
        reject(result);
      });
  });
};

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
  return process.env.NODE_ENV === "production" ? config.API_URL_BASE_LIVE : config.API_URL_BASE_DEV;
}

export const downloadFile = async (route, filename, callback) => {
  fetch(`${getBaseUrl()}/file/${route}`)
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
