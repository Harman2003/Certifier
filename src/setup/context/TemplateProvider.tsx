import React, { createContext, useState, ReactNode } from "react";
export interface ParamsInterface {
   name: string;
   userId: string;
   grade: string;
   creation: string;
   expiration: string;
   certificateId: string;
 }
export interface TemplateContextProps {
  parameters: ParamsInterface;
  setParameters: React.Dispatch<React.SetStateAction<ParamsInterface>>;
}

export const TemplateContext = createContext<TemplateContextProps>({
  parameters: {
    name: "",
    userId: "",
    grade: "",
    creation: "",
    expiration: "",
    certificateId: ""
  },
    setParameters: () => null
});

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [parameters, setParameters] = useState<ParamsInterface>({
    name: "",
    userId: "",
    grade: "",
    creation: "",
    expiration: "",
    certificateId: ""
  });

  return (
    <TemplateContext.Provider value={{ parameters, setParameters }}>
      {children}
    </TemplateContext.Provider>
  );
};
