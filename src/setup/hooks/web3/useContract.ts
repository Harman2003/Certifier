import { useEffect, useState } from "react";
import Web3, { Contract, ContractAbi } from "web3";

export function useContract<Type extends ContractAbi>(
  contractAddress: string,
  contractABI: any
) {
  const [contract, setContract] = useState<Contract<Type> | undefined>(undefined);
  const infuraApiKey = import.meta.env.VITE_INFURA_KEY;
  const infuraUrl = `https://sepolia.infura.io/v3/${infuraApiKey}`;

  useEffect(() => {
    try {
      if (typeof window.ethereum != "undefined") {
        const web3 = new Web3(window.ethereum);
        if (contractAddress && typeof window.ethereum != "undefined") {
          web3.eth.transactionConfirmationBlocks = 5;
          const contractObject = new web3.eth.Contract(
            contractABI,
            contractAddress
          );
          if (contractObject) {
            setContract(() => {
              contractObject.transactionConfirmationBlocks = 2;
              contractObject.handleRevert = true;
              return contractObject;
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [contractAddress]);
  return { contract };
}
