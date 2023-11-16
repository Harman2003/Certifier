import useApiReceiver from "@/hooks/useApiReceiver";
import React, {createContext, useState, ReactNode } from "react";

interface AuthInterface{
  email: string;
  accessToken: string;
  role:string
}
interface AuthContextProps {
  auth: AuthInterface | null;
  setAuth: React.Dispatch<
    React.SetStateAction<AuthInterface | null>
  >;
  name: string,
  address: string,
  role:string
}

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: () => null,
  name: "",
  address: "",
  role:""
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const storedAuthDetails = localStorage.getItem("auth");
  const prevAuthDetails = storedAuthDetails
    ? JSON.parse(storedAuthDetails)
    : null;

  const [auth, setAuth] = useState<AuthInterface | null>(prevAuthDetails);
  const { data } = useApiReceiver('/common/details', { email: auth?.email }, false);
  const name = data?.name;
  const address = data?.address;
  const role = data?.role;
  return (
    <AuthContext.Provider value={{ auth, setAuth, name, address, role }}>
      {children}
    </AuthContext.Provider>
  );
};


