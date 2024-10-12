import { LuHeart } from "react-icons/lu";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  productActionRequest,
  productActionSuccess,
} from "../../../Stores/Saga/Actions/ProductsAction";
import { FcLike } from "react-icons/fc";
import { ToastContainer } from "react-toastify";
import { getTokenLocalStoragePublic } from "../../../Utils/LocalStorage";
import Pagination from "../../../Components/pagination";

const ProductSubCategory = () => {
  const navigate = useNavigate();
  const [userparams, setparamas] = useSearchParams();
  const subcategory = userparams.get("subc");
  const category = userparams.get("category");
  const page = userparams.get("page");
  const search = userparams.get("search");
  const dispatch = useDispatch();

  const { data, isloading } = useSelector(
    (state) => state.products.subCategoryProducts
  );
  const { msg } = useSelector((state) => state.products.whitelist);
  // const [page, setpage] = useState(1);

  // const handleOnPrevPage = useCallback(() => {
  //   if (page === 1) {
  //     setpage(page);
  //   } else {
  //     setpage(page - 1);
  //   }
  // }, [page]);
  // const handleOnNextPage = useCallback(() => {
  //   if (data?.totalPages > page) {
  //     setpage(page + 1);
  //   }
  // }, [data.totalPages, page]);

  const handleOnWhiteList = (id) => {
    dispatch({
      type: productActionRequest.ADD_WHITELIST_REQUEST_SAGA,
      payload: { id },
    });
  };
  const removewhiteListHandler = (id) => {
    dispatch({
      type: productActionRequest.REMOVE_WHITELIST_REQUEST_SAGA,
      payload: { id },
    });
  };

  useEffect(() => {
    if (category && subcategory) {
      setparamas({ category: category, subc: subcategory });
      dispatch({
        type: productActionRequest.SUB_CATEGORY_ALl_DATA_REQUEST_SAGA,
        payload: { category, subcategory, page, search },
      });
    } else if (search) {
      setparamas({ search: search });
      dispatch({
        type: productActionRequest.SUB_CATEGORY_ALl_DATA_REQUEST_SAGA,
        payload: { search },
      });
    }
    if (msg?.status === true) {
      dispatch({
        type: productActionRequest.SUB_CATEGORY_ALl_DATA_REQUEST_SAGA,
        payload: { category, subcategory, page, search },
      });
    }
    return () =>
      dispatch({
        type: productActionSuccess.ADD_WHITELIST_SUCCESS,
        payload: {},
      });
  }, [dispatch, category, search, setparamas, subcategory, page, msg?.status]);
  return (
    <>
      <ToastContainer stacked />
      <div className="container px-4 text-xs breadcrumbs">
        <ul>
          <li>
            <Link to={`/`}>HOME</Link>
          </li>
          <li>
            {category && (
              <Link to={`/category?category=${category}`}>
                {category.toUpperCase()}
              </Link>
            )}
          </li>
          <li>
            {category && subcategory && (
              <Link to={`/products?category=${category}&subc=${subcategory}`}>
                {subcategory.toUpperCase()}
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="container w-4/5 mx-auto divide-y-2">
        {isloading
          ? Array.from({ length: data.productperPage }).map((item, l) => {
              return (
                <div
                  key={l}
                  className="grid grid-cols-1 gap-5 py-2 lg:gap-2 md:grid-cols-4 "
                >
                  <div className="relative flex items-center justify-center h-52 skeleton">
                    <div className="absolute text-xl cursor-pointer top-2 lg:top-4 right-2 lg:right-7"></div>
                  </div>

                  <div className="col-span-2 cursor-pointer peer">
                    <div className="text-xl font-semibold text-transparent capitalize skeleton line-clamp-2 peer-hover:bg-personal-200">
                      .
                    </div>
                    <div className="my-2">
                      <span className="px-3 py-1 text-xs text-transparent rounded-lg skeleton">
                        ----------
                      </span>
                    </div>

                    <div className="flex flex-col w-3/4 gap-3 line-clamp-5">
                      <span className="w-full text-transparent skeleton">
                        ------------------------------------------------------------
                      </span>
                      <span className="text-transparent w-[90%] skeleton">
                        ---------------------------------------------------
                      </span>
                      <span className="text-transparent w-[80%] skeleton">
                        -----------------------------
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col col-span-1 gap-2">
                    {/* <span>Special price</span> */}
                    <span className="text-2xl font-semibold text-transparent w-44 skeleton">
                      ₹47,990
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-transparent line-through skeleton ">
                        ₹64,995
                      </span>
                      <span className="text-sm text-transparent text-green-500 skeleton">
                        26% off
                      </span>
                    </div>
                    <span className="w-32 text-sm text-transparent skeleton">
                      Free delivery
                    </span>
                    <span className="w-32 text-sm text-transparent skeleton">
                      No Cost Emi
                    </span>
                    <span className="w-32 text-sm font-bold text-transparent text-green-600 skeleton">
                      Bank Offer
                    </span>
                  </div>
                </div>
              );
            })
          : data?.data &&
            data?.data.map((item, l) => {
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
                    <div className="absolute text-xl cursor-pointer top-2 lg:top-4 right-2 lg:right-7">
                      {getTokenLocalStoragePublic() ? (
                        item.inWhiteList ? (
                          <FcLike
                            onClick={() => removewhiteListHandler(item._id)}
                          />
                        ) : (
                          <LuHeart
                            onClick={() => handleOnWhiteList(item._id)}
                          />
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

                    <div className="w-3/4 line-clamp-5">
                      {item?.description}
                    </div>
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
        <Pagination data={data} />
      </div>
    </>
  );
};

export default ProductSubCategory;
