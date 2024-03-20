import { useState } from "react";

const useToggle = ({ defaultChecked }) => {
  const [toggle, seToggle] = useState(defaultChecked || false);
  const toggler = () => seToggle(!toggle);
  return [toggle, toggler];
};

export default useToggle;
