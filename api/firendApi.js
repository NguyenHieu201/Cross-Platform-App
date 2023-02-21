import { base_url, file_url } from "./config";
import axios from "axios";

export const getListFriendAPI = async ({ token }) => {
  const url = `${base_url}/friends/list`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {};

  return new Promise(async (resolve) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          data: res.data.data.friends,
        });
      })
      .catch((err) => {
        console.log(err.data);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const getListInviteAPI = async ({ token }) => {
  const url = `${base_url}/friends/get-requested-friend`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {};

  return new Promise(async (resolve) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          data: res.data.data.friends,
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

export const acceptInviteAPI = async ({ token, userId }) => {
  const url = `${base_url}/friends/set-accept`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    user_id: userId,
    is_accept: "1",
  };
  return new Promise(async (resolve) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        console.log(res.data);
        return resolve({
          isSuccess: true,
          message: res.data.message,
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

export const denyInvite = async ({ token, userId }) => {
  const url = `${base_url}/friends/cancel-request`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    user_id: userId,
  };
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
        console.log(err);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const removeFriend = async ({ token, userId }) => {
  const url = `${base_url}/friends/set-remove`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    user_id: userId,
  };
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
        console.log(err);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const sendInvite = async ({ token, userId }) => {
  const url = `${base_url}/friends/set-request-friend`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    user_id: userId,
  };
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
        console.log(err);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const removeInvite = async ({ token, userId }) => {
  const url = `${base_url}/friends/set-accept`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    user_id: userId,
    is_accept: 2,
  };
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
        console.log(err);
        return resolve({
          isSuccess: false,
        });
      });
  });
};

export const getFriendStatus = async ({ token, userId }) => {
  const url = `${base_url}/friends/status/${userId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return new Promise(async (resolve) => {
    await axios
      .get(url, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          data: res.data.data.status,
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
