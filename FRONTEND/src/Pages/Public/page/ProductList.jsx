import { LuHeart } from "react-icons/lu";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  productActionRequest,
  productActionSuccess,
} from "../../../Stores/Saga/Actions/ProductsAction";
import { FcLike } from "react-icons/fc";
import { ToastContainer } from "react-toastify";
import { getTokenLocalStoragePublic } from "../../../Utils/LocalStorage";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [useParams, setParam] = useSearchParams(location.search);
  const Url = new URLSearchParams(location.search);
  const subcategory = useParams.get("subc");
  const category = useParams.get("category");
  const search = useParams.get("search");

  const dispatch = useDispatch();
  const { data, isloading } = useSelector(
    (state) => state.products.subCategoryProducts
  );
  const [page, setPage] = useState(1);
  const { msg } = useSelector((state) => state.products.whitelist);
  const prevPage = useCallback(() => {
    if (page === 1) {
      setPage(page);
    } else {
      setPage(page - 1);
    }
  }, [page]);
  const nextPage = useCallback(() => {
    if (data?.totalPages > page) {
      setPage(page + 1);
    }
  }, [data.totalPages, page]);

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
    Url.set("page", page);
    category && Url.set("category", category);
    subcategory && Url.set("subcategory", subcategory);
    setParam(Url);
    // setparams({ category: category, subc: subcategory });
    dispatch({
      type: productActionRequest.SUB_CATEGORY_ALl_DATA_REQUEST_SAGA,
      payload: { location: location.search },
    });

    if (msg?.status === true) {
      dispatch({
        type: productActionRequest.SUB_CATEGORY_ALl_DATA_REQUEST_SAGA,
        payload: { location: location.search },
      });
    }
    return () => {
      dispatch({
        type: productActionSuccess.ADD_WHITELIST_SUCCESS,
        payload: {},
      });
    };
  }, [
    dispatch,
    category,
    page,
    setParam,
    subcategory,
    location.search,
    msg?.status,
  ]);
  return (
    <>
      <ToastContainer stacked />

      <div className="container w-4/5 mx-auto mt-2 bg-white ">
        <div className="container px-4 text-xs breadcrumbs">
          <ul>
            <li>
              <Link to={`/`}>HOME</Link>
            </li>
            {category && (
              <li>
                <Link to={`/category?category=${category}`}>
                  {category.toUpperCase()}
                </Link>
              </li>
            )}
            {category && subcategory && (
              <li>
                <Link to={`/products?category=${category}&subc=${subcategory}`}>
                  {subcategory.toUpperCase()}
                </Link>
              </li>
            )}
            {!category && !subcategory && search && (
              <li>
                <Link to={{ search: `search=${search}` }}>
                  Also Related Searching &nbsp;
                  <span className="font-bold ">&quot;{search}&quot;</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="divide-y-2">
          {isloading
            ? Array.from({ length: data.productperPage }).map((item, l) => {
                return (
                  <div
                    key={l}
                    className="grid grid-cols-1 gap-5 py-5 lg:gap-2 md:grid-cols-4 "
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
                        navigate(
                          `/s?pid=${item?._id}&brand=${item?.brand?.name}`
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
        <div className="py-4 mb-32 ">
          <div className="flex justify-between px-3">
            <div>
              page {data?.page} of {data?.totalPages}
            </div>
            <div>
              <div className="join ">
                <button onClick={prevPage} className="join-item btn btn-sm">
                  Previous
                </button>
                {data?.prevPages &&
                  data.prevPages.map((page, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setPage(page);
                        }}
                        className="join-item btn btn-sm"
                      >
                        {page}
                      </button>
                    );
                  })}
                <div className="relative inline-flex items-center text-sm font-semibold text-gray-700 bg-personal-50 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 join-item btn btn-sm">
                  {data?.page}
                </div>

                {data?.nextPages &&
                  data?.nextPages.map((page, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setPage(page);
                        }}
                        className="join-item btn btn-sm"
                      >
                        {page}
                      </button>
                    );
                  })}

                <button onClick={nextPage} className="join-item btn btn-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
