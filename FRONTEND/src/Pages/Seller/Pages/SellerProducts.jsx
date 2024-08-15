import { useCallback, useEffect, useState } from "react";
import DashBoardNavbar from "../SellerComponents/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { SortFilter } from "../../../Utils/SellerFilters";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import useDebounce from "../../../Hooks/useDebounce.Hook";
import { SellerProductActionRequest } from "../../../Stores/Saga/Actions/SellerProductsAction";
const SellerProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSortFilter] = useState("title");
  const [searchVal, setsearchVal] = useState("");
  // const [product_id, setIDProduct] = useState("");
  const handleOnchange = (e) => {
    e.preventDefault();
    setsearchVal(e.target.value);
  };
  const search = useDebounce(searchVal, 1000);
  const products = useSelector((state) => state.SellerProduct);
  const { isLoading } = useSelector((state) => state.loading);
  //MARK:Pagination
  const handleOnPrev = useCallback(() => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleOnNext = useCallback(() => {
    if (products?.products?.totalPages > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, products?.products?.totalPages]);

  useEffect(() => {
    const config = {
      currentPage,
      sort,
      search,
    };

    dispatch({
      type: SellerProductActionRequest.GET_ALL_PRODUCTS_SAGA_REQUEST,
      payload: config,
    });
  }, [dispatch, search, currentPage, sort]);
  // MARK:return
  return (
    <>
      <ToastContainer />

      <div className="relative ">
        <DashBoardNavbar name="All Products" />

        {/* SEE ALL PRODUCT  */}
        <section className="relative flex flex-col">
          {/* MARK:allproducts in table */}
          <div className="mt-5">
            <div className="grid mb-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:justify-end">
              <div className="w-full md:max-w-md lg:col-start-3 ">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    name="Search"
                    onChange={(e) => handleOnchange(e)}
                    value={searchVal}
                    id="search"
                    className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto ">
              <table className="table table-zebra lg:table-lg table-xs">
                {/* head */}
                <thead className="">
                  <tr className="">
                    {SortFilter.map((sortFilterVal, i) => {
                      return (
                        <th
                          key={i}
                          onClick={() => setSortFilter(sortFilterVal.filter)}
                          className="cursor-pointer "
                        >
                          <span className="flex items-center gap-1">
                            {sortFilterVal.name}
                            <HiMiniChevronUpDown />
                          </span>
                        </th>
                      );
                    })}
                    <th>Brand Logo</th>
                    <th>Details</th>
                  </tr>
                </thead>

                {/* row 1 */}

                {isLoading ? (
                  <tbody className="relative ">
                    {products?.products?.products &&
                      products?.products?.products.map((val, i) => {
                        return (
                          <tr key={i} className="table-row">
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar animate-pulse bg-black/20 skeleton">
                                  <div className="w-12 h-12 mask mask-squircle"></div>
                                </div>
                                <div>
                                  <div className="w-48 font-bold text-transparent truncate animate-pulse bg-black/20 skeleton">
                                    .
                                  </div>
                                  <div className="w-16 mt-1 text-sm text-transparent opacity-50 bg-black/20 skeleton">
                                    .
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-transparent ">
                              <span className="w-12 rounded-lg bg-black/20 skeleton">
                                ....................
                              </span>
                            </td>
                            <td className="text-transparent">
                              <span className="w-12 rounded-lg animate-pulse bg-black/20 skeleton">
                                ....................
                              </span>
                            </td>
                            <td className="text-transparent">
                              <span className="w-12 rounded-lg animate-pulse bg-black/20 skeleton">
                                ....................
                              </span>
                            </td>
                            <td className="text-transparent">
                              <span className="w-12 rounded-lg animate-pulse bg-black/20 skeleton">
                                ....................
                              </span>
                            </td>
                            <td className="text-transparent">
                              <div className="flex items-center gap-3 animate-pulse bg-black/20 skeleton">
                                <div className="avatar">
                                  <div className="w-12 h-12 mask mask-squircle">
                                    .z
                                  </div>
                                </div>
                              </div>
                            </td>
                            <th>
                              <button className="text-transparent animate-pulse bg-black/20 btn btn-outline btn-xs skeleton">
                                details
                              </button>
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                ) : (
                  <tbody className="relative">
                    {products?.products?.products &&
                      products?.products?.products.map((product, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="w-12 h-12 mask mask-squircle">
                                    <img
                                      src={product?.thumbnail?.img}
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="w-48 font-bold truncate">
                                    {product.title}
                                  </div>
                                  <div className="text-sm opacity-50">
                                    {product.category.category}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{product?.views} Views</td>
                            <td>{product?.qty}</td>
                            <td>
                              &#8377;{" "}
                              {product?.price?.mrp.toLocaleString("en-In")} /-
                            </td>
                            <td>
                              <div>
                                {new Date(
                                  product.updatedAt
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="w-12 h-12 mask mask-squircle">
                                    <img
                                      src={product?.brand?.logo?.img}
                                      alt="brand Logo"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              {/* <button
                                // onClick={() => setShowDetails(true)}
                                onClick={() =>
                                  handleOnShowDetailsClick(product._id)
                                }
                                className="btn btn-outline btn-xs"
                              >
                                details
                              </button> */}
                              <Link
                                to={`/dashboard/products/${product._id}`}
                                className="btn btn-outline btn-xs"
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </table>
              {/* <ModalOutsideClick
                backdrop={false}
                className="w-11/12 max-w-5xl"
                id="show_sellerProductDetails"
                title="Product Details"
              >
                <ProductDetails id={product_id} />
              </ModalOutsideClick> */}
            </div>
          </div>
        </section>

        {products?.products?.products === undefined &&
        products?.products?.products === undefined ? (
          <div className="flex justify-center w-full mt-32">
            <img
              src="/image/emptyList.png"
              alt="https://www.freepik.com/free-vector/hand-drawn-no-data-concept_55024598.htm#query=empty%20illustration&position=4&from_view=keyword&track=ais&uuid=5a57be2b-b6fb-4c9f-a966-701f8885f621"
              width={300}
              title="https://www.freepik.com/free-vector/hand-drawn-no-data-concept_55024598.htm#query=empty%20illustration&position=4&from_view=keyword&track=ais&uuid=5a57be2b-b6fb-4c9f-a966-701f8885f621"
            />
          </div>
        ) : (
          <div className="fixed bottom-0 flex items-center justify-between px-4 py-3 dark:bg-gray-800 bg-white border-t border-gray-200 w-[82%] sm:px-6">
            <div className="flex justify-between flex-1 sm:hidden">
              <button
                onClick={handleOnPrev}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-900 bg-white border border-gray-300 rounded-md btn hover:bg-gray-50 ${
                  products?.products?.page === 1 ? "btn-disabled" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleOnNext}
                className={`relative  inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700  dark:bg-gray-900  bg-white border border-gray-300 rounded-md btn hover:bg-gray-50 ${
                  products?.products?.page === products?.products?.totalPages
                    ? "btn-disabled"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="flex gap-1 text-sm text-gray-700 dark:text-white">
                  Showing
                  <span className="font-medium">
                    {products?.products?.pagePerLimit}
                  </span>
                  to
                  <span className="font-medium">
                    {products?.products?.productsPageTo}
                  </span>
                  of
                  <span className="font-medium">
                    {products?.products?.totalProducts}
                  </span>
                  results
                </p>
              </div>
              <div>
                <nav
                  className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                  aria-label="Pagination"
                >
                  <button
                    onClick={handleOnPrev}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <MdOutlineKeyboardArrowLeft className="text-xl" />
                  </button>
                  {/* Current: "z-10 bg-gray-900 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  {products?.products?.prevPages &&
                    products?.products?.prevPages.map((page, i) => {
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(page)}
                          className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black ring-1 ring-gray-300 focus:z-20 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {page}
                        </button>
                      );
                    })}
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-personal-50 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    {products?.products?.page}
                  </span>
                  {products?.products?.nextPages &&
                    products?.products?.nextPages.map((page, i) => {
                      return (
                        <button
                          onClick={() => setCurrentPage(page)}
                          key={i}
                          className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-gray-300 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                        >
                          {page}
                        </button>
                      );
                    })}
                  <button
                    onClick={handleOnNext}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <MdOutlineKeyboardArrowRight className="text-xl" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SellerProducts;

// products?.products?.products && (
//   <div className="flex justify-end gap-4">
//     <div className="join">
//       <button className="join-item btn btn-outline" onClick={handleOnPrev}>
//         Prev
//       </button>

//       {products?.products?.prevPages &&
//         products?.products?.prevPages.map((page, i) => {
//           return (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(page)}
//               className="join-item btn-outline btn"
//             >
//               {page}
//             </button>
//           );
//         })}
//       <button className="join-item btn-outline btn btn-disabled">...</button>

//       {products?.products?.nextPages &&
//         products?.products?.nextPages.map((page, i) => {
//           return (
//             <button
//               onClick={() => setCurrentPage(page)}
//               key={i}
//               className="join-item btn-outline btn"
//             >
//               {page}
//             </button>
//           );
//         })}
//       <button onClick={handleOnNext} className="join-item btn btn-outline">
//         Next
//       </button>
//     </div>
//   </div>
// );
