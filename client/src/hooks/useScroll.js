import { useEffect, useState } from "react";

const useScroll = () => {
  const [data, setData] = useState({
    currentY: 0,
    lastY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setData((last) => {
        return {
          currentY: window.scrollY,
          lastY: last.currentY,
        };
      });
    };

    const throttleHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttleHandleScroll);

    return () => window.removeEventListener("scroll", throttleHandleScroll);
  }, []);

  return data;
};

function throttle(cb, delay = 1000) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      cb(...args);
      lastCall = now;
    }
  };
}

export default useScroll;
