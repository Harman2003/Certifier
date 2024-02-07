import { useContext } from "react";
import { TemplateContext, TemplateContextProps } from "../../context/TemplateProvider";

const useParameters = () => {
  return useContext<TemplateContextProps>(TemplateContext);
};

export default useParameters;
