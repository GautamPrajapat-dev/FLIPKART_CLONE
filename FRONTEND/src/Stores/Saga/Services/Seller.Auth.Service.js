/* eslint-disable no-undef */
import axios, { formToJSON } from "axios";
import { jwtDecode } from "jwt-decode";
import {
  clearTokenLocalStorageSeller,
  getTokenLocalStorageSeller,
} from "../../../Utils/LocalStorage";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../../Utils/tostifyDefault";

// import { toast } from "react-toastify";
const URL = import.meta.env.VITE_URL + "/seller";

const token = getTokenLocalStorageSeller();
if (token) {
  try {
    let decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    // JWT exp is in secondss
    if (Date.now() >= decodedToken.exp * 1000) {
      window.location.href = "/seller/login";
      console.log("Token expired.");
      clearTokenLocalStorageSeller();
    }
  } catch (error) {
    console.log("token error");
  }
}

// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${token}`,
//   },
// };

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getDetails = async () => {
  try {
    if (!token) {
      return;
    }

    const res = await axios.get(`${URL}/seller-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    return data;
  } catch (error) {
    // console.log(error);
  }
};

export const updateSellerProfile = async (img) => {
  try {
    const res = await axios.put(`${URL}/upload-avatar`, img, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;

    return data;
  } catch (error) {
    // console.log(error);
  }
};
export const updateSellerDetails = async (fromdata) => {
  try {
    const details = formToJSON(fromdata);

    const res = await axios.put(`${URL}/update-details`, details, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;

    if (data.status === true) {
      toast.success(data.successMessage, toastifyOptions);
      return data;
    } else {
      toast.warn(data.errorMessage, toastifyOptions);
    }
  } catch (error) {
    console.log(error);
  }
};
