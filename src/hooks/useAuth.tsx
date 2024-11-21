import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Trying to use AuthContext outside of the provider");
  }

  return authContext;
};

export default useAuth;
