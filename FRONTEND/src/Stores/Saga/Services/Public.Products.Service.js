import axios from "axios";

// import { toast } from "react-toastify";
import { getTokenLocalStoragePublic } from "../../../Utils/LocalStorage";
// eslint-disable-next-line no-undef
const URL = import.meta.env.VITE_URL;
const token = getTokenLocalStoragePublic();

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
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
export const subcategorywithproducts = async (subcategory) => {
  try {
    if (!subcategory) {
      return false;
    }
    const res = await axios.get(
      `${URL}/products/v1/category/${subcategory}`,
      config
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const subcategoryAllproducts = async ({ category, subcategory }) => {
  try {
    if (!subcategory) {
      return false;
    }
    const res = await axios.get(
      `${URL}/products/v1/category/${category}/${subcategory}/?category.subCategory=${subcategory}&category.category=${category}&limit=3`,
      config
    );

    const data = await res.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};
