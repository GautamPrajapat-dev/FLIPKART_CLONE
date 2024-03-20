import React, { useState } from "react";
import Button from "../../../../Components/Buttons/Button";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import FormInputIcon from "../../../../Components/Inputs/FormInputIcon";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useDebounce from "../../../../Hooks/useDebounce.Hook";
import axios from "axios";

const LoginSeller = () => {
  const [isloading, seLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setinputVal] = useState({
    emailPhone: "",
    password: "",
  });
  const handChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setinputVal({ ...input, [name]: value });
  };
  const FromVal = useDebounce(input, 500);
  axios.defaults.withCredentials = true;

  const Login = async () => {
    try {
      seLoading(true);
      const res = await axios.post(
        `http://localhost:3031/seller/login`,
        FromVal
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
        localStorage.setItem("_token", user._token__);
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

        navigate("/dasboard/main");
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
      seLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login();
  };

  return (
    <>
      <ToastContainer />
      <section className="relative w-full py-8 bg-gradient-to-br from-personal-900 to-rose-800">
        <div className="grid justify-center w-full grid-cols-12 ">
          <div className="w-full col-span-12 px-3 py-8 lg:rounded-lg lg:col-start-4 lg:col-span-6 bg-mariner-50 ">
            <div className="flex justify-center text-2xl font-bold">Login</div>
            <div className="flex flex-col justify-between col-span-12 px-4 py-8 pb-12">
              <form action="" className="flex flex-col gap-6 px-9">
                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="text"
                  name="emailPhone"
                  onChange={handChange}
                  value={input.email}
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
                  onChange={handChange}
                  value={input.password}
                  icon={<IoLockClosedOutline />}
                  placeholder="****"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="py-2.5 text-white bg-mariner-900"
                >
                  {isloading ? "loading.." : "Login"}
                </Button>
                <Button
                  onClick={() => navigate("/seller/signup")}
                  className="py-2.5 text-white"
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
