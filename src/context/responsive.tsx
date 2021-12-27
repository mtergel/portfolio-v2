import { createContext, useContext } from "react";
import { useResizeDetector } from "react-resize-detector";

const ResponsiveContext = createContext<boolean>(false);

const ResponsiveProvider: React.FC<{}> = ({ children }) => {
  const { width, ref } = useResizeDetector();

  return (
    <div ref={ref} className="h-full flex flex-col">
      <ResponsiveContext.Provider value={width ? width < 768 : false}>
        {children}
      </ResponsiveContext.Provider>
    </div>
  );
};

export const useResponsive = () => {
  return useContext(ResponsiveContext);
};

export default ResponsiveProvider;
