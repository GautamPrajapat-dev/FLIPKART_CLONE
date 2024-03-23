import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const FormInput = (props) => {
  const [showPassword, setShowPassword] = useState(true);
  const {
    className,
    label,
    type,
    name,
    value,
    placeholder,
    labelClassName,
    variant,
    messageClassName,
    message,
    passwordClassName,
  } = props;
  return (
    <>
      {variant === "sm-filled" && (
        <div>
          <div className="relative">
            {/* small filled */}
            <input
              type={type === "password" && !showPassword ? "text" : type}
              id={name}
              name={name}
              value={value}
              autoComplete={type === "password" ? "false" : "true"}
              className={`block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
              placeholder={placeholder || ""}
            />
            {type === "password" && (
              <div
                className={`absolute inset-y-0 z-0 flex items-center text-base  cursor-pointer end-0 pe-4  ${passwordClassName}`}
                onClick={() =>
                  setShowPassword((setShowPassword) => !setShowPassword)
                }
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            )}
            {label && (
              <label
                htmlFor={name}
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 bg-white peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${labelClassName}`}
              >
                {label}
              </label>
            )}
          </div>
          {message && (
            <p id={name} className={`mt-2 text-xs ${messageClassName}`}>
              {message}
            </p>
          )}
        </div>
      )}
      {variant === "sm-outlined" && (
        <div>
          <div className="relative mt-2">
            <input
              type={type || "text"}
              id={name}
              name={name}
              autoComplete={type === "password" ? "false" : "true"}
              className={`block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder={placeholder || ""}
            />
            {type === "password" && (
              <div
                className={`absolute inset-y-0 z-0 flex items-center text-base  cursor-pointer end-0 pe-4  ${passwordClassName}`}
                onClick={() =>
                  setShowPassword((setShowPassword) => !setShowPassword)
                }
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            )}
            {label && (
              <label
                htmlFor={name}
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:mx-3 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${labelClassName} `}
              >
                {label}
              </label>
            )}
          </div>
          {message && (
            <p id={name} className={`mt-2 text-xs ${messageClassName}`}>
              {message}
            </p>
          )}
        </div>
      )}
      {variant === "sm-standard" && (
        <div>
          <div className="relative z-0">
            <input
              type={type || "text"}
              id={name}
              value={value}
              autoComplete={type === "password" ? "false" : "true"}
              className={`block w-full px-0 py-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
              placeholder={placeholder || ""}
            />
            {type === "password" && (
              <div
                className={`absolute inset-y-0 z-0 flex items-center text-base  cursor-pointer end-0 pe-4  ${passwordClassName}`}
                onClick={() =>
                  setShowPassword((setShowPassword) => !setShowPassword)
                }
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            )}
            {label && (
              <label
                htmlFor={name}
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 bg-white peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${labelClassName}`}
              >
                {label}
              </label>
            )}
          </div>
          {message && (
            <p id={name} className={`mt-2 text-xs ${messageClassName}`}>
              {message}
            </p>
          )}
        </div>
      )}
      {variant === "lg-filled" && (
        <div>
          <div className="relative">
            <input
              type={type || "text"}
              id={name}
              value={value}
              autoComplete={type === "password" ? "false" : "true"}
              name={name}
              className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
              placeholder={placeholder || " "}
            />
            {type === "password" && (
              <div
                className={`absolute inset-y-0 z-0 flex items-center text-base  cursor-pointer end-0 pe-4  ${passwordClassName}`}
                onClick={() =>
                  setShowPassword((setShowPassword) => !setShowPassword)
                }
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            )}
            {label && (
              <label
                htmlFor={name}
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 bg-white peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${labelClassName}`}
              >
                {label}
              </label>
            )}
          </div>
          {message && (
            <p id={name} className={`mt-2 text-xs ${messageClassName}`}>
              {message}
            </p>
          )}
        </div>
      )}
      {variant === "lg-outlined" && (
        <div>
          <div className="relative">
            <input
              type={type || "text"}
              id={name}
              value={value}
              autoComplete={type === "password" ? "false" : "true"}
              name={name}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
              placeholder={placeholder || ""}
            />
            {type === "password" && (
              <div
                className={`absolute inset-y-0 z-0 flex items-center text-base  cursor-pointer end-0 pe-4  ${passwordClassName}`}
                onClick={() =>
                  setShowPassword((setShowPassword) => !setShowPassword)
                }
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            )}
            {label && (
              <label
                htmlFor={name}
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  ${labelClassName}`}
              >
                {label}
              </label>
            )}
          </div>
          {message && (
            <p id={name} className={`mt-2 text-xs ${messageClassName}`}>
              {message}
            </p>
          )}
        </div>
      )}
      {variant === "lg-standard" && (
        <div>
          <div className="relative z-0">
            <input
              type={type || "text"}
              id={name}
              value={value}
              name={name}
              autoComplete={type === "password" ? "false" : "true"}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
              placeholder={placeholder || ""}
            />
            {type === "password" && (
              <div
                className={`absolute inset-y-0 z-0 flex items-center text-base  cursor-pointer end-0 pe-4  ${passwordClassName}`}
                onClick={() =>
                  setShowPassword((setShowPassword) => !setShowPassword)
                }
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            )}
            {label && (
              <label
                htmlFor={name}
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 bg-white peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${labelClassName}`}
              >
                {label}
              </label>
            )}
          </div>
          {message && (
            <p id={name} className={`mt-2 text-xs ${messageClassName}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default FormInput;
