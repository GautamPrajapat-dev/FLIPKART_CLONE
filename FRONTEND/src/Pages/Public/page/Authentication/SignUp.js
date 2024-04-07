import React from "react";
import FormInputIcon from "../../../../Components/Inputs/FormInputIcon";
import { LuUser } from "react-icons/lu";
import { IoLockClosedOutline } from "react-icons/io5";
import Button from "../../../../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
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
                <div className="flex flex-col justify-between col-span-12 px-4 py-8 lg:col-span-7 bg-mariner-200 ">
                  <form action="" className="flex flex-col gap-6 px-9">
                    <FormInputIcon
                      className="!text-personal-800 placeholder:text-personal-900 border-personal-300"
                      variant="sm-outlined"
                      type="text"
                      name="email"
                      icon={<LuUser />}
                      placeholder="Email"
                      iconClassName="text-personal-900"
                    />
                    <FormInputIcon
                      variant="sm-outlined"
                      className="!text-personal-800 placeholder:text-personal-900 border-personal-300"
                      type="password"
                      name="password"
                      icon={<IoLockClosedOutline />}
                      placeholder="****"
                      passwordClassName="text-personal-900"
                      iconClassName="text-personal-900"
                    />
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="py-2.5 bg-mariner-900"
                    >
                      SignUp
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => navigate("/login")}
                      className="py-2.5 bg-blue-400"
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
