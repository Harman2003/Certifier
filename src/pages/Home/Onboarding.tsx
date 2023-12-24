import useAuth from "@/setup/hooks/auth/useAuth";
import useWeb3 from "@/setup/hooks/web3/useWeb3";
import { SetStateAction, useEffect, useState } from "react";
import { MdDoubleArrow as NextIcon } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
const Onboarding = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const { address, orgContract } = useWeb3();
  const isOnboardingDone = localStorage.getItem("onboarding");
  const stepList = [
    {
      id: "step-1",
      text: "Welcome Aboard, I am Certify Genie",
      img: "genie2.png",
      highlightId: "",
      required: "none",
      position: "bottom-10 left-1/2 -translate-x-1/2",
    },
    {
      id: "step-2",
      text: "Here's a sidebar, to navigate easily",
      img: "genie1.png",
      highlightId: "sidebar",
      required: "none",
      position: "bottom-10 left-[300px]",
    },
    {
      id: "step-3",
      text: "You could look at your profile section",
      img: "genie2.png",
      highlightId: "profile",
      required: "none",
      position: "bottom-10 right-[200px]",
    },
    {
      id: "step-4",
      text: "You need to connect your wallet with the Certify",
      img: "genie4.png",
      highlightId: "wallet",
      required: address,
      position: "bottom-10 left-1/2 -translate-x-1/2",
    },
    {
      id: "step-5",
      text: "Hope you have some SepoliaEth in your wallet or visit sepoliafaucet.com",
      img: "faucet.png",
      highlightId: "",
      required: "none",
      position: "bottom-24 left-1/2 -translate-x-1/2",
    },
    {
      id: "step-6",
      text: "Finally, We need to build our Contract",
      img: "genie2.png",
      highlightId: "contract",
      required: orgContract,
      position: "bottom-20 left-3",
    },
  ];
  const { id, highlightId, img, text, required, position } = stepList[step];

  const next = () => {
    if (stepList[step + 1].id == "step-4") {
      localStorage.setItem("onboarding", "false");
    }
    setStep(prev => prev + 1);
  }

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
    <div key={id} className="fixed top-0 z-[90] w-full h-full bg-black/95">
      <div className={`absolute ${position} flex flex-col items-center`}>
        <motion.div className="w-[440px] text-white font-bold font-Doodle  text-4xl tracking-wider leading-[55px] mb-4"
        initial={{x:-200, opacity:0, scale:0}} whileInView={{x:[-200,1,0] ,opacity:1,scale:[0,1.1,1], transition:{duration:0.6}}}>
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
      {required && (
        <>
          {" "}
          <button
            className="font-bold font-Montserrat absolute bottom-8 right-20 text-5xl flex items-end gap-2 animate-pulse hover:animate-none hover: text-white"
            onClick={next}
          >
            <div>Next</div>
            <NextIcon />
          </button>
          <div className="font-Montserrat absolute bottom-2 right-1/2 translate-x-1/2 text-lg flex items-end gap-2 text-white/50 animate-pulse">
            or Press Spacebar
          </div>
        </>
      )}
    </div>
  );
};

export default Onboarding;
