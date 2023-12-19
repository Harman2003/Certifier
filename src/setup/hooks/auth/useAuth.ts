import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../../context/AuthProvider";

const useAuth = () => {
  return useContext<AuthContextProps>(AuthContext);
};

export default useAuth;
