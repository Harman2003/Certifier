// import useApiReceiver from "@/hooks/useApiReceiver";
import React, { createContext, useState, ReactNode } from "react";
interface AuthInterface {
  name: string;
  address: string;
  email: string;
  accessToken: string;
  role: string;
  picture: string;
}
export interface AuthContextProps {
  auth: AuthInterface;
  setAuth: React.Dispatch<React.SetStateAction<AuthInterface>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  auth: {
    name: "",
    address: "",
    email: "",
    accessToken: "",
    role: "",
    picture: "",
  },
  setAuth: () => null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const storedAuthDetails = localStorage.getItem("auth");
  const prevAuthDetails = storedAuthDetails
    ? JSON.parse(storedAuthDetails)
    : null;

  const [auth, setAuth] = useState<AuthInterface>(prevAuthDetails);
  // const { data } = useApiReceiver('/common/details', { email: auth?.email }, false);
  // const name = data?.name;
  // const address = data?.address;
  // const role = data?.role;
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
