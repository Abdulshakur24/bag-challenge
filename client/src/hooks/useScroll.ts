import { useEffect, useState } from "react";
import { throttle } from "src/utils/helpers";

type ScrollType = {
  currentY: number;
  lastY: number;
};

const useScroll = () => {
  const [scroll, setScroll] = useState<ScrollType>({
    currentY: 0,
    lastY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScroll((prev) => {
        return {
          currentY: window.scrollY,
          lastY: prev.currentY,
        };
      });
    };

    const throttleHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttleHandleScroll);

    return () => window.removeEventListener("scroll", throttleHandleScroll);
  }, []);

  return scroll;
};

export default useScroll;
