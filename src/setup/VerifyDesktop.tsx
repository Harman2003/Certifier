import { useRef } from "react";
import { Outlet } from "react-router-dom";
const VerifyDesktop = () => {
  const windowWidth = useRef([window.innerWidth]);
  return windowWidth.current[0] < 800 ? (
    <div className="relative bg-primary w-full h-full flex flex-col overflow-hidden">
      <img src='/logo.svg' alt="certify" className="w-[164px] pt-4 pl-2" />
      <div className="flex-1 flex flex-col items-center justify-center text-white text-2xl font-bold font-Nunito text-center">
        <div className="relative bottom-20">
          Please visit <br /> only via Desktop
        </div>
      </div>
      <div className="absolute z-[0] w-[40%] h-[35%] bottom-0 right-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient  -bottom-96 -right-96" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
    </div>
  ) : (
    <Outlet />
  );
};

export default VerifyDesktop;
