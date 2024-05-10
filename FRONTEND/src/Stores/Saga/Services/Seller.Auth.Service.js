import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  clearTokenLocalStorageSeller,
  getTokenLocalStorageSeller,
} from "../../../Utils/LocalStorage";

// import { toast } from "react-toastify";
const URL = "http://localhost:3031/seller";

const token = getTokenLocalStorageSeller();
if (!!token) {
  try {
    let decodedToken = jwtDecode(token);
    // JWT exp is in seconds
    if (Date.now() >= decodedToken.exp * 1000) {
      window.location.href = "/login";
      console.log("Token expired.");
      clearTokenLocalStorageSeller();
    }
  } catch (error) {
    console.log("");
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
    // Handle the error
    // toast.error(error.message, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
    // console.log("error in response :" + error);

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
