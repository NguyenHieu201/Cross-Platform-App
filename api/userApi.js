import axios from "axios";
import { base_url } from "./config";

export const loginAPI = async ({ phonenumber, password }) => {
  return new Promise(async (resolve) => {
    await axios
      .post(`${base_url}/users/login`, {
        phonenumber: phonenumber,
        password: password,
      })
      .then((res) => {
        return resolve({
          isSuccess: true,
          token: res.data.token,
        });
      })
      .catch((err) => {
        console.log(err?.response.data.message);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const showPostAPI = async ({ token }) => {
  return new Promise(async (resolve) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .get(`${base_url}/posts/list`, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          posts: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        return resolve({
          isSuccess: false,
        });
      });
  });
};
