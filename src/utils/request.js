import axios from "axios";

const service = axios.create({
  baseURL: "/blogapi", // url = base url + request url
  timeout: 15000 // request timeout
});

service.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function(response) {
    let data = response.data;
    if (data.resCode !== 0) {
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default service;
