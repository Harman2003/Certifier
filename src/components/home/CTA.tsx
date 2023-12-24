import styles from "@/utils/style";
import { Link } from "react-router-dom";

const CTA = () => (
  <section
    className={`flex justify-center items-center sm:my-16 my-6 sm:px-16 px-6 sm:py-12 py-4 sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
  >
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Let’s try our service now!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Everything you need to manage certificates for an event to grow your
        community anywhere on the planet.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <Link to={"/auth/register"}>
        <button
          type="button"
          className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient-2 rounded-[10px] outline-none ${styles}`}
        >
          Get Started
        </button>
      </Link>
    </div>
  </section>
);

export default CTA;
