/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useCallback } from "react";

const UserContext = createContext({
  user: { token: null },
  setUserToken: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ token: null });
  const setUserToken = useCallback((newToken) => {
    setUser((p) => ({ ...p, token: newToken }));
  }, []);
  return (
    <UserContext.Provider value={{ user, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
