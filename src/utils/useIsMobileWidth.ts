import { useLayoutEffect, useState } from "react";
import { MOBILE_WIDTH_BREAKPOINT } from "src/_CONSTANTS/general";
import useWindowSize from "./useWindowSize";

const useIsMobileWidth: () => boolean = () => {
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false);
  const {x} = useWindowSize();

  let buffer = isMobileWidth;
  if (isMobileWidth && x > MOBILE_WIDTH_BREAKPOINT) {
    buffer = false;
  }
  if (!isMobileWidth && x <= MOBILE_WIDTH_BREAKPOINT) {
    buffer = true;
  }

  useLayoutEffect(() => {
    setIsMobileWidth(buffer);
  }, [buffer]);

  return isMobileWidth;
}

export default useIsMobileWidth;