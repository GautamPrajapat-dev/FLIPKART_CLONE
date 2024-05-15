import axios from "axios";

import { toast } from "react-toastify";
import { getTokenLocalStoragePublic } from "../../../Utils/LocalStorage";
const URL = process.env.REACT_APP_URL;
const token = getTokenLocalStoragePublic();

// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${token}`,
//   },
// };

export const GET_ALL_PRODUCT_SERVICE = async () => {};
