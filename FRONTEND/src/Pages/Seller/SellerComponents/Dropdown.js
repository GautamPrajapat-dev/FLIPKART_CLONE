import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative inline-block px-3 lg:px-auto ${className}`}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      <div className="flex items-center justify-between gap-1 lg:justify-start">
        {trigger}
        <IoIosArrowDown
          className={isOpen ? " -rotate-180 transition delay-10" : ""}
        />
      </div>

      {isOpen && (
        <div
          className="inline-flex flex-col justify-center w-56 py-2 mt-3 text-sm font-medium text-white rounded-md lg:mt-2 lg:absolute lg:px-2 lg:border lg:shadow-md lg:bg-personal-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          role="menu"
          aria-orientation="vertical"
        >
          <div
            className="flex flex-col gap-2 py-2 text-black pr-7 "
            role="none"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
