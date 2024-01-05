import React from "react";
import useWeb3 from "@/setup/hooks/web3/useWeb3";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ContractCard from "@/components/org/Dashboard/components/ContractCard";
const OnboardData = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { address, orgContract } = useWeb3();

  const stepList = [
    {
      id: "step-0",
      text: "Welcome Aboard, I am Certify Genie",
      img: "genie2.png",
      highlightId: "",
      required: "none",
      position: "bottom-10 left-1/2 -translate-x-1/2",
    },
    {
      id: "step-1",
      text: "Here's a sidebar, to navigate easily",
      img: "genie1.png",
      highlightId: "sidebar",
      required: "none",
      position: "bottom-10 left-[300px]",
    },
    {
      id: "step-2",
      text: "You could look at your profile section",
      img: "genie2.png",
      highlightId: "profile",
      required: "none",
      position: "bottom-10 right-[200px]",
    },
    {
      id: "step-3",
      text: "You need to connect your wallet with the Certify",
      img: "genie4.png",
      highlightId: "wallet",
      required: address,
      position: "bottom-10 left-1/2 -translate-x-1/2",
    },
    {
      id: "step-4",
      text: "Hope you have some SepoliaEth in your wallet or visit sepoliafaucet.com",
      img: "faucet.png",
      highlightId: "",
      required: "none",
      position: "bottom-24 left-1/2 -translate-x-1/2",
    },
    {
      id: "step-5",
      text: "Finally, We need to build our Contract",
      img: "genie2.png",
      highlightId: "",
      required: orgContract,
      position: "bottom-20 left-10",
    },
    {
      id: "step-6",
      text: "Great! You're ready to create certificates",
      img: "genie4.png",
      highlightId: "",
      required: "none",
      position: "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
    },
  ];
  const { id, highlightId, img, text, required, position } = stepList[step];

  const next = () => {
    if (!required) return;
    if (step + 1 == 3) {
      localStorage.setItem("onboard", "done");
    }
    console.log("next press");
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    let currentIndex: string;
    const element = document.getElementById(highlightId);
    if (element) {
      currentIndex = element.style.zIndex;
      element.style.zIndex = "100";
      element.style.pointerEvents = required ? "none" : "auto";
    }
    return () => {
      if (element) {
        element.style.zIndex = currentIndex;
        element.style.pointerEvents = "auto";
      }
    };
  }, [step, required]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.keyCode === 32) {
        if (required) {
          next();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [step, required]);
  return (
    <div
      key={id}
      className="fixed top-0 z-[90] w-full h-full bg-black/95"
      onClick={next}
    >
      <div className={`absolute ${position} flex flex-col items-center`}>
        <motion.div
          className="w-[460px] text-white font-bold font-Doodle  text-4xl tracking-wider leading-[55px] mb-4"
          initial={{ x: -200, opacity: 0, scale: 0 }}
          whileInView={{
            x: [-200, 1, 0],
            opacity: 1,
            scale: [0, 1.1, 1],
            transition: { duration: 0.6 },
          }}
        >
          {text}
        </motion.div>
        <motion.img
          key="genie"
          src={`/images/${img}`}
          alt=""
          className="h-[300px] rounded-3xl"
          initial={{ x: 0, y: 0, scale: 0 }}
          whileInView={{
            scale: [0, 1.1, 1],
            x: [200, 0, 0],
            y: [150, 0, 0],
            transition: { duration: 0.6 },
          }}
        />
      </div>
      {step == 5 && (
        <div className="absolute top-1/2 -translate-y-1/2 right-10">
          <ContractCard />
        </div>
      )}
      {required && (
        <div className="font-Montserrat absolute bottom-2 right-1/2 translate-x-1/2 text-lg flex items-end gap-2 text-white/50 animate-pulse">
          Click Anywhere for Next
        </div>
      )}
    </div>
  );
};

export default OnboardData;
