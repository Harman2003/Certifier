import { useEffect, useState } from "react";
import useAxiosPrivate from "@/setup/hooks/auth/useAxiosPrivate";
import OnboardData from "@/components/common/onboardData";
const Onboarding = () => {
  const isWelcomeDone = localStorage.getItem("onboard");
  const [step, setStep] = useState<number>(isWelcomeDone ? 3 : 0);
  const [isOnboard, setIsOnboard] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get("/profile/onboard", {
          params: { initial: true },
        });
        const userOnboardResponse = response.data?.onboarding;
        setIsOnboard(userOnboardResponse);
        console.log(typeof userOnboardResponse);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  
  return ((isOnboard && step<=6) && <OnboardData step={step} setStep={setStep}/>)
};

export default Onboarding;
