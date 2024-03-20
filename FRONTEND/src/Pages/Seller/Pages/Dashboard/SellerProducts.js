import React, { useEffect, useState } from "react";
import DashBoardNavbar from "../../SellerComponents/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRODUCTS_SAGA } from "../../../../Stores/Slice/Seller.Product.Slice";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";

const SellerProducts = () => {
  // pagination
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, sePriceFilter] = useState("price");
  const [qty, seQtyFilter] = useState("qty");
  const [title, seTitleFilter] = useState("title");
  const [views, setViewsFilter] = useState("views");
  const products = useSelector((state) => state.SellerProduct);
  const handleOnPrev = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleOnNext = () => {
    if (products?.products?.totalPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const config = {
      currentPage,
      price,
      qty,
      title,
      views,
    };

    dispatch(GET_ALL_PRODUCTS_SAGA(config));
  }, [dispatch, currentPage, price, qty, views, title]);
  return (
    <div className="px-3">
      <DashBoardNavbar name="All Products" />

      {/* SEE ALL PRODUCT  */}
      <section className="flex flex-col">
        {/* FILTER */}
        <div className="w-full my-7">
          <div>
            <ul className="flex gap-4">
              {title === "-title" ? (
                <li
                  onClick={() => seTitleFilter("title")}
                  className="w-32 text-white hover:bg-personal-800 btn btn-square bg-daintree-400"
                >
                  A-Z
                  <span>
                    <IoArrowDown />
                  </span>
                </li>
              ) : (
                <li
                  onClick={() => seTitleFilter("-title")}
                  className="w-32 text-white hover:bg-personal-800 btn btn-square bg-daintree-400"
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
                    className="w-32 text-white btn hover:bg-personal-800 btn-square bg-daintree-400"
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
                    className="w-32 text-white btn hover:bg-personal-800 btn-square bg-daintree-400"
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
                    className="w-32 text-white btn hover:bg-personal-800 bg-daintree-400"
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
                    className="w-32 text-white btn hover:bg-personal-800 bg-daintree-400"
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
                    className="w-32 text-white btn hover:bg-personal-800 bg-daintree-400"
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
                    className="w-32 text-white btn hover:bg-personal-800 bg-daintree-400"
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

        {/* allproducts in table  */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Title</th>
                  <th>view</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {/* row 1 */}
                {products?.products?.products &&
                  products?.products?.products.map((product, i) => {
                    return (
                      <tr key={i}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 mask mask-squircle">
                                <img
                                  src={product.thumbnail.img}
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
                        <td>
                          {product.views} Views
                          {/* <br />
                        <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span> */}
                        </td>
                        <td>{product.qty}</td>
                        <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th>
                      </tr>
                    );
                  })}

                <tr className="">
                  <th>
                    <label className="">
                      <input
                        type=""
                        className="rounded-lg pointer-events-none focus:ring-0 checkbox skeleton bg-black/20"
                      />
                    </label>
                  </th>
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
                    {/* <br />
                        <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span> */}
                  </td>
                  <td className="text-transparent">
                    <span className="w-12 rounded-lg animate-pulse bg-black/20 skeleton">
                      ....................
                    </span>
                  </td>
                  <th>
                    <button className="text-transparent animate-pulse bg-black/20 btn btn-ghost btn-xs skeleton">
                      details
                    </button>
                  </th>
                </tr>
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
      <div className="w-60">
        <div className="grid grid-cols-2 join">
          <button className="join-item btn btn-outline" onClick={handleOnPrev}>
            Prev
          </button>
          <button onClick={handleOnNext} className="join-item btn btn-outline">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
