import axios from "axios";
import { config as cnf } from "utils/config";
let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const callAPI = async (method, url, data = null) => {
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
    method,
    url,
    headers,
  };

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
      message: null
    }
    if (error.response) {
      /*
       * The request was made and the server responded with a status code that falls out of the range of 2xx
       */
      let { data, status, headers } = error.response
      errors.data = [data, status, headers]
      errors.message = "Server Error"
    } else if (error.request) {
      /*
       * The request was made but no response was received
       */
      // alert('TEst ')
      errors.message = "Something went wrong"
    } else {
      errors.message = error.message
    }
    return errors
  }
};

export default {
  post: async (url, data = null) => callAPI("POST", url, data),

  put: async (url, data = null) => callAPI("put", url, data),

  delete: async (url, data = null) => callAPI("delete", url, data),

  get: async (url) => callAPI("get", url, null),

  callAPI,
};
