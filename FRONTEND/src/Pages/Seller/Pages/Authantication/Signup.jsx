import { useState } from "react";
import Button from "../../../../Components/Button";
import { IoLocate, IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useDebounce from "../../../../Hooks/useDebounce.Hook.jsx";
import axios from "axios";
import FormInputIcon from "../../../../Components/FormInputIcon";
import { toastifyOptions } from "../../../../Utils/tostifyDefault.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setinputVal] = useState({
    firstname: "",
    surname: "",
    email: "",
    mobile: "",
    password: "",
    gstNum: "",
  });
  const handChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setinputVal({ ...input, [name]: value });
  };
  const FromVal = useDebounce(input, 500);
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3031/seller/register`,
      FromVal
    );
    if (res.data.status !== true) {
      toast.warn(res.data.errorMessage, toastifyOptions);
    } else {
      const user = await res.data;

      toast.success(user.successMessage, toastifyOptions);
      setTimeout(() => {
        navigate("/seller/login");
      }, 700);
    }
  };

  return (
    <>
      <ToastContainer stacked />
      <section className="relative w-full py-8 bg-gradient-to-br from-personal-900 to-rose-800">
        <div className="grid justify-center w-full grid-cols-12 ">
          <div className="w-full col-span-12 px-3 py-8 lg:rounded-lg lg:col-start-4 lg:col-span-6 bg-mariner-50 ">
            <div className="flex justify-center text-2xl font-bold">SignUp</div>
            <div className="flex flex-col justify-between col-span-12 px-4 py-8 pb-12">
              <form
                onSubmit={handleSubmit}
                method="POST"
                className="flex flex-col gap-6 px-9"
              >
                <div className="grid gap-5 lg:grid-cols-2">
                  <FormInputIcon
                    className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300"
                    variant="sm-outlined"
                    type="text"
                    onChange={handChange}
                    value={input.firstname}
                    name="firstname"
                    icon={<LuUser />}
                    placeholder="first Name"
                    iconClassName="text-personal-900"
                  />
                  <FormInputIcon
                    variant="sm-outlined"
                    className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                    type="text"
                    name="surname"
                    onChange={handChange}
                    value={input.surname}
                    icon={<LuUser />}
                    placeholder="surname"
                    passwordClassName="text-personal-900"
                    iconClassName="text-personal-900"
                  />
                </div>
                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="email"
                  name="email"
                  onChange={handChange}
                  value={input.email}
                  icon={<IoMailOutline />}
                  placeholder="@gmail.com"
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />

                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="text"
                  name="mobile"
                  onChange={handChange}
                  value={input.mobile}
                  icon={<IoLockClosedOutline />}
                  placeholder="phone nu."
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
                <FormInputIcon
                  variant="sm-outlined"
                  className="!text-personal-800 placeholder:text-personal-900/50 border-personal-300 "
                  type="text"
                  name="gstNum"
                  onChange={handChange}
                  value={input.gstNum}
                  icon={<IoLocate />}
                  placeholder="GST number..."
                  passwordClassName="text-personal-900"
                  iconClassName="text-personal-900"
                />
                <Button
                  type="submit"
                  className="py-2.5 text-white bg-mariner-900"
                >
                  SignUp
                </Button>
                <Link
                  to="/seller/login"
                  className="py-2.5 rounded-md bg-black text-center text-white"
                >
                  Existing User? Log in
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
