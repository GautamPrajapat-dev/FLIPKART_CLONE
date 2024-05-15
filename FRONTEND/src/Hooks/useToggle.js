import { useState } from "react";

const useToggle = ({ defaultValue }) => {
  const [toggle, setToggle] = useState(defaultValue || false);
  const toggler = () => {
    console.log("object");
    setToggle(!toggle);
  };

  return [toggle, toggler];
};

export default useToggle;
