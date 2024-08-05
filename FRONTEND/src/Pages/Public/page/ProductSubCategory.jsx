import { LuHeart } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { productActionRequest } from "../../../Stores/Saga/Actions/ProductsAction";
const ProductSubCategory = () => {
  const navigate = useNavigate();
  const urlPath = useParams();
  const dispatch = useDispatch();
  const path = useParams();
  const { data } = useSelector((state) => state.products.subCategoryProducts);
  console.log(data);
  const [page, setpage] = useState(1);
  const handleOnNextPage = useMemo(() => {
    if (page === 0) {
      setpage(page);
    } else {
      setpage(page - 1);
    }
  }, [page]);
  const handleOnPrevPage = useMemo(() => {}, []);

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
      <div className="breadcrumbs text-xs">
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/${urlPath.category}`}>
              {urlPath?.category.toUpperCase()}
            </Link>
          </li>
          <li>
            <Link to={`/${urlPath.category}/${urlPath?.subcategory}`}>
              {urlPath?.subcategory.toUpperCase()}
            </Link>
          </li>
        </ul>
      </div>
      <div className="container w-4/5 mx-auto divide-y-2">
        {data?.data &&
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
                  <div className="absolute cursor-pointer top-2 lg:top-4 right-2 lg:right-7">
                    <LuHeart />
                  </div>
                </div>
                <div
                  onClick={() =>
                    navigate(
                      `${item?._id}/?pid=${item?._id}&brand=${item?.brand?.name}`
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
        <div className="py-4  mb-32 ">
          <div className="flex px-3 justify-between">
            <div>page 1 of 2 </div>
            <div>
              <div className="join">
                <button
                  onClick={() => handleOnPrevPage}
                  className="join-item btn"
                >
                  Previous
                </button>
                <button className="join-item btn">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn btn-disabled">...</button>
                <button className="join-item btn">99</button>
                <button className="join-item btn">100</button>
                <button onClick={handleOnNextPage} className="join-item btn">
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

export default ProductSubCategory;
