import { file_url } from "./config";

export const fileApi = ({ filename }) => {
  const fileUri = file_url + "/" + filename;
  return fileUri;
};
