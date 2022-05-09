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

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return data;
};

export default useScroll;
