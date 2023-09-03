import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  // user contexts
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  // task contexts
  const [refresh, setRefresh] = useState(false); // use this for realtime update showing

  return (
    <Context.Provider
      value={{ isAuth, setIsAuth, user, setUser, refresh, setRefresh }}
    >
      {children}
    </Context.Provider>
  );
};
