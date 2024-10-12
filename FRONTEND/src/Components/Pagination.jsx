import { useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const Pagination = (props) => {
  const { data } = props;
  const [page, setPage] = useState(1);
  const [userparams, setparamas] = useSearchParams();
  const subcategory = userparams.get("subc");
  const category = userparams.get("category");
  const search = userparams.get("search");

  const mergeParams = (newParams) => {
    const mergedParams = new URLSearchParams(userparams);

    // Merge existing params with new params
    for (const key in newParams) {
      if (newParams[key]) {
        mergedParams.set(key, newParams[key]); // Add/update new params
      } else {
        mergedParams.delete(key); // Remove if new value is undefined or null
      }
    }

    // Update the URL with merged parameters
    setparamas(mergedParams);
  };

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

  useEffect(() => {
    if (page) {
      mergeParams({ page: page });
    }
  }, [category, setparamas, subcategory, page, search]);

  return (
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
  );
};

export default Pagination;
