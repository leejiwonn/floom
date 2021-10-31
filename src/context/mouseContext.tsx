import React, { createContext, useState } from 'react';

export const MouseContext = createContext({
  cursorType: '',
  cursorChangeHandler: (cursorType: string) => {
    console.log(cursorType);
  },
});

interface Props {
  children: React.ReactNode;
}

const MouseContextProvider = ({ children }: Props) => {
  const [cursorType, setCursorType] = useState('');

  const cursorChangeHandler = (cursorType: string) => {
    console.log(cursorType);
    setCursorType(cursorType);
  };

  return (
    <MouseContext.Provider
      value={{
        cursorType: cursorType,
        cursorChangeHandler: cursorChangeHandler,
      }}
    >
      {children}
    </MouseContext.Provider>
  );
};

export default MouseContextProvider;
