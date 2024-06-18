import axios from "axios";

import { toast } from "react-toastify";
import { getTokenLocalStoragePublic } from "../../../Utils/LocalStorage";
const URL = process.env.REACT_APP_URL + "/public";
const token = getTokenLocalStoragePublic();

// const config = {
// headers: {
//   "Content-Type": "multipart/form-data",
//   Authorization: `Bearer ${token}`,
// },
// };

export const getDetials = async () => {
  try {
    const res = await axios.get(`${URL}/getDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
