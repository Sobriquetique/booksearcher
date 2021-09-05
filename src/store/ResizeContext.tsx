import React, { FunctionComponent } from "react";
import { useContext } from "react";

type Props_ResizeContext = {children: React.ReactNode, isMobile: boolean};

const ResizeContext = React.createContext<boolean>(false);

export const ResizeProvider_withoutMemo: FunctionComponent<Props_ResizeContext> = ({children, isMobile}: Props_ResizeContext) => {
  return (
    <ResizeContext.Provider value={isMobile}>
      {children}
    </ResizeContext.Provider>
  );
};

export const isMobileEqual = (prev: Props_ResizeContext, next: Props_ResizeContext): boolean => {
  if (prev.isMobile === next.isMobile) return true;
  return false;
};

export const ResizeProvider = React.memo(ResizeProvider_withoutMemo, isMobileEqual);

export const useResizeContext = (): boolean => {
  return useContext(ResizeContext);
};