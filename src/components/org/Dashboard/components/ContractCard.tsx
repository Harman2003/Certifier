import CreateContract from "@/components/utils/CreateContract";
import InfoCard from "@/components/utils/InfoCard";
import useMultiForm from "@/setup/hooks/utils/useMultiForm";
import { AnimatePresence, motion } from "framer-motion";
const ContractCard = () => {
  const { stage, next } = useMultiForm(3);
  return (
    <div className="flex items-center justify-center">
      <AnimatePresence>
      {stage == 0 && (
          <motion.div
            key="card-1"
            initial={{ x: 0, opacity: 1 }}
            exit={{
              opacity: 0,
              display:'hidden',
              transition: { duration: 0.01},
            }}
            layout="position"
          >
            <InfoCard next={next} />
          </motion.div>
        )}
      {stage == 1 && (
        <motion.div
          key="card-2"
          initial={{ x: 100, opacity: 0}}
          whileInView={{ x: 0, opacity: 1, transition: { duration: 0.1 } }}
          layout="position"
          exit={{ x: -50, opacity: 0, transition: { duration: 0.2 }}}
          className="">
          <CreateContract next={next} />
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default ContractCard;
