"use client";

import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { auth } from "../services/firebase";
import { MoonLoader } from "react-spinners";

interface AuthContextType {
  signup: (email: string, password: string) => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
      }}
    >
      {loading ? (
        <div id="loader">
          <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
