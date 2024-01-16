import { discount, robot } from "@/assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section id="home" className="flex md:flex-row flex-col sm:pt-10 pt-6">
      <div className="flex-1 flex justify-center items-start flex-col xl:px-0 sm:px-20 px-6">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[90px] leading-[70px]">
            The NextGen <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Certificate</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[90px] leading-[70px] w-full">
          Creation Method
        </h1>
        <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] ml-2 max-w-[470px] mt-5">
          Unlock a new era of trust with NextGen Certificates leveraging
          blockchain for secure validation. Instantly verify your
          achievements and success with confidence.
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center md:my-0 my-10 relative">
        <img src={robot} alt="billing" className=" w-[80%] relative z-[5]" />

        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>

      <div className="ss:hidden flex-1 flex justify-center items-center md:my-0 my-10 relative">
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
