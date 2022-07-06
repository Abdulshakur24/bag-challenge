import { ReactNode, useContext, createContext, useState } from "react";
import { ToggleProps } from "src/types/defaults";

const ToggleContext = createContext({} as ToggleProps);

export const useToggle = () => {
  return useContext(ToggleContext);
};

const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState({
    burger: false,
    search: false,
    modal: false,
  });

  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
