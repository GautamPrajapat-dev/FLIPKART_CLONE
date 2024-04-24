import React, { useCallback, useEffect, useState } from "react";
import DashBoardNavbar from "../../SellerComponents/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRODUCTS_SAGA } from "../../../../Stores/Slice/Seller.Product.Slice";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const SellerProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, sePriceFilter] = useState("price");
  const [qty, seQtyFilter] = useState("qty");
  const [title, seTitleFilter] = useState("title");
  const [views, setViewsFilter] = useState("views");
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
  // const handleOnShowDetailsClick = useCallback((id) => {
  //   setIDProduct(id);
  //   document.getElementById("show_sellerProductDetails").showModal();
  // }, []);

  useEffect(() => {
    let cPage = currentPage === undefined ? 1 : currentPage;
    const config = {
      cPage,
      price,
      qty,
      title,
      views,
    };

    if (products?.products?.products?.length !== 0) {
      dispatch(GET_ALL_PRODUCTS_SAGA(config));
    }
    return () => dispatch(GET_ALL_PRODUCTS_SAGA());
  }, [
    dispatch,
    products?.products?.products?.length,
    currentPage,
    price,
    qty,
    views,
    title,
  ]);
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
                {title === "-title" ? (
                  <li
                    onClick={() => seTitleFilter("title")}
                    className="text-white w-28 hover:bg-personal-800 btn btn-square bg-daintree-400"
                  >
                    A-Z
                    <span>
                      <IoArrowDown />
                    </span>
                  </li>
                ) : (
                  <li
                    onClick={() => seTitleFilter("-title")}
                    className="text-white w-28 hover:bg-personal-800 btn btn-square bg-daintree-400"
                  >
                    A-Z
                    <span>
                      <IoArrowUp />
                    </span>
                  </li>
                )}
                {price === "-price" ? (
                  <li>
                    <span
                      onClick={() => sePriceFilter("price")}
                      className="text-white w-28 btn hover:bg-personal-800 btn-square bg-daintree-400"
                    >
                      Price
                      <span>
                        <IoArrowDown />
                      </span>
                    </span>
                  </li>
                ) : (
                  <li>
                    <span
                      onClick={() => sePriceFilter("-price")}
                      className="text-white w-28 btn hover:bg-personal-800 btn-square bg-daintree-400"
                    >
                      Prie
                      <span>
                        <IoArrowUp />
                      </span>
                    </span>
                  </li>
                )}
                {qty === "-qty" ? (
                  <li>
                    <span
                      onClick={() => seQtyFilter("qty")}
                      className="text-white w-28 btn hover:bg-personal-800 bg-daintree-400"
                    >
                      Qty
                      <span>
                        <IoArrowDown />
                      </span>
                    </span>
                  </li>
                ) : (
                  <li>
                    <span
                      onClick={() => seQtyFilter("-qty")}
                      className="text-white w-28 btn hover:bg-personal-800 bg-daintree-400"
                    >
                      Qty
                      <span>
                        <IoArrowUp />
                      </span>
                    </span>
                  </li>
                )}
                {views === "-views" ? (
                  <li>
                    <span
                      onClick={() => setViewsFilter("views")}
                      className="text-white w-28 btn hover:bg-personal-800 bg-daintree-400"
                    >
                      views
                      <span>
                        <IoArrowDown />
                      </span>
                    </span>
                  </li>
                ) : (
                  <li>
                    <span
                      onClick={() => setViewsFilter("-views")}
                      className="text-white w-28 btn hover:bg-personal-800 bg-daintree-400"
                    >
                      views
                      <span>
                        <IoArrowUp />
                      </span>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* MARK:allproducts in table */}
          <div className="">
            <div className="overflow-x-auto ">
              <table className="table table-zebra lg:table-lg table-xs">
                {/* head */}
                <thead className="">
                  <tr>
                    <th>Title</th>
                    <th>view</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Modify Date</th>
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
