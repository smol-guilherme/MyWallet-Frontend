import { createContext, useState } from "react";

const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [userData, setUserData] = useState([]);

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
