import { useEffect, useRef, useState } from "react";

const useDebounce = (val, delay = 300) => {
  const [debounceValue, setDebouncedValue] = useState("" || []);
  const timerRef = useRef();
  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(val), delay);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [val, delay]);
  return debounceValue;
};

export default useDebounce;
