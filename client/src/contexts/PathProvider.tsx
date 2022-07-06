import { ReactNode, useContext, createContext, useState } from "react";
import { PathNameContextProps } from "src/types/defaults";

const PathNameContext = createContext({} as PathNameContextProps);

export const usePath = () => {
  return useContext(PathNameContext);
};

const PathProvider = ({ children }: { children: ReactNode }) => {
  const [pathName, setPathName] = useState("");

  return (
    <PathNameContext.Provider value={{ pathName, setPathName }}>
      {children}
    </PathNameContext.Provider>
  );
};

export default PathProvider;
