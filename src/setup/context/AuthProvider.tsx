import React, {createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  auth: {
    email: string;
    accessToken: string;
    role:string
  } | null;
  setAuth: React.Dispatch<
    React.SetStateAction<{
      email: string;
      accessToken: string;
      role:string
    } | null>
  >;
}

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: () => null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const storedAuthDetails = localStorage.getItem("auth");
  const prevAuthDetails = storedAuthDetails
    ? JSON.parse(storedAuthDetails)
    : null;

  const [auth, setAuth] = useState<{
    email: string;
    accessToken: string;
    role: string
  } | null>(prevAuthDetails);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};


