import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

const tokenKey = "token";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt() {
  const token = localStorage.getItem(tokenKey);
  axios.defaults.headers.common["x-auth-token"] = token;
}

function delJwt() {
  delete axios.defaults.headers.common["x-auth-token"];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  delJwt,
};
