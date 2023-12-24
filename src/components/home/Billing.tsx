import { apple, bill, google } from "@/assets";
import styles, { layout } from "@/utils/style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img
        src={bill}
        alt="billing"
        className="w-[100%] h-[100%] relative z-[5]"
      />

      {/* gradient start */}
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-30 bottom-30 blue__gradient" />
      {/* gradient end */}
    </div>

    <div className="flex-1 flex flex-col justify-center items-center">
      <h2 className={`text-center ${styles.heading2}`}>
        Easily control your <br className="sm:block hidden" /> events using a
        Dashboard
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 text-center`}>
        Easily oversee your organization's events with our user-friendly
        dashboard, designed to streamline the certificate creation process.
        Our intuitive dashboard puts
        you in control, allowing you to effortlessly manage and validate
        achievements. Simplify the administrative tasks associated with your
        organization's events, making Certify the ideal solution for seamless
        certificate management.
      </p>

      {/* <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <img
          src={apple}
          alt="google_play"
          className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
        />
        <img
          src={google}
          alt="google_play"
          className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
        />
      </div> */}
    </div>
  </section>
);

export default Billing;
