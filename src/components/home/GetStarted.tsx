import styles from "@/pages/Home/style";
import { arrowUp } from "@/assets";
import { Link } from "react-router-dom";

const GetStarted = () => (
  <Link to={'/auth/register'}>
    <div
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient-2 p-[2px] cursor-pointer`}
    >
      <div
        className={`${styles.flexCenter} flex-col bg-landing w-[100%] h-[100%] rounded-full`}
      >
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Get</span>
          </p>
          <img
            src={arrowUp}
            alt="arrow-up"
            className="w-[23px] h-[23px] object-contain"
          />
        </div>

        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Started</span>
        </p>
      </div>
    </div>
  </Link>
);

export default GetStarted;
