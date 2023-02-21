import axios from "axios";
import { base_url } from "./config";

export const SearchAPI = async ({ key, token }) => {
  const url = `${base_url}/search/${key}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return new Promise(async (resolve) => {
    await axios
      .get(url, config)
      .then((res) => {
        return resolve({
          isSuccess: true,
          result: res.data.data,
        });
      })
      .catch((err) => {
        return resolve({
          isSuccess: false,
          message: res.response.message,
        });
      });
  });
};
