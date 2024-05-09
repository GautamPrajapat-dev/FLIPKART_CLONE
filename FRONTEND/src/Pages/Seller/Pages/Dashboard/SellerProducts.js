import React, { useCallback, useEffect, useState } from "react";
import DashBoardNavbar from "../../SellerComponents/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRODUCTS_SAGA } from "../../../../Stores/Slice/Seller.Product.Slice";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { SortFilter } from "../../../../Utils/SellerFilters";
import { HiMiniChevronUpDown } from "react-icons/hi2";
const SellerProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSortFilter] = useState("-createdAt");

  // const [product_id, setIDProduct] = useState("");
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
    if (products?.products?.totalPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, products?.products?.totalPage]);

  useEffect(() => {
    const config = {
      currentPage,
      sort,
    };
    if (products?.products?.products?.length !== 0) {
      dispatch(GET_ALL_PRODUCTS_SAGA(config));
    }
    return () => dispatch(GET_ALL_PRODUCTS_SAGA());
  }, [dispatch, products?.products?.products?.length, currentPage, sort]);
  // MARK:return
  return (
    <>
      <ToastContainer />

      <div className="md:px-3 ">
        <DashBoardNavbar name="All Products" />

        {/* SEE ALL PRODUCT  */}
        <section className="flex flex-col">
          {/* FILTER */}
          <div className="w-full my-7">
            <div>
              <ul className="flex flex-wrap gap-4 ">
                {SortFilter.map((sortFilterVal, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => setSortFilter(sortFilterVal.filter)}
                      className={`text-white w-auto px-4 over:transition-colors hover:duration-300 hover:bg-personal-500 btn btn-square  ${
                        sort === sortFilterVal.filter
                          ? "bg-burnt_umber-400"
                          : "bg-daintree-400"
                      }`}
                    >
                      {sortFilterVal.name}

                      {sort === sortFilterVal.filter ? (
                        <span>
                          <IoArrowUp />
                        </span>
                      ) : (
                        <span>
                          <IoArrowDown />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* MARK:allproducts in table */}
          <div className="">
            <div className=" grid lg:grid-cols-3 sm:grid-cols-12 justify-end">
              <form className="md:max-w-md w-full lg:col-start-3 sm:col-start-1  ">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                    id="default-search"
                    className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-1 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="overflow-x-auto ">
              <table className="table table-zebra lg:table-lg table-xs">
                {/* head */}
                <thead className="">
                  <tr className="">
                    {SortFilter.map((sortFilterVal, i) => {
                      return (
                        // queryStr
                        <th
                          key={i}
                          onClick={() => setSortFilter(sortFilterVal.filter)}
                          className="  cursor-pointer"
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
                                    .
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
                  <tbody className="relative ">
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
                            <td>{product?.price?.mrp} /-</td>
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
          products?.products?.products && (
            <div className="flex justify-end gap-4">
              <div className="grid grid-cols-2 join">
                <button
                  className="join-item btn btn-outline"
                  onClick={handleOnPrev}
                >
                  Prev
                </button>

                <button
                  onClick={handleOnNext}
                  className="join-item btn btn-outline"
                >
                  Next
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SellerProducts;
