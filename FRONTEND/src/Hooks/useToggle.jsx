import { useState } from "react";

const useToggle = ({ defaultValue }) => {
  const [toggle, setToggle] = useState(defaultValue || false);
  const toggler = () => {
    setToggle(!toggle);
  };

  return [toggle, toggler];
};

export default useToggle;
