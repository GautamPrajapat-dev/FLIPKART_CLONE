import { useRef, useState } from "react";
import DashBoardNavbar from "../SellerComponents/DashboardNavbar";
import FormInputIcon from "../../../Components/FormInputIcon";
import Button from "../../../Components/Button";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  ageFilter,
  Category,
  ganderFilter,
  SubCategory,
  targetPeople,
} from "../../../Utils/SellerFilters";
import { SellerProductActionRequest } from "../../../Stores/Saga/Actions/SellerProductsAction";
import { toastifyOptions } from "../../../Utils/tostifyDefault";
const SellerAddProducts = () => {
  const distpatch = useDispatch();
  const { isloading } = useSelector((state) => state.SellerProduct.addProduct);
  const FormRef = useRef();

  const handleOnClickSubmit = (e) => {
    e.preventDefault();
    if (FormRef.current.images.length > 4) {
      toast.warn(`Cannot upload files more than 4`, toastifyOptions);
      return;
    }
    let formdata = new FormData(FormRef.current);
    distpatch({
      type: SellerProductActionRequest.AddNewProductSellerSaga,
      payload: formdata,
    });
  };
  const [cat, setcat] = useState("Electronics");
  const handleOnChange = (e) => {
    setcat(e.target.value);
  };
  // console.log(cat);
  return (
    <>
      <ToastContainer stacked />
      <div className="">
        <DashBoardNavbar name="Add Products" />

        <section className=" dark:text-white">
          <div className="flex flex-col gap-6 mt-5">
            <form
              method="POST"
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
                    className="w-full px-3 py-2 pb-3 text-sm text-gray-900 bg-transparent border-2 border-blue-600 rounded-lg appearance-none dark:bg-gray-900 dark:text-white dark:border-gray-100 dark:focus:border-blue-500 focus:outline-none focus:ring-0 dark:placeholder:text-personal-100/50"
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
                  <div className="flex flex-col col-span-4">
                    <label htmlFor="category" className="pl-2 font-semibold">
                      Select Category
                    </label>
                    <select
                      className="bg-transparent border-2 outline-none dark:bg-gray-900 dark:border-white/30 dark:text-white border-personal-300 select select-primary focus:outline-none focus:ring-0"
                      name="category[category]"
                      id="category"
                      onChange={(e) => handleOnChange(e)}
                    >
                      {Category.map((_c, i) => {
                        return (
                          <option key={i} value={_c.value}>
                            {_c.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col col-span-4">
                    <label htmlFor="subcategory" className="pl-2 font-semibold">
                      Select Sub Category
                    </label>
                    <select
                      className="bg-transparent border-2 outline-none dark:border-white/30 dark:text-white dark:bg-gray-800 border-personal-300 select select-primary focus:outline-none focus:ring-0"
                      name="category[subCategory]"
                      id="subcategory"
                    >
                      {SubCategory.map((_sub, i) => (
                        <option key={i} value={_sub.value}>
                          {_sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col col-span-4">
                    <label
                      htmlFor="targetAudiences"
                      className="pl-2 font-semibold"
                    >
                      Select Target Audiance
                    </label>
                    <select
                      className="bg-transparent border-2 outline-none dark:border-white/30 dark:text-white dark:bg-gray-800 border-personal-300 select select-primary focus:outline-none focus:ring-0"
                      name="category[targetAudiences]"
                      id="targetAudiences"
                    >
                      {targetPeople.map((_sub, i) => (
                        <option key={i} value={_sub.value}>
                          {_sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid items-center grid-cols-12 gap-3 place-content-center ">
                  <div className="flex flex-col col-span-4">
                    <label htmlFor="gender" className="pl-2 font-semibold">
                      Select Gender
                    </label>
                    <select
                      className="bg-transparent border-2 outline-none dark:bg-gray-900 dark:border-white/30 dark:text-white border-personal-300 select select-primary focus:outline-none focus:ring-0"
                      name="category[gender]"
                      id="gender"
                    >
                      {ganderFilter.map((_c, i) => {
                        return (
                          <option key={i} value={_c} className="capitalize">
                            {_c}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col col-span-4">
                    <label htmlFor="Age" className="pl-2 font-semibold">
                      Select Age
                    </label>
                    <select
                      className="bg-transparent border-2 outline-none dark:bg-gray-900 dark:border-white/30 dark:text-white border-personal-300 select select-primary focus:outline-none focus:ring-0"
                      name="category[age]"
                      id="Age"
                    >
                      {ageFilter.map((_age, i) => {
                        return (
                          <option
                            key={i}
                            value={_age.ageRange}
                            className="capitalize"
                          >
                            {_age.name} / {_age.ageRange}
                          </option>
                        );
                      })}
                    </select>
                  </div>
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
                  placeholder="thumbnail image"
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
                      className="file-input-bordered file-input"
                      multiple
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                // eslint-disable-next-line react/no-children-prop
                children={
                  isloading ? (
                    <span className="animate-ping">Uploading..</span>
                  ) : (
                    "Add Product"
                  )
                }
                className="py-2 text-white bg-black"
              />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default SellerAddProducts;
