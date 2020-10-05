import axios from "axios";
import { config as cnf } from "utils/config";

const callAPI = async (method, url, data = null, isFormData) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (isFormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  let token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (process.env.NODE_ENV === "production") {
    url = `${cnf.API_URL_LIVE}${url}`;
  } else {
    url = `${cnf.API_URL_DEV}${url}`;
  }
  let config = {
    timeout: 1000 * 120,
    method,
    url,
    headers,
  };

  console.log(config);

  if (data) {
    config.data = data;
  }
  try {
    let response = await axios(config);
    return response.data;
  } catch (error) {
    let errors = {
      error: true,
      data: null,
      message: error.message || "",
    };
    if (error.response) {
      /*
       * The request was made and the server responded with a status code that falls out of the range of 2xx
       */
      let { data, status, headers } = error.response;
      errors.data = [data, status, headers];
      errors.message = error.message ? error.message : "Server Error";
    } else if (error.request) {
      /*
       * The request was made but no response was received
       */
      // alert('TEst ')
      errors.message = "Something went wrong";
    }
    return errors;
  }
};

export default {
  post: async (url, data = null, isFormData = false) =>
    callAPI("POST", url, data, isFormData),

  put: async (url, data = null) => callAPI("put", url, data),

  delete: async (url, data = null) => callAPI("delete", url, data),

  get: async (url) => callAPI("get", url, null),

  callAPI,
};
