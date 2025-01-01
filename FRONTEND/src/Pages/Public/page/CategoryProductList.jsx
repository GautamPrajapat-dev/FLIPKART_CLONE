// import { IoIosArrowForward } from "react-icons/io";
// import Card from "../PublicComponents/Card";
import HorizontalCarousel from "../Components/HorizontalCarousel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useTransition } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { SubCategoryReqSaga } from "../../../Stores/Actions/ProductsAction";
const CategoryProductList = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const CategoryParam = params.get("category");
  const data = useSelector((state) => state.products);
  useEffect(() => {
    startTransition(() =>
      dispatch(SubCategoryReqSaga({ category: CategoryParam }))
    );
  }, [dispatch, CategoryParam]);
  return (
    <div>
      <div className="container px-4 text-xs breadcrumbs">
        <ul>
          <li>
            <Link to={`/`}>HOME</Link>
          </li>
          <li>
            <Link to={`/category?category=${CategoryParam}`}>
              {CategoryParam.toUpperCase()}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="py-3">
          <HorizontalCarousel />
        </div>

        {
          // data?.subcategory.isloading
          isPending ? (
            <h1 className="text-2xl text-center ">Please Wait</h1>
          ) : (
            data?.subcategory?.data &&
            data?.subcategory?.data.map((val, index) => {
              return (
                <div
                  key={index}
                  className="p-3 m-4 bg-white border-2 rounded-lg "
                >
                  <div className="flex justify-between py-2 mb-4 text-xl font-bold">
                    <div>Category - {val.subCategory.toUpperCase()}</div>
                    <Link
                      to={`/products?category=${val.category}&subcategory=${val.subCategory}`}
                      // onClick={() => handleViewAllProd(val)}
                      className="flex items-center px-2 py-1 text-sm transition-colors delay-200 rounded-md cursor-pointer hover:underline text-personal-900"
                    >
                      View All <HiArrowLongRight className="pl-1 text-xl" />
                    </Link>
                  </div>
                  <div className="gap-4 carousel carousel-center ">
                    {val?.products &&
                      val?.products.map((item, index) => {
                        return (
                          <div key={index} className="carousel-item">
                            <div className="w-56 border card bg-base-200">
                              <figure className="px-4 pt-4">
                                <img
                                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                  alt="Shoes"
                                  className="rounded-xl"
                                />
                              </figure>
                              <div className="-mt-4 text-sm card-body">
                                <p className="line-clamp-2">{item?.title}</p>
                                <div>
                                  Rating :
                                  {Math.round(
                                    item?.rating?.count / item?.rating?.rate
                                  ) || 4.3}
                                </div>
                                <div className="font-semibold">
                                  Price : &#8377;
                                  {item?.price?.mrp.toLocaleString("en-In")}
                                </div>
                                <div className="card-actions ">
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/s?pid=${item?._id}&brand=${item?.brand?.name}`
                                      )
                                    }
                                    className="btn btn-primary"
                                  >
                                    View More
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })
          )
        }
      </div>
    </div>
  );
};

export default CategoryProductList;
// <div>
//   <section className="flex-wrap p-2 m-1 mx-2 border-2 cursor-pointer card">
//     <div className="flex flex-col items-center justify-center ">
//       <div className="overflow-hidden">
//         <div className="transition ease-in bg-contain hover:scale-110 ">
//           <img
//             className="z-20 h-44 "
//             width={100}
//             src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
//             alt={"imgease "}
//           />
//         </div>
//       </div>
//       <main className="flex flex-col items-center justify-center capitalize cursor-pointer card-body max-w-40">
//         <h1 className="text-xs font-medium text-center underline line-clamp-2">
//           You like me ye ? or not like me ?
//         </h1>

//         <h3 className="text-xs font-medium">334543/-</h3>
//       </main>
//     </div>
//   </section>
// </div>;
