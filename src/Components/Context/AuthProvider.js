import React, { createContext } from "react";
import useFirebase from "../hooks/useFirebase";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  //const {children}=props;
  const allCotext = useFirebase();
  return (
    <AuthContext.Provider value={allCotext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
