import axios from "axios";
import { base_url } from "./config";

export const getListNotification = async ({ token }) => {
  const url = `${base_url}/notifications/list`;
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
        });
      })
      .catch((err) => {
        console.log(err.response);
        return resolve({
          isSuccess: false,
          message: err.response.message,
        });
      });
  });
};
