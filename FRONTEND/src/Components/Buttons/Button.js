import React from "react";

const Button = ({ type, onClick, className, children, props }) => {
  return (
    <button
      type={type || ""}
      onClick={(e) => onClick(e)}
      className={`w-full   rounded-md bg-mariner-950  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
