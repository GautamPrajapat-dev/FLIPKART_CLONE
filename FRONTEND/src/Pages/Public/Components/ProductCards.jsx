import { memo } from "react";
import { FcLike } from "react-icons/fc";
import { LuHeart } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { getTokenLocalStoragePublic } from "../../../Utils/LocalStorage";
import {
  AddWhiteListReqSaga,
  productActionRequest,
} from "../../../Stores/Actions/ProductsAction";
import { useNavigate } from "react-router-dom";
const ProductCards = (props) => {
  const data = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnWhiteList = (id) => dispatch(AddWhiteListReqSaga(id));
  const removewhiteListHandler = (id) => {
    dispatch({
      type: productActionRequest.REMOVE_WHITELIST_REQUEST_SAGA,
      payload: { id },
    });
  };

  return (
    <>
      {
        //   isPending
        //     ? Array.from({ length: 3 }).map((_, l) => {
        //         return (
        //           <div
        //             key={l}
        //             className="grid grid-cols-1 gap-5 px-3 py-5 lg:gap-2 md:grid-cols-4 "
        //           >
        //             <div className="relative flex items-center justify-center h-52 skeleton">
        //               <div className="absolute text-xl cursor-pointer top-2 lg:top-4 right-2 lg:right-7"></div>
        //             </div>

        //             <div className="col-span-2 cursor-pointer peer">
        //               <div className="text-xl font-semibold text-transparent capitalize skeleton line-clamp-2 peer-hover:bg-personal-200">
        //                 .
        //               </div>
        //               <div className="my-2">
        //                 <span className="px-3 py-1 text-xs text-transparent rounded-lg skeleton">
        //                   ----------
        //                 </span>
        //               </div>

        //               <div className="flex flex-col w-3/4 gap-3 line-clamp-5">
        //                 <span className="w-full text-transparent skeleton">
        //                   ------------------------------------------------------------
        //                 </span>
        //                 <span className="text-transparent w-[90%] skeleton">
        //                   ---------------------------------------------------
        //                 </span>
        //                 <span className="text-transparent w-[80%] skeleton">
        //                   -----------------------------
        //                 </span>
        //               </div>
        //             </div>
        //             <div className="flex flex-col col-span-1 gap-2">
        //               {/* <span>Special price</span> */}
        //               <span className="text-2xl font-semibold text-transparent w-44 skeleton">
        //                 ₹47,990
        //               </span>
        //               <div className="flex items-center gap-2">
        //                 <span className="text-sm text-transparent line-through skeleton ">
        //                   ₹64,995
        //                 </span>
        //                 <span className="text-sm text-transparent text-green-500 skeleton">
        //                   26% off
        //                 </span>
        //               </div>
        //               <span className="w-32 text-sm text-transparent skeleton">
        //                 Free delivery
        //               </span>
        //               <span className="w-32 text-sm text-transparent skeleton">
        //                 No Cost Emi
        //               </span>
        //               <span className="w-32 text-sm font-bold text-transparent text-green-600 skeleton">
        //                 Bank Offer
        //               </span>
        //             </div>
        //           </div>
        //         );
        //       })
        //     : data?.data &&
        data?.data.map((item, l) => {
          return (
            <div
              key={l}
              className="grid grid-cols-1 gap-5 bg-white py-7 lg:gap-2 md:grid-cols-4 "
            >
              <div className="relative flex items-center justify-center ">
                <img
                  className="w-64 lg:w-56"
                  loading="lazy"
                  src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
                  alt="image"
                />
                <div className="absolute text-xl cursor-pointer top-2 lg:top-4 right-2 lg:right-7">
                  {getTokenLocalStoragePublic() ? (
                    item.inWhiteList ? (
                      <FcLike
                        onClick={() => removewhiteListHandler(item._id)}
                      />
                    ) : (
                      <LuHeart onClick={() => handleOnWhiteList(item._id)} />
                    )
                  ) : (
                    <LuHeart onClick={() => navigate("/login")} />
                  )}
                </div>
              </div>

              <div
                onClick={() =>
                  navigate(`/s?pid=${item?._id}&brand=${item?.brand?.name}`)
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

                <div className="w-3/4 line-clamp-5">{item?.description}</div>
              </div>
              <div className="flex flex-col col-span-1">
                {/* <span>Special price</span> */}
                <span className="text-2xl font-semibold"> ₹47,990 </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-gray-400/70">
                    ₹64,995
                  </span>
                  <span className="text-green-500 text-s m">26% off</span>
                </div>
                <span className="text-sm">Free delivery</span>
                <span className="text-sm">No Cost Emi</span>
                <span className="text-sm font-bold text-green-600">
                  Bank Offer
                </span>
              </div>
            </div>
          );
        })
      }
    </>
  );
};

export default memo(ProductCards);
