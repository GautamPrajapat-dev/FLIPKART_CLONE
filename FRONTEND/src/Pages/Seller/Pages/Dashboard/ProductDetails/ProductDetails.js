import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_SINGLE_PRODUCT_SAGA,
  UPDATE_SELLER_BRAND_LOGO_SAGA,
  UPDATE_SELLER_MULTIPLE_IMAGES_SAGA,
  UPDATE_SELLER_PRODUCTS_SAGA,
  UPDATE_SELLER_THUMBNAIL_SAGA,
} from "../../../../../Stores/Slice/Seller.Product.Slice";
import FormInput from "../../../../../Components/Inputs/FormInput";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import DashboardNavbar from "../../../SellerComponents/DashboardNavbar";
import { useParams } from "react-router-dom";
import ModalOutsideClick from "../../../../../Components/Dialoag/ModalOutsideClick";
import { ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const FormatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: "block", textAlign: "left" }}>id: {item.id}</span> */}
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };
  const categoryList = [
    {
      id: 1,
      name: "mens clothings",
    },
    {
      id: 2,
      name: "womens clothings",
    },
    {
      id: 3,
      name: "kid's clothing",
    },
    {
      id: 4,
      name: "furniture",
    },
    {
      id: 5,
      name: "women jwellery",
    },
    {
      id: 6,
      name: "laptop",
    },
    {
      id: 7,
      name: "mobile",
    },
    {
      id: 8,
      name: "mobile accessories",
    },
    {
      id: 9,
      name: "laptop accessories",
    },
    { other: 10, name: "other" },
  ];

  const categoryListMain = [
    {
      id: 1,
      name: "electronics",
    },
    {
      id: 2,
      name: "faishion",
    },
    {
      id: 3,
      name: "beauty",
    },
    {
      id: 4,
      name: "furniture",
    },
    {
      id: 5,
      name: "other",
    },
  ];

  const { id } = useParams();
  const dispatch = useDispatch();
  const [model, setOpenModel] = useState(false);

  const product = useSelector((state) => state?.SellerProduct?.product);
  const brand = useSelector((state) => state?.SellerProduct);
  const { isLoading } = useSelector((state) => state?.loading);

  const [multipleImage, setMultipleImage] = useState([]);
  const [multipleImageUrl, setMultipleImageURL] = useState([]);
  const [multipleImageModel, setMultipleImageModel] = useState(false);
  const [subCategoryVal, setSubCategoryVal] = useState("");
  const [CategoryVal, setCategoryVal] = useState("");
  const title = useRef(null);
  const qty = useRef(null);
  const description = useRef(null);
  const priceMrp = useRef(null);
  const priceCost = useRef(null);
  const priceDiscount = useRef(null);
  const brandName = useRef(null);
  const handleOnSelectSubCategory = (item) => {
    setSubCategoryVal(item.name);
  };
  const handleOnSelectCategory = (item) => {
    setCategoryVal(item.name);
  };
  useEffect(() => {
    if (id) {
      title.current.value = product?.product?.title;
      description.current.value = product?.product?.description;
      brandName.current.value = product?.product?.brand?.name;
      priceMrp.current.value = product?.product?.price?.mrp;
      priceCost.current.value = product?.product?.price?.cost;
      priceDiscount.current.value = product?.product?.price?.discount;
      qty.current.value = product?.product?.qty;
    }
    dispatch(GET_SINGLE_PRODUCT_SAGA(id));
  }, [
    dispatch,
    id,
    product?.product?.brand?.name,
    product?.product?.title,
    product?.product?.description,
    product?.product?.price?.cost,
    product?.product?.price?.discount,
    product?.product?.price?.mrp,
    product?.product?.qty,
  ]);

  const handleOnImageUlpload = (e) => {
    const images = e.target.files;
    if (Array.from(images).length > 4) {
      e.target.value = "";
      alert("Cannot upload files more than 4");
      return false;
    }
    setMultipleImage(images);
    const newURls = [];
    for (const file of images) {
      newURls.push(URL.createObjectURL(file));
    }
    setMultipleImageURL(newURls);
  };

  const handleOnImageUlploadMultiple = () => {
    const images = new FormData();
    for (let i = 0; i < multipleImage.length; i++) {
      images.append("images", multipleImage[i]);
    }
    dispatch(UPDATE_SELLER_MULTIPLE_IMAGES_SAGA({ id, images }));
  };
  const handleOnUpdateDetails = () => {
    const formData = new FormData();
    formData.append("title", title.current.value);
    formData.append("qty", qty.current.value);
    formData.append("price[mrp]", priceMrp.current.value);
    formData.append("price[cost]", priceCost.current.value);
    formData.append("price[discount]", priceDiscount.current.value);
    formData.append("brand[name]", brandName.current.value);
    formData.append("description", description.current.value);

    if (subCategoryVal !== "") {
      formData.append(
        "category[subCategory]",
        product?.product?.category.subCategory
      );
    }
    if (CategoryVal !== "") {
      formData.append(
        "category[category]",
        product?.product?.category.category
      );
    }

    dispatch(
      UPDATE_SELLER_PRODUCTS_SAGA({
        id,
        formData,
      })
    );
  };

  const handleOnClickBrandLogo = () => {
    setOpenModel(true);
  };
  const [brandlogo, setBrandLogo] = useState();
  const [brandLogoImgLink, setBrandLogoImg] = useState("");
  const updateBrandLogo = (e) => {
    setBrandLogo(e.target.files[0]);
    setBrandLogoImg(URL.createObjectURL(e.target.files[0]));
  };
  const UpdateBrandLogo = () => {
    const brandLogo = new FormData();
    brandLogo.append("brandLogo", brandlogo);
    dispatch(UPDATE_SELLER_BRAND_LOGO_SAGA({ id, brandLogo }));
  };

  const [thubnailSeller, setThumbnail] = useState();
  const [thubnailSellerImgLink, setThumbnailLink] = useState("");
  const [thubnailmodel, setThumbnailModel] = useState(false);
  const updateThumbnailSeller = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailLink(URL.createObjectURL(e.target.files[0]));
  };

  const UpdateThumbnail = () => {
    const thumb = new FormData();
    thumb.append("thumbnail", thubnailSeller);
    dispatch(UPDATE_SELLER_THUMBNAIL_SAGA({ id, thumb }));
  };
  useEffect(() => {
    if (brand?.Brand_logo?.status === true) {
      setOpenModel(false);
      dispatch(GET_SINGLE_PRODUCT_SAGA(id));
    }
    if (brand?.thumbnail?.status === true) {
      setThumbnailModel(false);
      dispatch(GET_SINGLE_PRODUCT_SAGA(id));
    }
    if (brand?.Images?.status === true) {
      setMultipleImageModel(false);
      dispatch(GET_SINGLE_PRODUCT_SAGA(id));
    }
  }, [
    brand?.Brand_logo?.status,
    id,
    brand?.thumbnail?.status,
    brand?.Images?.status,
    dispatch,
  ]);

  return (
    <>
      <ToastContainer />
      <div className="px-3 overflow-y-scroll bg-white dark:bg-gray-900 no-scroll">
        <DashboardNavbar name="Product Details/Update" />

        <section className="dark:text-white ">
          <div className="flex flex-col gap-6 mt-5">
            <div className="flex flex-col gap-6">
              <FormInput
                variant="sm-outlined"
                className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                type="text"
                name="title"
                ref={title}
                placeholder="Title"
                passwordClassName="text-personal-900"
                iconClassName="text-personal-900"
                label="Title"
              />
              <div className="relative">
                <textarea
                  name="description"
                  className="w-full px-3 py-2 pb-3 text-sm text-gray-900 bg-transparent border-2 border-blue-600 rounded-lg appearance-none peer dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                  id="Description"
                  cols="30"
                  ref={description}
                  rows="10"
                ></textarea>
                <label
                  htmlFor="Description"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-40 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:mx-3 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Description
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <FormInput
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="mrp"
                  ref={priceMrp}
                  placeholder="mrp"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Mrp"
                />
                <FormInput
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="cost"
                  ref={priceCost}
                  placeholder="cost"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Cost"
                />
                <FormInput
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="discount"
                  ref={priceDiscount}
                  placeholder="discount"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Discount"
                />
                <FormInput
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="qty"
                  ref={qty}
                  placeholder="Qunantity"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Qunantity"
                />
              </div>
              <div className="grid grid-cols-2 col-span-12 gap-3 lg:col-span-7">
                {/* MARK:Brand Content */}

                <FormInput
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="text"
                  ref={brandName}
                  name="name"
                  placeholder="Brand"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Brand Name"
                />
                <div className="flex items-center space-x-6 ">
                  <div
                    onClick={() =>
                      document.getElementById("showBrandLogo").showModal()
                    }
                    className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  >
                    <img
                      className="object-cover w-16 h-16 rounded-full"
                      src={
                        product?.product?.brand?.logo?.img
                          ? product?.product?.brand?.logo?.img
                          : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                      }
                      alt="Current profile"
                      loading="lazy"
                    />
                    <ModalOutsideClick id="showBrandLogo">
                      <img
                        className="object-cover "
                        src={product?.product?.brand?.logo?.img}
                        alt="Current profile"
                        loading="lazy"
                      />
                    </ModalOutsideClick>
                  </div>
                  <button
                    onClick={handleOnClickBrandLogo}
                    className="btn btn-link"
                  >
                    Update Brand Logo
                  </button>
                </div>
              </div>
              <div className="grid items-center grid-cols-12 gap-3 place-content-center">
                <div className="relative col-span-6 border rounded-lg peer border-personal-300 focus-within:ring-1">
                  <ReactSearchAutocomplete
                    className="z-40 dark:bg-gray-900"
                    id="category"
                    showIcon={false}
                    styling={{
                      boxShadow: 0,
                      borderRadius: "0.5rem",
                      border: 0,
                      backgroundColor: "rgba(255, 255, 255, 0)",
                    }}
                    maxResults={3}
                    items={categoryListMain}
                    placeholder={product?.product?.category?.category}
                    inputDebounce={300}
                    // onSearch={handleOnSelect}
                    // onHover={handleOnHover}
                    onSelect={handleOnSelectCategory}
                    // onFocus={handleOnFocus}
                    autoFocus
                    formatResult={FormatResult}
                  />
                  <label
                    htmlFor="category"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-40 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:mx-3 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Category
                  </label>
                  <FormatResult />
                </div>

                {CategoryVal === "other" && (
                  <div className="col-span-6">
                    <FormInput
                      variant="lg-outlined"
                      className=" text-personal-800 placeholder:text-personal-900/50 border-personal-300"
                      type="text"
                      name="category"
                      // onChange={handleOnChange}
                      passwordClassName="text-personal-900"
                      iconClassName="text-personal-900"
                      label="Other Category"
                    />
                  </div>
                )}
              </div>
              <div className="relative grid grid-cols-12 gap-3 ">
                <div className="col-span-6 border rounded-lg peer border-personal-300 focus-within:ring-1">
                  <ReactSearchAutocomplete
                    className="z-20 "
                    id="subcategory"
                    showIcon={false}
                    styling={{
                      boxShadow: 0,
                      borderRadius: "0.5rem",
                      border: 0,
                      backgroundColor: "rgba(255, 255, 255, 0)",
                    }}
                    maxResults={3}
                    items={categoryList}
                    placeholder={product?.product?.category?.subCategory}
                    // onSearch={handleOnSelectSubCategory}
                    // onHover={handleOnHover}
                    onSelect={handleOnSelectSubCategory}
                    // onFocus={handleOnFocus}
                    autoFocus
                    formatResult={FormatResult}
                  />
                  <label
                    htmlFor="subcategory"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-20 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:mx-3 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    SubCategory
                  </label>
                  <FormatResult />
                </div>
                {subCategoryVal === "other" && (
                  <div className="col-span-6">
                    <FormInput
                      variant="lg-outlined"
                      className=" text-personal-800 placeholder:text-personal-900/50 border-personal-300"
                      type="text"
                      name="category"
                      // onChange={handleOnChange}
                      passwordClassName="text-personal-900"
                      iconClassName="text-personal-900"
                      label="Other SubCategory"
                    />
                  </div>
                )}
              </div>
              <div className="">
                <div className="flex items-center space-x-6">
                  <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      onClick={() =>
                        document.getElementById("showThumbnail").showModal()
                      }
                      className="object-cover w-16 h-16 rounded-full cursor-pointer"
                      src={
                        product?.product?.thumbnail?.img
                          ? product?.product?.thumbnail?.img
                          : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                      }
                      alt="Current profile"
                      loading="lazy"
                      title="Show Thumbanil"
                    />
                    {product?.product?.thumbnail?.img && (
                      <ModalOutsideClick id="showThumbnail">
                        <img src={product?.product?.thumbnail?.img} alt="" />
                      </ModalOutsideClick>
                    )}
                  </div>
                  <button
                    className="btn btn-link"
                    onClick={() => setThumbnailModel(true)}
                  >
                    Thumbnail Update
                  </button>
                </div>
              </div>
              {/* MARK: upade /brand / images */}

              <div>
                <div className="flex items-center">
                  <div className="-space-x-3 ">
                    {product?.product?.images &&
                      product?.product?.images.map((image, index) => {
                        return (
                          <div key={index} className="avatar">
                            <div className="w-12 rounded-full ring-primary ring ring-offset-base-100 ring-offset-2">
                              <img
                                src={image.img}
                                alt="Current profile"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <button
                    className="btn btn-link"
                    onClick={() => setMultipleImageModel(true)}
                  >
                    Add Multiple Image
                  </button>
                  <ModalOutsideClick
                    open={multipleImageModel ? "modal-open" : ""}
                    id="addMultipleImage"
                  >
                    <div className="flex flex-col gap-4">
                      <form className="flex flex-col items-center gap-4 space-x-6">
                        <div className="space-x-1">
                          {multipleImageUrl &&
                            multipleImageUrl.map((image, index) => {
                              return (
                                <div key={index} className="avatar ">
                                  <div className="w-24 rounded-full ring-primary ring ring-offset-base-100 ring-offset-2">
                                    <img
                                      src={
                                        image !== undefined
                                          ? image
                                          : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                                      }
                                      alt="Current profile"
                                      loading="lazy"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div className="flex">
                          <label className="block">
                            <span className="sr-only">
                              Choose profile photo
                            </span>
                            <input
                              type="file"
                              minLength={4}
                              maxLength={4}
                              onChange={handleOnImageUlpload}
                              multiple={true}
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                            />
                          </label>
                          <button
                            type="reset"
                            className="btn btn-circle"
                            onClick={() =>
                              setMultipleImageURL([
                                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80",
                              ])
                            }
                          >
                            X
                          </button>
                        </div>
                      </form>
                      <div className="flex gap-4">
                        <div
                          className="w-3/4 btn btn-secondary"
                          onClick={handleOnImageUlploadMultiple}
                        >
                          {isLoading ? (
                            <span className="animate-pulse">Updating...</span>
                          ) : (
                            "Update"
                          )}
                        </div>
                        <button
                          type="reset"
                          className="w-2/12 btn btn-danger"
                          onClick={() => setMultipleImageModel(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </ModalOutsideClick>
                </div>
              </div>
              {/*MARK:Add product Btn */}
              <div
                onClick={handleOnUpdateDetails}
                children="Add Product "
                className="py-2 btn btn-neutral"
              >
                Add Product
              </div>
            </div>
          </div>
        </section>
      </div>

      <ModalOutsideClick
        id="brandLogo"
        title="Update Brand Logo"
        open={model ? "modal-open" : ""}
      >
        <div className="flex flex-col gap-4">
          <form className="flex items-center gap-4 space-x-6">
            <div className="avatar ">
              <div className="w-32">
                <img
                  className="object-cover w-16 h-16 rounded-full "
                  src={
                    brandLogoImgLink !== ""
                      ? brandLogoImgLink
                      : "https://cdn.icon-icons.com/icons2/3214/PNG/512/cloud_file_upload_server_icon_196427.png"
                  }
                  alt="update_profile"
                />
              </div>
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                onChange={updateBrandLogo}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
              />
            </label>
            <button
              type="reset"
              className="btn btn-circle"
              onClick={() =>
                setBrandLogoImg(
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                )
              }
            >
              X
            </button>
          </form>
          <div className="flex gap-4">
            <div className="w-3/4 btn btn-secondary" onClick={UpdateBrandLogo}>
              {isLoading ? (
                <span className="animate-pulse">Updating...</span>
              ) : (
                "Update"
              )}
            </div>
            <button
              type="reset"
              className="w-2/12 btn btn-danger"
              onClick={() => setOpenModel(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalOutsideClick>
      <ModalOutsideClick
        title="Update Thumbanil"
        id="brandLogo"
        open={thubnailmodel ? "modal-open" : ""}
      >
        <div className="flex flex-col gap-4">
          <form className="flex items-center gap-4 space-x-6">
            <div className="avatar">
              <div className="w-32">
                <img
                  className="object-cover w-16 h-16 rounded-full"
                  src={
                    thubnailSellerImgLink !== ""
                      ? thubnailSellerImgLink
                      : "https://cdn.icon-icons.com/icons2/3214/PNG/512/cloud_file_upload_server_icon_196427.png"
                  }
                  alt="update_profile"
                />
              </div>
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                onChange={updateThumbnailSeller}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
              />
            </label>
            <button
              type="reset"
              className="btn btn-circle"
              onClick={() =>
                setBrandLogoImg(
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                )
              }
            >
              X
            </button>
          </form>
          <div className="flex gap-4">
            <div className="w-3/4 btn btn-secondary" onClick={UpdateThumbnail}>
              {isLoading ? (
                <span className="animate-pulse">Updating...</span>
              ) : (
                "Update"
              )}
            </div>
            <button
              type="reset"
              className="w-2/12 btn btn-danger"
              onClick={() => setThumbnailModel(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalOutsideClick>
    </>
  );
};

export default ProductDetails;
