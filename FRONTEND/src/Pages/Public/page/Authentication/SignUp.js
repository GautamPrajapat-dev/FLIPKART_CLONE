import React, { useRef } from "react";
import FormInputIcon from "../../../../Components/FormInputIcon";
import { LuUser } from "react-icons/lu";
import { IoLockClosedOutline } from "react-icons/io5";
import Button from "../../../../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const SignUp = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const handleSubmit = async (e) => {
    // const data = new FormData(formRef.current);
    e.preventDefault();

    try {
      const formData = {
        firstname: formRef.current.firstname.value,
        surname: formRef.current.surname.value,
        mobile: formRef.current.mobile.value,
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      };

      const res = await axios.post(
        "http://localhost:3031/public/signup",
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

        window.location.href = "/login";
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
    }
  };
  return (
    <>
      <ToastContainer />
      <section className="relative w-full">
        <div className="flex my-6">
          <div className="grid justify-center w-full grid-cols-12">
            <div className="w-full col-span-12 p-3 lg:rounded-lg lg:col-start-4 lg:col-span-6 ">
              <div className="grid grid-cols-12 ">
                <div className="col-span-12 px-5 py-12 lg:col-span-5 flex flex-col justify-between bg-mariner-900  lg:h-[32rem]">
                  <div>
                    <div className="text-3xl font-bold text-center text-personal-50 lg:text-start">
                      Looks like you're new her!
                    </div>
                    <p className="mt-2 text-sm text-center lg:text-start text-daintree-200 lg:text-base">
                      Sign up with your mobile number to get started
                    </p>
                  </div>
                  <img
                    src="https://www.bingocycles.com/images/login_img.png"
                    className="hidden lg:block"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between col-span-12 px-4 py-8 lg:col-span-7 bg-mariner-200 dark:text-white dark:bg-gray-900 ">
                  <form
                    method="POST"
                    onSubmit={handleSubmit}
                    ref={formRef}
                    className="flex flex-col gap-6 px-9"
                  >
                    <FormInputIcon
                      className="text-personal-900 dark:text-white placeholder:text-personal-500 border-personal-300"
                      variant="sm-outlined"
                      type="text"
                      name="firstname"
                      icon={<LuUser />}
                      placeholder="firstname"
                      iconClassName="text-personal-900 dark:text-personal-100"
                    />
                    <FormInputIcon
                      className="text-personal-800 dark:text-white placeholder:text-personal-900 border-personal-300"
                      variant="sm-outlined"
                      type="text"
                      name="surname"
                      icon={<LuUser />}
                      placeholder="surname"
                      iconClassName="text-personal-900 dark:text-personal-100"
                    />
                    <FormInputIcon
                      className="text-personal-800 dark:text-white placeholder:text-personal-900 border-personal-300"
                      variant="sm-outlined"
                      type="text"
                      name="mobile"
                      icon={<LuUser />}
                      placeholder="mobile"
                      iconClassName="text-personal-900 dark:text-personal-100"
                    />
                    <FormInputIcon
                      className="text-personal-800 dark:text-white placeholder:text-personal-900 border-personal-300"
                      variant="sm-outlined"
                      type="email"
                      name="email"
                      icon={<LuUser />}
                      placeholder="email"
                      iconClassName="text-personal-900  dark:text-white dark:text-personal-100"
                    />
                    <FormInputIcon
                      variant="sm-outlined"
                      className="text-personal-800 dark:text-white placeholder:text-personal-900 border-personal-300"
                      type="password"
                      name="password"
                      icon={<IoLockClosedOutline />}
                      placeholder="****"
                      passwordClassName="text-personal-900 dark:text-personal-100"
                      iconClassName="text-personal-900 dark:text-personal-100"
                    />
                    <Button
                      type="submit"
                      className="py-2.5 bg-mariner-900 text-white"
                    >
                      SignUp
                    </Button>
                    <Button
                      onClick={() => navigate("/login")}
                      className="py-2.5 text-personal-700 "
                    >
                      Existing User? Log in
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
