import { useEffect, useState } from "react";

const useWindowFocus = () => {
  const [isWindowFocus, setIsWindowFocus] = useState<boolean>(true);
  const handleFocus = () => {
    console.log("focussed");
    setIsWindowFocus(true);
  };
  const handleBlur = () => {
    console.log("blurred");
    setIsWindowFocus(false);
  };
  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return isWindowFocus;
}
export default useWindowFocus;
