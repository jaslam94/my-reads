import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const tokenKey = "token";

http.setJwt();

export async function login(email, password) {
  const response = await http.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });
  const { token } = response.data;
  localStorage.setItem(tokenKey, token);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
