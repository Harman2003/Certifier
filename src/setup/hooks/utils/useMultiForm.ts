import { useState } from "react";

const useMultiForm = (stages: number) => {
  const [stage, setStage] = useState<number>(0);
  const next = () => {
    if (stage >= stages-1) {
      setStage(0);
    } else setStage((prev) => prev + 1);
    };

    return { stage, next };
};
export default useMultiForm;
