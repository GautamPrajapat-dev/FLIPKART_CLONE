import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
const URL = "http://localhost:3031/seller";
const token = localStorage.getItem("_token");
if (token !== "") {
  try {
    let decodedToken = jwtDecode(token);
    // JWT exp is in seconds
    if (Date.now() >= decodedToken.exp * 1000) {
      console.log("Token expired.");
      localStorage.clear();
    }
  } catch (error) {
    console.log(error);
  }
}

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

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
export const Signup = async () => {
  const res = await axios.post(`${URL}/register`);
  const user = await res.data;
  return user;
};

export const getSeller = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3031/seller/sellerDetails",
      config
    );
    const data = await res.data.id;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const postNewProduct = async (productData) => {
  try {
    const res = await axios.post(
      `${URL}/products/v1/add-product`,
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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return data;
    } else {
      toast.warn(data.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllProduct = async ({
  currentPage,
  views,
  price,
  qty,
  title,
}) => {
  const pageNum = currentPage || 1;
  try {
    const res = await axios?.get(
      `${URL}/products/v1/products/?fields=price,title,qty,thumbnail,brand,category,views,updatedAt&page=${pageNum}&limit=5&sort=${views},${title},${qty},${price}`,
      config
    );
    const data = await res.data;
    if (data.status === true) {
      return data;
    } else {
      toast.warn(data.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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
  const res = await axios?.get(`${URL}/products/v1/products/${id}`, config);
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
  const res = await axios?.put(`${URL}/products/v1/products/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
export const updateBrandLogoService = async ({ id, brandLogo }) => {
  if (!id) {
    return;
  }
  const res = await axios?.put(
    `${URL}/products/v1/brandlogo/${id}`,
    brandLogo,
    config
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
export const updateImageService = async ({ id, images }) => {
  if (!id) {
    return;
  }
  const res = await axios?.put(
    `${URL}/products/v1/updateImage/${id}`,
    images,
    config
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
export const updateThumbnailService = async ({ id, thumb }) => {
  if (!id) {
    return;
  }
  const res = await axios?.put(
    `${URL}/products/v1/thumbnail/${id}`,
    thumb,
    config
  );

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
export const deleteProductService = async (id) => {
  if (!id) {
    return;
  }
  const res = await axios?.delete(`${URL}/products/v1/products/${id}`, config);

  const data = await res.data;

  if (data.status === true) {
    toast.success(data.successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return data;
  } else {
    toast.warn(data.errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
