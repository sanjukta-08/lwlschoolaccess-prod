import { motion } from "framer-motion";
import DetailsLayout5OverlapPanel from "./details/DetailsLayout5OverlapPanel";

const SummerSchoolDetails = () => (
  <section id="details" className="pt-12 pb-28 overflow-hidden" style={{ backgroundColor: "#cbcc02" }}>
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="h-px w-16 bg-cambridge-rust" />
          <span className="text-sm md:text-base font-display font-bold tracking-[0.3em] uppercase text-cambridge-rust">
            Everything you need to know
          </span>
          <span className="h-px w-16 bg-cambridge-rust" />
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.0]" style={{ color: "#1a1a00" }}>
          Summer School <span className="italic">Details</span>
        </h2>
      </motion.div>

      <DetailsLayout5OverlapPanel />
    </div>
  </section>
);

export default SummerSchoolDetails;
