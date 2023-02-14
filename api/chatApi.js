import { base_url } from "./config";
import axios from "axios";

export const getChatApi = async ({ token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const url = `${base_url}/chats/getChats`;
  const data = {};
  return new Promise(async (resolve) => {
    await axios
      .get(url, config)
      .then((response) => {
        return resolve({
          isSuccess: true,
          data: response.data.data,
        });
      })
      .catch((error) => {
        //alert(error);
        return resolve({
          isSuccess: false,
          data: null,
          error: error.response,
        });
      });
  });
};

export const getAllChatWithFriendId = async ({ token, friendId }) => {
  const url = `${base_url}/chats/getMessagesbyfriendId/${friendId}`;
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
        console.log(err.response);
        return resolve({
          isSuccess: false,
        });
      });
  });
};
