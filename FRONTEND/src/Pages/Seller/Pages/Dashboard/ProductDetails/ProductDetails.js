import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_SINGLE_PRODUCT_SAGA } from "../../../../../Stores/Slice/Seller.Product.Slice";
import FormInput from "../../../../../Components/Inputs/FormInput";
import Button from "../../../../../Components/Buttons/Button";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ToastContainer, toast } from "react-toastify";

const FormatResult = (item) => {
  return (
    <>
      {/* <span style={{ display: "block", textAlign: "left" }}>id: {item.id}</span> */}
      <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
    </>
  );
};

const ProductDetails = ({ id }) => {
  const [subCategoryVal, setSubCategoryVal] = useState("");
  const [CategoryVal, setCategoryVal] = useState("");
  const [multipleImage, setMultipleImage] = useState([]);
  const [multipleImageUrl, setMultipleImageURL] = useState();
  const product = useSelector((state) => state?.SellerProduct?.product);
  const title = useRef(null);
  const qty = useRef(null);
  const description = useRef(null);
  const priceMrp = useRef(null);
  const priceCost = useRef(null);
  const priceDiscount = useRef(null);
  const brandName = useRef(null);
  // const category = useRef(null);
  // const subCategory = useRef(null);
  const dispatch = useDispatch();

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
      // category.current.value = product?.product?.category.category;
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
    product?.product?.category.category,
    product?.product?.price?.cost,
    product?.product?.price?.discount,
    product?.product?.price?.mrp,
    product?.product?.qty,
  ]);

  const handleOnImageUlpload = (e) => {
    const images = e.target.files;

    if (Array.from(images).length > 4) {
      toast.warn(`Cannot upload files more than 4`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    setMultipleImage([...images]);
    const newURls = [];
    for (const file of images) {
      newURls.push(URL.createObjectURL(file));
    }

    setMultipleImageURL(newURls);
  };
  return (
    <>
      <div className="sticky">
        <ToastContainer />
      </div>
      <div className="mt-3">
        {
          <section className="dark:text-white">
            <div className="flex flex-col gap-6 mt-5">
              <form className="flex flex-col gap-6 ">
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
                      className="w-full px-3 py-2 pb-3 text-sm text-gray-900 bg-transparent border-2 border-blue-600 rounded-lg appearance-none peer dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
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

                  <div className="grid items-center grid-cols-12 gap-3 place-content-center">
                    <div className="relative col-span-6 border rounded-lg peer border-personal-300 focus-within:ring-1">
                      <ReactSearchAutocomplete
                        className="z-40"
                        id="category"
                        showIcon={false}
                        styling={{
                          boxShadow: 0,
                          borderRadius: "0.5rem",
                        }}
                        maxResults={3}
                        items={categoryListMain}
                        placeholder={product?.product?.category.category}
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
                        }}
                        maxResults={3}
                        items={categoryList}
                        placeholder={product?.product?.category.subCategory}
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

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 lg:col-span-7">
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
                    </div>

                    <div className="col-span-12 lg:col-span-5">
                      {/* <FormInput
                        variant="sm-outlined"
                        className="text-personal-800 file-input placeholder:text-personal-900/50 border-personal-300 "
                        type="file"
                        name="brandLogo"
                        placeholder="email or Phone"
                        passwordClassName="text-personal-900"
                        iconClassName="text-personal-900"
                        label="Brand Logo"
                      /> */}
                      <div className="flex items-center space-x-6">
                        <div className="shrink-0">
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
                        </div>
                        <label className="block">
                          <span className="sr-only">Choose profile photo</span>
                          <input
                            type="file"
                            placeholder=""
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2">
                    {/* <FormInput
                      variant="sm-outlined"
                      className="text-personal-800 file-input placeholder:text-personal-900/50 border-personal-300 "
                      type="file"
                      name="thumbnail"
                      placeholder="thumbnail"
                      passwordClassName="text-personal-900"
                      iconClassName="text-personal-900"
                      label="Thumbnail"
                    /> */}
                    <div className="flex flex-col items-center space-x-6">
                      <label htmlFor="thumbnail" className="py-5 font-semibold">
                        Add Thumbnail
                      </label>
                      <div className="shrink-0">
                        <img
                          className="object-cover w-16 h-16 rounded-full"
                          src={
                            product?.product?.thumbnail.img
                              ? product?.product?.thumbnail.img
                              : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                          }
                          alt="Current profile"
                          loading="lazy"
                        />
                      </div>
                      <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                          type="file"
                          name="thumbnail"
                          id="thumbnail"
                          placeholder=""
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    {/* <label htmlFor="images" className={`pl-2 font-semibold `}>
                      Multiple Images
                    </label> */}
                    {/* <div className="relative">
                      <input
                        type="file"
                        name="images"
                        maxLength={4}
                        // onChange={uploadMultipleFiles}
                        className="file-input-bordered file-input"
                        multiple
                      />
                    </div> */}
                    <div className="flex flex-col items-center justify-center space-x-6 border-t-2">
                      <label htmlFor="thumbnail" className="py-5 font-semibold">
                        Add Images Your Products
                      </label>
                      <div className="flex justify-center gap-4">
                        {multipleImageUrl
                          ? multipleImageUrl &&
                            multipleImageUrl.map((image, index) => {
                              return (
                                <img
                                  className="inline-block object-cover w-1/5 h-24 "
                                  key={index}
                                  src={
                                    image !== undefined
                                      ? image
                                      : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                                  }
                                  alt="Current profile"
                                  loading="lazy"
                                />
                              );
                            })
                          : product?.product?.images &&
                            product?.product?.images.map((image, index) => {
                              return (
                                <img
                                  className="inline-block object-cover w-1/5 h-24 "
                                  key={index}
                                  src={
                                    product?.product?.images
                                      ? image.img
                                      : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                                  }
                                  alt="Current profile"
                                  loading="lazy"
                                />
                              );
                            })}
                      </div>
                      <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                          type="file"
                          name="multiple images"
                          id="thumbnail"
                          placeholder=""
                          onChange={handleOnImageUlpload}
                          multiple={true}
                          className="block w-full mt-5 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-violet-100 hover:file:bg-violet-100 "
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  // onClick={handleOnClickSubmit}
                  children="Add Product "
                  className="py-2"
                />
              </form>
            </div>
          </section>
        }
      </div>
    </>
  );
};

export default ProductDetails;

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
