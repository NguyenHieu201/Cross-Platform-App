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
        // console.log(res.data);
        return resolve({
          isSuccess: true,
          data: res.data.data,
          chatId: res.data.chatId,
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

export const getAllMessageWithChatId = async ({ token, chatId }) => {
  const url = `${base_url}/chats/getMessages/${chatId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return new Promise(async (resolve) => {
    await axios
      .get(url, config)
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
