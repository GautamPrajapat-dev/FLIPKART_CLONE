import { useEffect, useRef } from "react";

const useClickOutside = (callback) => {
  // const [ousiteToggle, setOutsideToggle] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;
