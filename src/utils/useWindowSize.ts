import { useEffect, useState } from "react";
import { RESIZE_THROTTLE_INTERVAL } from "src/_CONSTANTS/general";
import { getThrottledFunction } from "./getThrottledFunction";

type XYsize = {
  x: number;
  y: number;
};

const useWindowSize: () => XYsize = () => {
  const [size, setSize] = useState<XYsize>({x: 1920, y: 1080});

  useEffect(() => {
    const updateSize = () => {
      setSize( {x: window.innerWidth, y: window.innerHeight} );
    };
    const throttledUpdateSize = getThrottledFunction(updateSize, RESIZE_THROTTLE_INTERVAL);
    window.addEventListener("resize", throttledUpdateSize);
    updateSize();
    return () => window.removeEventListener("resize", throttledUpdateSize);
  }, []);
  return size;
};

export default useWindowSize;