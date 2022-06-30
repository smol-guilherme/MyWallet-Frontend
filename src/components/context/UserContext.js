import { createContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userSession, setUserSession] = useState();

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
