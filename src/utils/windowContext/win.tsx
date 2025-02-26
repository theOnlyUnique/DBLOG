// WindowSizeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const WindowSizeContext = createContext();

export const WindowSizeProvider = ({ children }) => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isHorizontal, setIsHorizontal] = useState(window.innerWidth >= 768); // 根据需要调整断点
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setIsHorizontal(window.innerWidth >= 768)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={{size,isHorizontal}}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = () => useContext(WindowSizeContext);