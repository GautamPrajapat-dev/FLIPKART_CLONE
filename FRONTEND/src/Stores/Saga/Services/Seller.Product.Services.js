import axios from "axios";

import { toast } from "react-toastify";
import { getTokenLocalStorageSeller } from "../../../Utils/LocalStorage";
const URL = process.env.REACT_APP_URL;
const token = getTokenLocalStorageSeller();

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

export const Signup = async () => {
  const res = await axios.post(`${URL}/seller/register`);
  const user = await res.data;
  return user;
};

// export const getSeller = async () => {
//   try {
//     const res = await axios.get(`${URL}/seller/sellerDetails`, config);
//     const data = await res.data.id;
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.warn(error);
//   }
// };

export const getDashBoardDetails = async () => {
  // http://localhost:3031/seller/products/v1/getDashbordDetails
  try {
    const res = await axios.get(
      `${URL}/seller/products/v1/getDashbordDetails`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;

    if (data.status === true) {
      toast.success(data.successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return data;
    } else {
      toast.warn(data.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {}
};

export const postNewProduct = async (productData) => {
  try {
    const res = await axios.post(
      `${URL}/seller/products/v1/add-product`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;

    if (data.status === true) {
      toast.success(data.successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return data;
    } else {
      toast.warn(data.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllProduct = async ({ currentPage, search, sort }) => {
  try {
    const res = await axios?.get(
      `${URL}/seller/products/v1/products/?fields=price,title,qty,thumbnail,brand,category,views,updatedAt&page=${currentPage}&limit=5&sort=${sort}&search=${search}`,
      config
    );
    const data = await res.data;
    if (data.status === true) {
      return data;
    } else {
      toast.warn(data.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProductService = async (id) => {
  if (!id) {
    return;
  }
  const res = await axios?.get(
    `${URL}/seller/products/v1/products/${id}`,
    config
  );
  const data = await res.data;
  if (data.status === true) {
    return data;
  } else {
    console.log(data.errorMessage);
  }
};
export const updateProductService = async ({ id, formData }) => {
  if (!id) {
    return;
  }
  const res = await axios?.put(
    `${URL}/seller/products/v1/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    window.location.href = "/dashboard/products";

    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const updateBrandLogoService = async ({ id, brandLogo }) => {
  if (!id) {
    return;
  }
  const res = await axios?.put(
    `${URL}/seller/products/v1/brandlogo/${id}`,
    brandLogo,
    config
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const updateImageService = async ({ id, images }) => {
  if (!id) {
    return;
  }
  const res = await axios?.put(
    `${URL}/seller/products/v1/updateImage/${id}`,
    images,
    config
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const updateThumbnailService = async ({ id, thumb }) => {
  if (!id) {
    return;
  }
  const res = await axios?.put(
    `${URL}/seller/products/v1/thumbnail/${id}`,
    thumb,
    config
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const deleteProductService = async (id) => {
  if (!id) {
    return;
  }
  const res = await axios?.delete(
    `${URL}/seller/products/v1/products/${id}`,
    config
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
