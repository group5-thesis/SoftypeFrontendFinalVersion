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

  let response = await axios(config);
  return response.data;
};

export default {
  post: async (url, data = null) => callAPI("post", url, data),

  put: async (url, data = null) => callAPI("put", url, data),

  delete: async (url, data = null) => callAPI("delete", url, data),

  get: async (url) => callAPI("get", url, null),

  callAPI,
};
