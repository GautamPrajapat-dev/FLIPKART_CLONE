import { LuHeart } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productActionRequest } from "../../../Stores/Saga/Actions/ProductsAction";
const GetDataSubCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useParams();
  const { data } = useSelector((state) => state.products.subCategoryProducts);

  useEffect(() => {
    if (path) {
      dispatch({
        type: productActionRequest.SUB_CATEGORY_ALl_DATA_REQUEST_SAGA,
        payload: path,
      });
    }
  }, [dispatch, path]);
  return (
    <>
      <div className="container w-4/5 mx-auto divide-y-2">
        {data.map((item, l) => {
          return (
            <div
              key={l}
              className="grid grid-cols-1 gap-5 py-2 lg:gap-2 md:grid-cols-4 "
            >
              <div className="relative flex items-center justify-center ">
                <img
                  className="w-64 lg:w-56"
                  src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
                  alt="image"
                />
                <div className="absolute cursor-pointer top-2 lg:top-4 right-2 lg:right-7">
                  <LuHeart />
                </div>
              </div>
              <div
                onClick={() =>
                  navigate(`p/?pid=${item._id}&title=${item.title}`)
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
        })}
      </div>
    </>
  );
};

export default GetDataSubCategory;
