import { IoIosArrowForward } from "react-icons/io";
// import Card from "../PublicComponents/Card";
import HorizontalCarousel from "../Components/HorizontalCarousel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { productActionRequest } from "../../../Stores/Saga/Actions/ProductsAction";
const GetDataCategory = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);

  useEffect(() => {
    dispatch({
      type: productActionRequest.SUB_CATEGORY_REQUEST_SAGA,
      payload: params.category,
    });
  }, [dispatch, params]);
  return (
    <div>
      <div className="breadcrumbs text-xs">
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/${params.category}`}>
              {params?.category.toUpperCase()}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="py-3">
          <HorizontalCarousel />
        </div>

        {data?.subcategory?.data &&
          data?.subcategory?.data.map((val, i) => {
            return (
              <div key={i} className="p-3 m-4 border-2 rounded-lg ">
                <div className="flex justify-between py-2 mb-4 text-xl font-bold">
                  <div>Category - {val.subCategory}</div>
                  <div
                    onClick={() =>
                      navigate(`/${params.category}/${val.subCategory}`)
                    }
                    className="flex items-center px-3 rounded-md py-2  cursor-pointer bg-personal-900 text-personal-10"
                  >
                    View All
                  </div>
                </div>
                <div className="gap-4 carousel carousel-center ">
                  {val.products &&
                    val.products.map((item, i) => {
                      return (
                        <div key={i} className="carousel-item">
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
                              <div className="card-actions">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/${params.category}/${val.subCategory}/${item._id}/?pid=${item._id}&brand=${item?.brand?.name}`
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
          })}
      </div>
    </div>
  );
};

export default GetDataCategory;
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
