import Web3 from "web3";
import useWindowFocus from "../utils/useWindowFocus";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useCallback, useEffect, useRef, useState } from "react";

//keep check if network is switched and also initally check as well if network is sepolia or not , if not :-
// try {
//   await provider.request({
//     method: "wallet_switchEthereumChain",
//     params: [{ chainId: "0x89" }],
//   });
//   console.log("You have switched to the right network");
// } catch (switchError) {
//   // The network has not been added to MetaMask
//   if (switchError.code === 4902) {
//     console.log("Please add the Polygon network to MetaMask");
//   }
//   console.log("Cannot switch to the network");
// }

interface useMetamaskInterface {
  connect: () => Promise<void>;
  address: string;
  balance: string;
  chainId: bigint;
}

export function useMetamask(): useMetamaskInterface {
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<bigint>(0n);
  const [balance, setBalance] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);
  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (typeof window.ethereum != "undefined") {
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.getChainId();
          setAddress(accounts[0] ? accounts[0] : "");
          setChainId(networkId);
          if (accounts?.length > 0) {
            const weiBalance = await web3.eth.getBalance(accounts[0]);
            setBalance(web3.utils.fromWei(weiBalance, "ether"));
          } else {
            setBalance("");
          }
          onboarding.current?.stopOnboarding();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refetch]);

  useEffect(() => {
    if (typeof window.ethereum != "undefined") {
      const web3 = new Web3(window.ethereum);
      const refetchData = () => {
        console.log("refetch called");
        setRefetch((prev) => !prev);
      };

      web3.provider?.on("accountsChanged", refetchData);
      web3.provider?.on("chainChanged", refetchData);
      web3.provider?.on("disconnect", refetchData);

      return () => {
        web3.provider?.removeListener("accountsChanged", refetchData);
        web3.provider?.removeListener("chainChanged", refetchData);
        web3.provider?.removeListener("disconnect", refetchData);
      }
    }
  }, []);

  const connect = async () => {
    try {
      if (typeof window.ethereum == "undefined") {
        onboarding.current?.startOnboarding();
      } else {
        await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [{ chainId: "0xAA36A7" }],
        });
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xAA36A7" }],
        });
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { connect, address, balance, chainId };
}
