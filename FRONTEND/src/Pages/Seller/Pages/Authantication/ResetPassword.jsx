import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../../Components/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import FormInputIcon from "../../../../Components/FormInputIcon";
import { IoMailOutline } from "react-icons/io5";
import { toastifyOptions } from "../../../../Utils/tostifyDefault";

const ResetPassword = () => {
  const npassword = useRef();
  const cpassword = useRef();

  const [isloading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const uid = params.get("uid");
  const resetuid = params.get("resetuid");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_URL
        }/seller/reset-password/?uid=${uid}&resetuid=${resetuid}`,
        {
          npassword: npassword.current.value,
          cpassword: cpassword.current.value,
        }
      );

      const data = await res.data;

      if (res.status === 200) {
        setLoading(false);
        toast.success(data.successMessage, toastifyOptions);
        setTimeout(() => {
          window.location.href = `http://localhost:5173/seller/login`;
        }, 3000);
      } else {
        toast.warn(data.errorMessage, toastifyOptions);
      }
    } catch (err) {
      toast.warn(err.response.data.errorMessage, toastifyOptions);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer stacked />
      <section className="relative flex items-center justify-center py-8">
        <div className="shadow lg:rounded-lg  lg:w-[32rem]">
          <div className="w-full col-span-12 px-3 py-8 place-items-center lg:col-span-5 bg-mariner-50 ">
            <div className="flex justify-center text-2xl font-bold">
              Change Password
            </div>
            <div className="flex flex-col justify-between col-span-12 px-1 py-8 pb-12 lg:px-2">
              <form
                action="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 px-9"
              >
                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="password"
                  name="npassword"
                  ref={npassword}
                  value={npassword.current}
                  icon={<IoMailOutline />}
                  placeholder="Enter new password"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />
                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="password"
                  name="cpassword"
                  ref={cpassword}
                  value={cpassword.current}
                  icon={<IoMailOutline />}
                  placeholder="Conform password"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />

                <div className="flex flex-col ">
                  <button
                    type="submit"
                    // disabled={isloading ? true : false}
                    className={`rounded-md py-2.5 ${
                      isloading
                        ? "bg-gray-400 text-black"
                        : "bg-mariner-900  text-white"
                    }`}
                  >
                    {isloading ? (
                      <div className="loading ">
                        <div className="loading-spinner"></div>
                      </div>
                    ) : (
                      "Reset"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
