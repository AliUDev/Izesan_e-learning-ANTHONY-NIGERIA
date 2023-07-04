import React from 'react';
import { debounce } from '../_methods';

const viewportContext = React.createContext({});

export const ViewportProvider = ({ children }) => {
  // This is the exact same logic that we previously had in our hook

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useLayoutEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    handleWindowResize();
    const handleResize = debounce(() => {
      handleWindowResize();
    }, 500);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Now we are dealing with a context instead of a Hook, so instead
     of returning the width and height we store the values in the
     value of the Provider */
  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>;
};

/* Rewrite the "useViewport" hook to pull the width and height values
   out of the context instead of calculating them itself */
export const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};
