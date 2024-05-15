import React, { useEffect, useRef, useState } from "react";
import FormInputIcon from "../../../../Components/FormInputIcon";
import { LuUser } from "react-icons/lu";
import { IoLockClosedOutline } from "react-icons/io5";
import Button from "../../../../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  getTokenLocalStorage,
  setLocalStorage,
} from "../../../../Utils/LocalStorage";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      emailPhone: loginRef.current.emailPhone.value,
      password: loginRef.current.password.value,
    };

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3031/public/signin",
        formData
      );
      if (res.data.status !== true) {
        toast.warn(res.data.errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        const user = await res.data;
        toast.success(user.successMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLocalStorage("-token-x-public", user._token__);
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (getTokenLocalStorage("-token-x-public")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <ToastContainer />
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
                  <form
                    method="POST"
                    ref={loginRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 px-9"
                  >
                    <FormInputIcon
                      className="text-personal-20"
                      variant="sm-outlined"
                      type="text"
                      name="emailPhone"
                      icon={<LuUser />}
                      placeholder="Email"
                      iconClassName="text-personal-10"
                    />
                    <FormInputIcon
                      variant="sm-outlined"
                      className="mb-4 text-white"
                      type="password"
                      name="password"
                      icon={<IoLockClosedOutline />}
                      placeholder="****"
                      passwordClassName="text-personal-10"
                      iconClassName="text-personal-10"
                    />
                    <Button
                      type="submit"
                      disabled={loading ? true : false}
                      className="bg-mariner-900 py-2.5 text-white"
                    >
                      {loading ? (
                        <div className="loading">
                          <div className="loading-spinner"></div>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                  <divx
                    onClick={() => navigate("/signup")}
                    className="mt-3 text-blue-400 cursor-pointer px-9 text-end lg:text-center"
                  >
                    New to Flipkart? Create an account
                  </divx>
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
