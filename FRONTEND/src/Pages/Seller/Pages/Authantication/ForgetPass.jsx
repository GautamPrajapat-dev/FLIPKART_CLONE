import axios from "axios";
import { useRef, useState } from "react";
import Button from "../../../../Components/Button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormInputIcon from "../../../../Components/FormInputIcon";
import { IoMailOutline } from "react-icons/io5";
import { toastifyOptions } from "../../../../Utils/tostifyDefault";

const ForgetPass = () => {
  const email = useRef();
  const [isloading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/seller/forget-password`,
        {
          email: email.current.value,
        }
      );
      console.log(res);
      const data = await res.data;
      console.log(data);
      if (res.status === 200) {
        setisLoading(false);
        toast.success(data.successMessage, toastifyOptions);
        setTimeout(
          () => (window.location.href = `http://localhost:5173/seller/login`),
          5000
        );
      } else {
        toast.warn(data.errorMessage, toastifyOptions);
      }
    } catch (err) {
      toast.warn(err.response.data.errorMessage, toastifyOptions);
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <section className="relative flex items-center justify-center py-8">
        <div className="shadow lg:rounded-lg lg:w-[32rem]">
          <div className="w-full col-span-12 px-3 py-8 place-items-center lg:col-span-5 bg-mariner-50 ">
            <div className="flex justify-center text-2xl font-bold">
              Reset Passowrd
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
                  type="text"
                  name="emailPhone"
                  ref={email}
                  value={email.current}
                  icon={<IoMailOutline />}
                  placeholder="e.g example@mail.com"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />

                <div className="flex flex-col">
                  <button
                    type="submit"
                    // disabled={isloading ? true : false}
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
                      "Change Passowrd"
                    )}
                  </button>
                </div>
                <Button
                  onClick={() => navigate("/seller/login")}
                  className="py-2.5 rounded-md bg-black text-white"
                >
                  Login Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPass;
