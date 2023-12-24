import { useContext } from "react";
import { Web3Context, Web3ContextProps } from "../../context/web3Provider";

const useWeb3 = () => {
  return useContext<Web3ContextProps>(Web3Context);
};

export default useWeb3;
