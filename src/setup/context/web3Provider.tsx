import React, {
  createContext,
  ReactNode,
  useState,
  useLayoutEffect,
} from "react";
import { Address, Contract } from "web3";
import { useContract } from "@/setup/hooks/web3/useContract";
import { useMetamask } from "@/setup/hooks/web3/useMetamask";
import { orgFactoryType } from "../../../web3/type/OrgFactory";
import orgFactoryABI from "../../../web3/abi/orgFactoryABI.json";
import { certificationType } from "../../../web3/type/Certification";
import certificationABI from "../../../web3/abi/certificationABI.json";
import useAuth from "../hooks/auth/useAuth";
import { stringToBytes32 } from "@/utils/stringToBytes32";
import Web3 from "web3";

export interface Web3ContextProps {
  address: Address;
  balance: string;
  chainId: bigint;
  connect: () => Promise<void>;
  factoryContract: Contract<orgFactoryType> | undefined;
  orgContract: Contract<certificationType> | undefined;
  setOrgContractAddress: React.Dispatch<React.SetStateAction<string>>
}

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Context = createContext<Web3ContextProps>({
  address: "",
  balance: "",
  chainId: 0n,
  connect: () => new Promise(() => {}),
  factoryContract: undefined,
  orgContract: undefined,
  setOrgContractAddress: ()=>null,
});

export const Web3Provider: React.FC<Web3ProviderProps> = ({
  children,
}: Web3ProviderProps) => {
  const { auth } = useAuth();
  const [orgContractAddress, setOrgContractAddress] = useState<Address>("");
  const { connect, address, balance, chainId } = useMetamask();
  const web3 = new Web3(window.ethereum);
  const { contract: factoryContract } = useContract<orgFactoryType>(
    import.meta.env.VITE_FACTORY_CONTRACT || "",
    orgFactoryABI
    );
    const { contract: orgContract } = useContract<certificationType>(
      orgContractAddress,
      certificationABI
      );

  useLayoutEffect(() => {
    (async () => {
      try {
        const response = await factoryContract?.methods.getOrgData(stringToBytes32(auth.id)).call();
        if (response && response["3"] != web3.utils.padRight("0x0", 40)) {
          setOrgContractAddress(response["3"]);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [factoryContract]);

  return (
    <Web3Context.Provider
      value={{
        address,
        balance,
        chainId,
        connect,
        factoryContract,
        orgContract,
        setOrgContractAddress,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
