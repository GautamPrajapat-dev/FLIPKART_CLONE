import React, { useCallback, useRef, useState } from "react";
import DashBoardNavbar from "../../SellerComponents/DashboardNavbar";
import FormInputIcon from "../../../../Components/Inputs/FormInputIcon";

import Button from "../../../../Components/Buttons/Button";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AddNewProductSellerSaga } from "../../../../Stores/Slice/Seller.Product.Slice";
const SellerAddProducts = () => {
  const distpatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const [images, SetImages] = useState([]);
  // const [product, setProduct] = useState([
  //   {
  //     title: "",
  //     description: "",
  //     qty: 0,
  //     name: "",
  //     mrp: 0,
  //     cost: 0,
  //     discount: 0,
  //   },
  // ]);

  // const titleRef = useRef();
  // const descriptionRef = useRef();
  // const qtyRef = useRef(0);
  // const mrpRef = useRef(0);
  // const costRef = useRef(0);
  // const discountRef = useRef(0);
  // const nameRef = useRef();

  // title,description,category{category,subCategory},price{mrp,cost, discount,thumbnail,images logo=brandLogo

  // const handleSelectCategory = (e) => {
  //   setCategory(e.target.value);
  // };
  // const handleSubCategory = (e) => {
  //   setSubCategory(e.target.value);
  // };
  // const handleBrandLogo = (e) => {
  //   SetBrandLogo(e.target.files[0]);
  // };
  // const handleThumbnail = (e) => {
  //   SetThumbnail(e.target.files[0]);
  // };
  // const handleOnChange = useCallback(
  //   (e) => {
  //     const name = e.target.name;
  //     const value = e.target.value;
  //     setProduct({ ...product, [name]: value });
  //   },
  //   [product]
  // );
  const uploadMultipleFiles = (e) => {
    if (Array.from(e.target.files).length > 4) {
      e.preventDefault();
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
      SetImages(e.target.files);
      return;
    }
  };

  // formdata.append("images", allimages);
  // const data = {
  //   title: product.title || "",
  //   description: product.description || "",
  //   qty: product.qty || 0,
  //   brand: {
  //     name: product.name || "",
  //     logo: brandlogo,
  //   },
  //   category: {
  //     category: category,
  //     subCategory: subCategory,
  //   },
  //   price: {
  //     mrp: product.mrp || 0,
  //     cost: product.cost || 0,
  //     discount: product.discount || 0,
  //   },
  //   thumbnail: thumbnail,
  //   images: images,
  // };

  const FormRef = useRef();
  const imageRef = useRef();
  const handleOnClickSubmit = (e) => {
    let formdata = new FormData(FormRef.current);
    for (let i = 0; i < imageRef.length; i++) {
      formdata.append("images", images[i]);
    }

    console.log(...formdata);
    // formdata.append("title", product.title || "");
    // formdata.append("description", product.description || "");
    // formdata.append("price[mrp]", product.mrp || 0);
    // formdata.append("price[cost]", product.cost || 0);
    // formdata.append("price[discount]", product.discount || 0);
    // formdata.append("qty", product.qty || 0);
    // formdata.append("category[category]", category || "");
    // formdata.append("category[subCategory]", subCategory || "");
    // formdata.append("brand[name]", product.name || "");
    // formdata.append("brandLogo", brandlogo);
    // formdata.append("thumbnail", thumbnail);
    // for (let i = 0; i < images.length; i++) {
    //   formdata.append("images", images[i]);
    // }
    e.preventDefault();
    // distpatch(AddNewProductSellerSaga(formdata));
  };

  return (
    <div className="px-3">
      <ToastContainer />
      <DashBoardNavbar name="Add Products" />

      <section className="dark:text-white">
        <div className="flex flex-col gap-6 mt-5">
          <form
            onSubmit={handleOnClickSubmit}
            ref={FormRef}
            className="flex flex-col gap-6 "
          >
            <div className="flex flex-col gap-6">
              <FormInputIcon
                variant="sm-outlined"
                className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                type="text"
                name="title"
                placeholder="Title"
                passwordClassName="text-personal-900"
                iconClassName="text-personal-900"
                label="Title"
              />
              <div>
                <label htmlFor="Description" className="pl-2 font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  className="w-full px-3 py-2 pb-3 text-sm text-gray-900 bg-transparent border-2 border-blue-600 rounded-lg appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                  id="Description"
                  cols="30"
                  placeholder="Description"
                  rows="10"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <FormInputIcon
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="price[mrp]"
                  placeholder="mrp"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Mrp"
                />
                <FormInputIcon
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="price[cost]"
                  placeholder="cost"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Cost"
                />
                <FormInputIcon
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="price[discount]"
                  placeholder="discount"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Discount"
                />
                <FormInputIcon
                  variant="sm-outlined"
                  className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="number"
                  name="qty"
                  placeholder="Qunantity"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                  label="Qunantity"
                />
              </div>
              <div className="grid items-center grid-cols-12 gap-3 place-content-center ">
                <div className="flex flex-col col-span-5">
                  <label htmlFor="category" className="pl-2 font-semibold">
                    Select Category
                  </label>
                  <select
                    className="bg-transparent border-2 outline-none dark:bg-gray-600 dark:text-white border-personal-300 select select-primary focus:outline-none focus:ring-0"
                    name="category[category]"
                    id="category"
                  >
                    <option disabled value="DEFAULT">
                      Select Category
                    </option>
                    <option value="electronics">Electronics</option>
                    <option value="faishion">Faishion</option>
                    <option value="beauty">Beauty</option>
                    <option value="furniture">furniture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {FormRef === "Other" && (
                  <div className="col-span-7">
                    <FormInputIcon
                      variant="sm-outlined"
                      className=" text-personal-800 placeholder:text-personal-900/50 border-personal-300"
                      type="text"
                      name="category"
                      placeholder="email or Phone"
                      passwordClassName="text-personal-900"
                      iconClassName="text-personal-900"
                      label="Other Category"
                    />
                  </div>
                )}
              </div>
              <div className="grid items-center grid-cols-12 gap-3 place-content-center ">
                <div className="flex flex-col col-span-5">
                  <label htmlFor="subcategory" className="pl-2 font-semibold">
                    Select Sub Category
                  </label>
                  <select
                    className="bg-transparent border-2 outline-none dark:bg-gray-600 dark:text-white border-personal-300 select select-primary focus:outline-none focus:ring-0"
                    name="category[subCategory]"
                    id="subcategory"
                  >
                    <option disabled value="DEFAULT">
                      Select Sub Category
                    </option>
                    <option value="mens clothings">Men's Clothing</option>
                    <option value="womens clothings">Women's Clothing</option>
                    <option value="kid's clothing">Kid's Clothing</option>
                    <option value="furniture">Furniture</option>
                    <option value="women jwellery">Women's Jwellery</option>
                    <option value="laptop">Laptop</option>
                    <option value="mobile">Mobile</option>
                    <option value="laptop accessories">
                      Laptop Accessories
                    </option>
                    <option value="Mobile accessories">
                      Mobile Accessories
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {FormRef.current === "Other" && (
                  <div className="col-span-7">
                    <FormInputIcon
                      variant="sm-outlined"
                      className=" text-personal-800 placeholder:text-personal-900/50 border-personal-300"
                      type="text"
                      name="subCategory"
                      // onChange={handleOnChange}
                      placeholder="Enter Your Sub Category"
                      passwordClassName="text-personal-900"
                      iconClassName="text-personal-900"
                      label="Other Sub Category"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-3">
                  <FormInputIcon
                    variant="sm-outlined"
                    className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                    type="text"
                    name="brand[name]"
                    placeholder="Brand"
                    passwordClassName="text-personal-900"
                    iconClassName="text-personal-900"
                    label="Brand Name"
                  />
                </div>

                <div className="col-span-4 lg:col-span-1">
                  <FormInputIcon
                    variant="sm-outlined"
                    className="text-personal-800 file-input placeholder:text-personal-900/50 border-personal-300 "
                    type="file"
                    name="brandLogo"
                    placeholder="email or Phone"
                    passwordClassName="text-personal-900"
                    iconClassName="text-personal-900"
                    label="Brand Logo"
                  />
                </div>
              </div>
              <FormInputIcon
                variant="sm-outlined"
                className="text-personal-800 file-input placeholder:text-personal-900/50 border-personal-300 "
                type="file"
                name="thumbnail"
                placeholder="thumbnail"
                passwordClassName="text-personal-900"
                iconClassName="text-personal-900"
                label="Thumbnail"
              />
              <div>
                <label htmlFor="images" className={`pl-2 font-semibold `}>
                  Multiple Images
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="images"
                    maxLength={4}
                    ref={imageRef}
                    onChange={uploadMultipleFiles}
                    className="file-input-bordered file-input"
                    multiple
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              children={
                isLoading ? (
                  <span className="animate-ping">Uploading..</span>
                ) : (
                  "Add Product"
                )
              }
              className="py-2 text-white"
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default SellerAddProducts;
