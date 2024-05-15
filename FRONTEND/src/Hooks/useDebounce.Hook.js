import { useEffect, useState } from "react";

const useDebounce = (val, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect(() => {
    // Set debouncedValue to val after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(val);
    }, delay);

    // Clear timeout if val or delay changes before delay elapses
    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);

  return debouncedValue;
};

export default useDebounce;
