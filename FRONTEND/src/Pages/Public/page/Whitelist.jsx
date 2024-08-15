import { FcLike } from "react-icons/fc";
import { LuHeart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  productActionRequest,
  productActionSuccess,
} from "../../../Stores/Saga/Actions/ProductsAction";
import { ToastContainer } from "react-toastify";

const Whitelist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, msg } = useSelector((state) => state.products.whitelist);
  useEffect(() => {
    dispatch({ type: productActionRequest.GET_WHITELIST_REQUEST_SAGA });
  }, [dispatch]);
  const HandleWhiteListAdd = (id) => {
    dispatch({
      type: productActionRequest.ADD_WHITELIST_REQUEST_SAGA,
      payload: { id },
    });
  };
  const hanleRemoveWhiteList = (id) => {
    dispatch({
      type: productActionRequest.REMOVE_WHITELIST_REQUEST_SAGA,
      payload: { id },
    });
  };

  useEffect(() => {
    if (msg?.status === true) {
      dispatch({ type: productActionRequest.GET_WHITELIST_REQUEST_SAGA });
    }
    return () =>
      dispatch({
        type: productActionSuccess.REMOVE_WHITELIST_SUCCESS,
        payload: {},
      });
  }, [msg?.status, dispatch]);
  return (
    <>
      <ToastContainer />
      <div className="container w-4/5 mx-auto divide-y-2">
        {data.products && data.products.length !== 0 ? (
          data.products &&
          data.products.map((p, i) => {
            return (
              <div key={i}>
                {p.product.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-1 gap-5 py-2 lg:gap-2 md:grid-cols-4 "
                    >
                      <div className="relative flex items-center justify-center ">
                        <img
                          className="w-64 lg:w-56"
                          src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
                          alt="image"
                        />
                        <div className="absolute text-xl cursor-pointer top-2 lg:top-4 right-2 lg:right-7">
                          {item.whitelisted ? (
                            <FcLike
                              onClick={() => hanleRemoveWhiteList(item._id)}
                            />
                          ) : (
                            <LuHeart
                              onClick={() => HandleWhiteListAdd(item._id)}
                            />
                          )}
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          navigate(
                            `/${item.category.category}/${item.category.subCategory}/${item?._id}/?pid=${item?._id}&brand=${item?.brand?.name}`
                          )
                        }
                        className="col-span-2 cursor-pointer peer"
                      >
                        <div className="text-xl font-semibold capitalize line-clamp-2 peer-hover:bg-personal-200">
                          {item.title}
                        </div>
                        <div>
                          <span className="px-3 py-1 text-xs text-white bg-green-700 rounded-lg">
                            {item?.rating?.rate}
                          </span>
                          &nbsp;{item?.rating?.count} Ratings & 18 Reviews
                        </div>

                        <div className="w-3/4 line-clamp-5">
                          {item?.description}
                        </div>
                      </div>
                      <div className="flex flex-col col-span-1">
                        {/* <span>Special price</span> */}
                        <span className="text-2xl font-semibold">₹47,990 </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm line-through text-gray-400/70">
                            ₹64,995
                          </span>
                          <span className="text-green-500 text-s m">
                            26% off
                          </span>
                        </div>
                        <span className="text-sm">Free delivery</span>
                        <span className="text-sm">No Cost Emi</span>
                        <span className="text-sm font-bold text-green-600">
                          Bank Offer
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full ">
            <div className="flex flex-col items-center justify-center gap-7 py-7">
              <img src="/image/emptyList.png" alt="" />
              <div className="text-4xl font-bold uppercase">No Items</div>
            </div>
          </div>
        )}
        {/* <div className="py-4 mb-32 ">
          <div className="flex justify-between px-3">
            <div>
              page {data?.page} of {data?.totalPages}
            </div>
            <div>
              <div className="join ">
                <button
                  onClick={handleOnPrevPage}
                  className="join-item btn btn-sm"
                >
                  Previous
                </button>
                {data.prevPages &&
                  data.prevPages.map((page, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => setpage(page)}
                        className="join-item btn btn-sm"
                      >
                        {page}
                      </button>
                    );
                  })}
                <div className="relative inline-flex items-center text-sm font-semibold text-gray-700 bg-personal-50 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 join-item btn btn-sm">
                  {data?.page}
                </div>

                {data.nextPages &&
                  data.nextPages.map((page, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => setpage(page)}
                        className="join-item btn btn-sm"
                      >
                        {page}
                      </button>
                    );
                  })}

                <button
                  onClick={handleOnNextPage}
                  className="join-item btn btn-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Whitelist;
