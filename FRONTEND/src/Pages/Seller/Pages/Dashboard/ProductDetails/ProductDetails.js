import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_SINGLE_PRODUCT_SAGA } from "../../../../../Stores/Slice/Seller.Product.Slice";
import FormInput from "../../../../../Components/Inputs/FormInput";
import Button from "../../../../../Components/Buttons/Button";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const formatResult = (item) => {
  return (
    <>
      {/* <span style={{ display: "block", textAlign: "left" }}>id: {item.id}</span> */}
      <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
    </>
  );
};

const ProductDetails = ({ id }) => {
  const product = useSelector((state) => state.SellerProduct.product);

  const title = useRef(null);
  const qty = useRef(null);
  const description = useRef(null);
  const priceMrp = useRef(null);
  const priceCost = useRef(null);
  const priceDiscount = useRef(null);
  const category = useRef(null);
  const subCategory = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      title.current.value = product?.product?.title;
      description.current.value = product?.product?.description;
      category.current.value = product?.product?.category.category;
      // subCategory.current.value = product?.product?.category.subCategory;
      priceMrp.current.value = product?.product?.price?.mrp;
      priceCost.current.value = product?.product?.price?.cost;
      priceDiscount.current.value = product?.product?.price?.discount;
      qty.current.value = product?.product?.qty;
    }

    dispatch(GET_SINGLE_PRODUCT_SAGA(id));
  }, [
    dispatch,
    id,
    // product?.product?.category.subCategory,
    product?.product?.title,
    product?.product?.description,
    product?.product?.category.category,
    product?.product?.price?.cost,
    product?.product?.price?.discount,
    product?.product?.price?.mrp,
    product?.product?.qty,
  ]);
  return (
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
                <div>
                  <label htmlFor="Description" className="pl-2 font-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-3 py-2 pb-3 text-sm text-gray-900 bg-transparent border-2 border-blue-600 rounded-lg appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    id="Description"
                    cols="30"
                    ref={description}
                    placeholder="Description"
                    rows="10"
                  ></textarea>
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
                <div className="grid items-center grid-cols-12 gap-3 place-content-center ">
                  <div className="flex flex-col col-span-5">
                    <label htmlFor="category" className="pl-2 font-semibold">
                      Select Category
                    </label>
                    <select
                      className="bg-transparent border-2 outline-none dark:bg-gray-600 dark:text-white border-personal-300 select select-primary focus:outline-none focus:ring-0"
                      name="category"
                      ref={category}
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
                  {/* { === "Other" && (
                      <div className="col-span-7">
                        <FormInput
                          variant="sm-outlined"
                          className=" text-personal-800 placeholder:text-personal-900/50 border-personal-300"
                          type="text"
                          name="category"
                          icon={<IoMailOutline />}
                          placeholder="email or Phone"
                          onChange={handleOnChange}
                          passwordClassName="text-personal-900"
                          iconClassName="text-personal-900"
                          label="Other Category"
                        />
                      </div>
                    )} */}
                </div>
                <ReactSearchAutocomplete
                  className="active:shadow-none focus-within:shadow-none"
                  showIcon={false}
                  maxResults={3}
                  items={categoryList}
                  // ref={subCategory}
                  // onSearch={handleOnSearch}
                  // onHover={handleOnHover}
                  // onSelect={handleOnSelect}
                  // onFocus={handleOnFocus}
                  autoFocus
                  formatResult={formatResult}
                />
                <formatResult />
                {/* <div className="grid items-center grid-cols-12 gap-3 place-content-center ">
                  <div className="flex flex-col col-span-5">
                    <label htmlFor="subcategory" className="pl-2 font-semibold">
                      Select Sub Category
                    </label>

                    <select
                      className="bg-transparent border-2 outline-none dark:bg-gray-600 dark:text-white border-personal-300 select select-primary focus:outline-none focus:ring-0"
                      // value={subCategory}
                      name="subCategory"
                      ref={subCategory}
                      // onChange={handleSubCategory}
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
                  {"subCategory" === "Other" && (
                    <div className="col-span-7">
                      <FormInput
                        variant="sm-outlined"
                        className=" text-personal-800 placeholder:text-personal-900/50 border-personal-300"
                        type="text"
                        name="subCategory"
                        placeholder="Enter Your Sub Category"
                        passwordClassName="text-personal-900"
                        iconClassName="text-personal-900"
                        label="Other Sub Category"
                      />
                    </div>
                  )}
                </div> */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4 lg:col-span-3">
                    <FormInput
                      variant="sm-outlined"
                      className="text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                      type="text"
                      name="name"
                      placeholder="Brand"
                      passwordClassName="text-personal-900"
                      iconClassName="text-personal-900"
                      label="Brand Name"
                    />
                  </div>

                  <div className="col-span-4 lg:col-span-1">
                    <FormInput
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
                <FormInput
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
                      // onChange={uploadMultipleFiles}
                      className="file-input-bordered file-input"
                      multiple
                    />
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
];
