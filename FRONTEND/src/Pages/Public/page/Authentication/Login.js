import React from "react";
import FormInputIcon from "../../../../Components/Inputs/FormInputIcon";
import { LuUser } from "react-icons/lu";
import { IoLockClosedOutline } from "react-icons/io5";
import Button from "../../../../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="relative w-full">
        <div className="flex my-6">
          <div className="grid justify-center w-full grid-cols-12">
            <div className="w-full col-span-12 p-3 lg:rounded-lg lg:col-start-4 lg:col-span-6 ">
              <div className="grid grid-cols-12 ">
                <div className="col-span-12 px-5 py-12 lg:col-span-5 flex flex-col justify-between bg-daintree-400 lg:h-[32rem]">
                  <div>
                    <div className="text-3xl font-bold text-center text-personal-50 lg:text-start">
                      Login
                    </div>
                    <p className="mt-2 text-sm text-center lg:text-start text-daintree-200 lg:text-lg">
                      Get access to your Orders, Wishlist and Recommendations
                    </p>
                  </div>
                  <img
                    src="https://www.bingocycles.com/images/login_img.png"
                    className="hidden lg:block"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between col-span-12 px-4 py-8 lg:col-span-7 bg-daintree-800 ">
                  <form action="" className="flex flex-col gap-6 px-9">
                    <FormInputIcon
                      className="text-personal-20"
                      variant="sm-outlined"
                      type="text"
                      name="email"
                      icon={<LuUser />}
                      placeholder="Email"
                      iconClassName="text-personal-10"
                    />
                    <FormInputIcon
                      variant="sm-outlined"
                      className="mb-4"
                      type="password"
                      name="password"
                      icon={<IoLockClosedOutline />}
                      placeholder="****"
                      passwordClassName="text-personal-10"
                      iconClassName="text-personal-10"
                    />
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="py-2 bg-emerald-900"
                    >
                      Login
                    </Button>
                  </form>
                  <div
                    onClick={() => navigate("/signup")}
                    className="mt-3 text-blue-400 cursor-pointer px-9 text-end lg:text-center"
                  >
                    New to Flipkart? Create an account
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
