import { useDispatch, useSelector } from "react-redux";
import DashBoardNavbar from "../SellerComponents/DashboardNavbar";
import { useEffect, useTransition } from "react";
import { Link } from "react-router-dom";
import { SortFilter } from "../../../Utils/SellerFilters";
import { SellerProductActionRequest } from "../../../Stores/Saga/Actions/SellerProductsAction";

const DashbordMainPage = () => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  // const { isLoading } = useSelector((state) => state.loading);
  const data = useSelector((state) => state.SellerProduct.dashboard);
  const details = data?.results;

  useEffect(() => {
    startTransition(() =>
      dispatch({
        type: SellerProductActionRequest.GET_DASHBOARD_DETAILS_SAGA_REQUEST,
      })
    );
  }, [dispatch]);

  return (
    <main className="">
      <DashBoardNavbar name="Dashboard" />
      {/* ! Product Details  */}
      <section className="flex flex-col mt-4">
        <div className="flex justify-between">
          <div className="pb-2 font-bold capitalize dark:text-green-300">
            Order Update
          </div>
          <div className="flex flex-col items-end justify-end pb-2 capitalize dark:text-green-300">
            Last Modified
            <span className="text-xs text-gray-500">
              {details?.lastModifiedDate && details?.lastModifiedDate} /&nbsp;
              {details?.lastModifiedTime && details?.lastModifiedTime}
            </span>
          </div>
        </div>

        <div className="shadow md:stats dark:bg-gray-800">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Views</div>
            <div className="stat-value">
              {details?.totalViews?.viewsLast365Days &&
                details?.totalViews?.viewsLast365Days}
            </div>
            <div className="stat-desc">in 365 Days</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Less Qty</div>
            <div className="stat-value">
              {details?.lessqty?.length && details?.lessqty?.length}
            </div>
            <div className="stat-desc">minimum 10 products</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Toal Products</div>
            <div className="stat-value">{details?.totalProducts}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
        </div>
        <div className="mt-5 ">
          <div className="pb-2 font-bold capitalize dark:text-green-300">
            Less Quantity Products
          </div>
        </div>
        <div className="mt-5 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="overflow-x-auto ">
            <table className="table lg:table-lg table-xs">
              {/* head */}
              <thead className="border-b-2">
                <tr className="">
                  {SortFilter.map((sortFilterVal, i) => {
                    return (
                      <th key={i} className="">
                        <span className="flex items-center gap-1">
                          {sortFilterVal.name}
                        </span>
                      </th>
                    );
                  })}
                  <th>Brand Logo</th>
                  <th>Details</th>
                </tr>
              </thead>

              {/* row 1 */}

              {isPending ? (
                <tbody className="relative ">
                  {details?.lessqty &&
                    details?.lessqty.map((val, i) => {
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
                <tbody className="relative dark:bg-gray-800">
                  {details?.lessqty &&
                    details?.lessqty.map((product, i) => {
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
                              {new Date(product.updatedAt).toLocaleDateString()}
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
    </main>
  );
};

export default DashbordMainPage;
