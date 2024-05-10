import { useEffect, useRef } from "react";

const useDebounce = (val, delay = 300) => {
  const debouncedValue = useRef(val);

  useEffect(() => {
    // Update debounced val after delay
    const handler = setTimeout(() => {
      debouncedValue.current = val;
    }, delay);

    // Clear timeout on cleanup
    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);

  return debouncedValue.current;
};

export default useDebounce;
