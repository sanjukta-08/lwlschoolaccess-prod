import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout14Duotone } from "./ScheduleLayouts";

const ScheduleLayoutSelector = () => {
  const [active, setActive] = useState(0);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <Layout14Duotone active={active} setActive={setActive} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScheduleLayoutSelector;
