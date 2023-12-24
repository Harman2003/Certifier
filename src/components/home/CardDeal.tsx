import { card } from "@/assets";
import styles, { layout } from "@/utils/style";
// import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Analyse your event data <br className="sm:block hidden" /> in few easy
        steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Unlock insightful perspectives into your event and certificate data
        through our dynamic dashboard. Visualize trends, patterns, and
        achievements with interactive graphs and charts, providing a
        comprehensive overview of your organization's success.
      </p>

      <button className={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
