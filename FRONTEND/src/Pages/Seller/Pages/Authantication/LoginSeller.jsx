import { useEffect, useRef, useState } from "react";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  getTokenLocalStorageSeller,
  setTokenLocalStorageSeller,
} from "../../../../Utils/LocalStorage";

import FormInputIcon from "../../../../Components/FormInputIcon.jsx";
import Button from "../../../../Components/Button.jsx";
import { toastifyOptions } from "../../../../Utils/tostifyDefault";
const LoginSeller = () => {
  const [isloading, seLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const emailPhoneRef = useRef();
  const PasswordRef = useRef();

  const Login = async () => {
    const dataval = {
      emailPhone: emailPhoneRef.current.value,
      password: PasswordRef.current.value,
    };
    try {
      seLoading(true);
      const res = await axios.post(
        `http://localhost:3031/seller/login`,
        dataval
      );
      if (res.data.status !== true) {
        toast.warn(res.data.errorMessage, toastifyOptions);
      } else {
        const user = await res.data;
        setTokenLocalStorageSeller(user._token__);

        toast.warn(user.successMessage, toastifyOptions);
        window.location.href = "/dashboard/main";
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage, toastifyOptions);
    } finally {
      seLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Login();
  };
  useEffect(() => {
    if (getTokenLocalStorageSeller("_token")) {
      navigate("/dashboard/main");
    }
  }, [navigate]);
  return (
    <>
      <ToastContainer />
      <section className="relative flex items-center justify-center py-8">
        <div className="shadow lg:rounded-lg  lg:w-[32rem]">
          <div className="w-full col-span-12 px-3 py-8 lg:rounded-lg lg:col-start-4 lg:col-span-6 bg-mariner-50 ">
            <div className="flex justify-center text-2xl font-bold">Login</div>
            <div className="flex flex-col justify-between col-span-12 px-1 py-8 pb-12 lg:px-2">
              <form
                action="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 px-9"
              >
                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="text"
                  name="emailPhone"
                  ref={emailPhoneRef}
                  icon={<IoMailOutline />}
                  placeholder="email or Phone"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />

                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="password"
                  name="password"
                  ref={PasswordRef}
                  icon={<IoLockClosedOutline />}
                  placeholder="****"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />

                <div className="flex flex-col">
                  <button
                    type="submit"
                    disabled={isloading ? true : false}
                    className={`py-2.5 rounded-md ${
                      isloading
                        ? "bg-gray-400 text-black"
                        : "bg-mariner-900  text-white"
                    }`}
                  >
                    {isloading ? (
                      <div className="loading">
                        <div className="loading-spinner"></div>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                  <div
                    className="self-end font-semibold cursor-pointer text-personal-400"
                    onClick={() => navigate("/seller/reset_your_password")}
                  >
                    forget password ?
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/seller/signup")}
                  className="py-2.5 rounded-md bg-black text-white"
                >
                  Create an New Account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSeller;
