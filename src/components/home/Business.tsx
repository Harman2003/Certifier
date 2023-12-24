import { features, featuresProp } from "@/constants";
import styles, { layout } from "@/utils/style";
import { Link } from "react-router-dom";
const FeatureCard = ({ icon, title, content }:featuresProp) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] mb-6 feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
        You do the Events, <br className="sm:block hidden" /> we'll handle
        certificates
      </h2>
      <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-5">
        Focus on creating unforgettable events while Certify takes care of the
        certificate process. Our blockchain-based platform ensures the utmost
        security and authenticity for your certificates, giving you the peace of
        mind to deliver exceptional experiences
      </p>

      <Link to={"/auth/register"}>
        <button className="mt-10 bg-blue-gradient py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient-2 rounded-[10px] outline-none">
          Get Started
        </button>
      </Link>
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  </section>
);

export default Business;
