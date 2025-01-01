// import { LuHeart } from "react-icons/lu";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  // productActionSuccess
  SubCategoryDataSaga,
} from "../../../Stores/Actions/ProductsAction";

import ProductCards from "../Components/ProductCards";

const ProductList = () => {
  // console.log("Render List ");
  const dispatch = useDispatch();
  // const location = useLocation();
  // const Url = new URLSearchParams(window.location.search);
  // const [ispending, startTransition] = useTransition();
  const [useParams, setSearchParams] = useSearchParams(window.location.search);
  // Initialize `page` state from query parameters or default to 1
  const initialPage = parseInt(useParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  // const [page, setPage] = useState(1);
  const { data } = useSelector((state) => state.products.subCategoryProducts);
  const memorizationData = useMemo(() => data.data, [data.data]);

  // Extract query parameters
  useParams.set("page", page);
  const subcategory = useParams.get("subcategory");
  const category = useParams.get("category");
  const search = useParams.get("search");
  // Url.set("page", page);

  // const subcategory = Url.get("subcategory");
  // const category = Url.get("category");
  // const search = Url.get("search");

  // const { msg } = useSelector((state) => state.products.whitelist);
  // Prev navigation Handler
  // const prevPage = () => (page == 1 ? setPage(page) : setPage(page - 1));
  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      // Url.set("page", page - 1);
      setSearchParams((prev) => {
        prev.set("page", page - 1);
        return prev;
      });
    }
  }, [page, setSearchParams, setPage]);
  // Next navigation Handler
  // const nextPage = () => (data?.totalPages > page ? setPage(page + 1) : null);
  const nextPage = useCallback(() => {
    if (data?.totalPages > page) {
      setPage((next) => next + 1);
      // Url.set("page", page + 1);
      setSearchParams((next) => {
        next.set("page", page + 1);
        return next;
      });
    }
  }, [page, setPage, setSearchParams, data?.totalPages]);
  // WhiteList Product additions
  const handleSetPage = useCallback(
    (pageNum) => {
      setPage(pageNum);
      // Url.set("page", pageNum);
      setSearchParams((prev) => {
        prev.set("page", pageNum);
        return prev;
      });
    },
    [setPage, setSearchParams]
  );
  console.log("product lsit render");
  useEffect(() => {
    // if (page !== initialPage) {
    //   setPage(initialPage);
    // }
    // setparams({ category: category, subc: subcategory });

    // Url.set("page", page);
    // if (category) Url.set("category", category);
    // if (subcategory) Url.set("subcategory", subcategory);
    // setSearchParams(location.search);

    dispatch(SubCategoryDataSaga({ location: window.location.search }));
    // if (msg?.status === true) {
    //   dispatch(SubCategoryDataSaga({ location: location.search }));
    // }
  }, [
    dispatch,
    category,
    // initialPage,
    // setSearchParams,
    page,
    subcategory,
  ]);
  return (
    <>
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
                <Link
                  to={`/products?category=${category}&subcategory=${subcategory}`}
                  // to={{
                  //   pathname: `/products`,
                  //   search: `category=${category}&subcategory=${subcategory}`,
                  // }}
                >
                  {subcategory.toUpperCase()}
                </Link>
              </li>
            )}
            {!category && !subcategory && search && (
              <li>
                <Link
                  to={`?search=${search}`}
                  // to={{ search: `search=${search}` }}
                >
                  Also Related Searching &nbsp;
                  <span className="font-bold ">&quot;{search}&quot;</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="px-3 divide-y-2">
          {data.data && <ProductCards data={memorizationData} />}
        </div>
        <div className="py-4 mb-32 ">
          <div className="flex justify-between px-3">
            <div>
              page {data?.page} of {data?.totalPages}
            </div>
            <div>
              <div className="join ">
                <button
                  disabled={page === 1}
                  onClick={prevPage}
                  className="join-item btn btn-sm"
                >
                  Previous
                </button>
                {data?.prevPages &&
                  data.prevPages.map((page, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleSetPage(page)}
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
                        onClick={() => handleSetPage(page)}
                        className="join-item btn btn-sm"
                      >
                        {page}
                      </button>
                    );
                  })}

                <button
                  onClick={nextPage}
                  disabled={page >= data?.totalPages}
                  className="join-item btn btn-sm"
                >
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
