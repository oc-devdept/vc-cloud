import axios from "axios";
import { NotificationManager } from "react-notifications";

const api = axios.create({
  baseURL: process.env.API_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessKey");
  if (token) {
    config.headers = { Authorization: `${token}` };
  }
  return config;
});

// api.interceptors.request.use(config => {
//   const token =
//     "ItDZV7qz7RxCOHFwgPNa05OL0QSyOuuWFksmpONdivNVyqmgw6lt0K54RXfPJR09";
//   config.url = `${config.url}?access_token=${token}`;
//   return config;
// });

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.message === "Network Error") {
      // The user doesn't have internet
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 400:
        break;
      case 401:
        // not logged in
        // if (window.location.pathname != "/login") {
        //   window.location.replace("/login");
        // }
        break;
      case 403:
        // no access rights
        NotificationManager.error("Unauthorised access");
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        // Unknown Error
        break;
    }
    return Promise.reject(error);
  }
);

export default api;
