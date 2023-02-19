import axios from "axios";
import { base_url } from "./config";

export const loginAPI = async ({ phonenumber, password }) => {
  return new Promise(async (resolve) => {
    await axios
      .post(`${base_url}/users/login`, {
        phonenumber: phonenumber,
        password: password,
      })
      .then(async (res) => {
        await showMeAPI({ token: res.data.token })
          .then((showMeRes) => {
            // console.log(showMeRes.data);
            return resolve({
              isSuccess: true,
              token: res.data.token,
              userInfo: showMeRes.data,
            });
          })
          .catch((showMeErr) => {
            console.log(showMeErr.response);
            return resolve({
              isSuccess: false,
            });
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

export const showUserAPI = async ({ token, userId }) => {
  const url = `${base_url}/users/show/${userId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return new Promise(async (resolve) => {
    await axios
      .get(url, config)
      .then((res) => {
        // console.log(res.data);
        return resolve({
          isSuccess: true,
        });
      })
      .catch((err) => {
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const showMeAPI = async ({ token }) => {
  const url = `${base_url}/users/show`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return new Promise(async (resolve) => {
    await axios
      .get(url, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          data: res.data.data,
        });
      })
      .catch((err) => {
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const editUserDetailAPI = ({ token, detail }) => {
  const url = `${base_url}/users/edit`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = detail;
  return new Promise(async (resolve) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        console.log(res.data);
        return resolve({
          isSuccess: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const searchAPI = async ({ token }) => {
  const key = "filial";
  const url = `${base_url}/search/${key}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await axios
    .get(url, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
