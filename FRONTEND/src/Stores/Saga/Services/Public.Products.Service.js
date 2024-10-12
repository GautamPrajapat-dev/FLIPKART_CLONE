import axios from "axios";

import { toast } from "react-toastify";
import { toastifyOptions } from "../../../Utils/tostifyDefault";
import {
  clearTokenLocalStoragePublic,
  getTokenLocalStoragePublic,
} from "../../../Utils/LocalStorage";
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line no-undef
const URL = import.meta.env.VITE_URL;
const token = getTokenLocalStoragePublic();
let decodedToken;
if (token) {
  decodedToken = jwtDecode(token);
  try {
    // console.log(decodedToken);
    // JWT exp is in secondss
    if (Date.now() >= decodedToken.exp * 1000) {
      window.location.href = "/seller/login";
      console.log("Token expired.");
      clearTokenLocalStoragePublic();
    }
  } catch (error) {
    console.log("token error");
  }
} else {
  console.log("Invalid Token");
}
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getDetials = async () => {
  try {
    const res = await axios.get(`${URL}/public/getDetails`, {
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
export const category = async () => {
  try {
    const res = await axios.get(`${URL}/products/v1/category`, config);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const subcategorywithproducts = async (payload) => {
  const { category } = payload;
  try {
    if (!category) {
      return false;
    }
    const res = await axios.get(
      `${URL}/products/v1/category/${category}`,
      config
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const subcategoryAllproducts = async (payload) => {
  const { category, subcategory, search, page } = payload;

  try {
    if (!category || !subcategory) {
      return false;
    }
    let url = `${URL}/products/v1/product?limit=3`;

    if (search) {
      url += `&search=${search}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    if (subcategory) {
      url += `&subcategory=${subcategory}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    console.warn("this is a url ====", url);
    const res = await axios.get(url, config);
    // const res = await axios.get(
    //   `${URL}/products/v1/category/${path.category}/${path.subcategory}/?category.subCategory=${path.subcategory}&category.category=${path.category}&limit=3&page=${page}`,
    //   config
    // );
    const data = await res.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWhitelistService = async () => {
  try {
    const res = await axios.get(`${URL}/products/v1/whitelist`, config);

    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addProductWhitelistService = async (action) => {
  const { id } = action.payload;

  try {
    const res = await axios.post(
      `${URL}/products/v1/whitelist`,
      {
        productId: id,
      },
      config
    );
    const data = await res.data;

    if (data.status === true) {
      toast.success(data.successMessage, toastifyOptions);
      // setTimeout(() => window.location.reload(), 1000);
      return data;
    } else {
      toast.warn(data.errorMessage, toastifyOptions);
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeProductWhitelistService = async (action) => {
  const { id } = action.payload;

  try {
    const res = await axios.delete(
      `${URL}/products/v1/whitelist/${id}`,
      config
    );
    const data = await res.data;
    if (data.status === true) {
      toast.success(data.successMessage, toastifyOptions);
      // setTimeout(() => window.location.reload(), 1000);
      return data;
    } else {
      toast.warn(data.errorMessage, toastifyOptions);
    }
  } catch (error) {
    console.log(error);
  }
};
