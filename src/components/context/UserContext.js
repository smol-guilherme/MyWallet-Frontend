import { createContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState();

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
