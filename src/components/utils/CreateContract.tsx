import { useState } from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import { StepConnector } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import { motion } from "framer-motion";
import useAuth from "@/setup/hooks/auth/useAuth";
import useWeb3 from "@/setup/hooks/web3/useWeb3";
import { stringToBytes32 } from "@/utils/stringToBytes32";
import { FiExternalLink as LinkIcon } from "react-icons/fi";
import { BsFillPatchCheckFill as CheckIcon } from "react-icons/bs";
import DotLoader from "./DotLoader";
import TransactionCard from "./TransactionCard";
import { SquareLoader } from "./contractLoader";
import WalletButton from "./WalletButton";
import useAxiosPrivate from "@/setup/hooks/auth/useAxiosPrivate";

const CreateContract = ({ next }: { next: () => void }) => {
  const { auth } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const { factoryContract, address, setOrgContractAddress, connect, chainId } = useWeb3();
  const [contractAddress, setContractAddress] = useState<string>();
  const [transactionHash, setTransactionHash] = useState<string>();
  const [isInitiated, setIsInitiated] = useState<boolean>(false);
  const isValidChainId = address && chainId == 11155111n;
  const axiosPrivate = useAxiosPrivate();

  const steps = [
    "Connect wallet address",
    "Iniating",
    "Waiting for confirmation",
    "Contract Created",
  ];

  return (
    <div className="w-[900px] h-[450px] py-4 px-10 rounded-2xl bg-white flex flex-col">
      <Box sx={{ width: "100%", color: "green" }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => (
            <Step
              key={label}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "rgb(34 197 94)", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    fontFamily: "Nunito",
                    fontWeight: 600,
                    color: "rgb(34 197 94)", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "rgb(30 64 175)", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    fontFamily: "Nunito",
                    fontWeight: 600,
                    color: "rgb(30 64 175)", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "white", // circle's number (ACTIVE)
                },
              }}
            >
              <StepLabel
                icon={
                  step == index && isInitiated && <DotLoader isError={error} />
                }
              >
                {label}
              </StepLabel>
              {index != 0 && (
                <StepConnector
                  sx={{
                    ".MuiStepConnector-line.MuiStepConnector-lineHorizontal":
                      step >= index
                        ? {
                            borderColor: "blue",
                            borderWidth: "1px",
                          }
                        : {},
                  }}
                />
              )}
            </Step>
          ))}
        </Stepper>
      </Box>

      {error ? (
        <div className="m-auto flex flex-col items-center">
          <div className="text-4xl font-Nunito font-semibold text-red-500 text-center">
            Contract Creation Failed
          </div>
          <a
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            className="underline text-sm text-blue-600 hover:text-blue-900"
          >
            <div className="flex">
              view on etherscan
              <LinkIcon size={9} />
            </div>
          </a>
          <button
            onClick={() => {
              setStep(1);
              setError(false);
              setIsInitiated(false);
            }}
            className="mt-10 border-blue-700 border px-3 py-1 rounded-xl font-Nunito hover:bg-blue-700/10"
          >
            Retry
          </button>
        </div>
      ) : step == 1 ? (
        isInitiated ? (
          <div className="m-auto">
            <SquareLoader />
          </div>
        ) : (
          <button
            onClick={isValidChainId ? registerContract : connect}
            className="m-auto border-blue-700 border border-double px-10 py-3 rounded-xl text-2xl font-semibold font-Nunito hover:bg-blue-700/10"
          >
            {isValidChainId ? "Register Contract" : "Connect Wallet"}
          </button>
        )
      ) : (
        <>
          <div className="self-center mt-20">
            {step >= 3 ? (
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    scale: [0, 1.2, 1],
                    transition: { duration: 1 },
                  }}
                >
                  <CheckIcon color="rgb(59 130 246)" size={25}/>
                </motion.div>
                <div className="text-3xl font-Nunito font-semibold">
                  Contract Created
                </div>
              </div>
            ) : (
              `${steps[step]}...`
            )}
          </div>
          <div className="mt-auto flex flex-col justify-center gap-2 flex-grow">
            {step >= 3 && (
              <TransactionCard
                isHash={false}
                type="Contract_Creation"
                hash={contractAddress}
              />
            )}
            <TransactionCard
              isHash={true}
              type="Register_Contract"
              hash={transactionHash}
            />
          </div>
        </>
      )}
    </div>
  );

  async function onboardComplete() {
    try {
      await axiosPrivate.post("/profile/onboard");
    } catch (err) {
      console.log(err);
    }
  }
  async function registerContract() {
    setIsInitiated(true);
    const name = auth.name;
    const email = auth.email;
    const id = stringToBytes32(auth.id);
    try {
      //used to predetermine the reverts
      await factoryContract?.methods.register(name, email, id).estimateGas();
      await factoryContract?.methods
        .register(name, email, id)
        .send({ from: address })
        .on("transactionHash", function (hash) {
          setStep((prev) => prev + 1);
          setTransactionHash(hash);
          console.log("Transaction Hash:", hash);
        })
        .on("receipt", function (receipt) {
          console.log("Transaction Receipt:", receipt);
        })
        .on("confirmation", (confirmation) => {
          setStep((prev) => prev + 1);
          onboardComplete();
          const newContractAddress = confirmation.receipt.logs["0"].address;
          setContractAddress(newContractAddress);
          if (confirmation.confirmations == 2n) {
            setOrgContractAddress(newContractAddress || "");
          }
        });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }
};

export default CreateContract;
