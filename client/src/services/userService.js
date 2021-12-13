import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getUserById(id) {
  try {
    const response = await http.get(apiUrl + "/users/getById/" + id);
    const { data } = response.data;
    if (!data) {
      return null;
    }
    return data;
  } catch (err) {
    return null;
  }
}

export async function addUser(user) {
  try {
    const { fullName, email, password, confirmPassword } = user;
    await http.post(
      apiUrl + "/users/add",
      {
        fullName,
        email,
        password,
        confirmPassword,
      },
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (err) {
    return null;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserById,
  addUser,
};
