import { motion } from "framer-motion";
import { ACCENT, BG, STATS, IMAGES, AnimatedStat } from "./stats/statsShared";

const StatsGallery = () => (
  <section
    style={{ backgroundColor: BG }}
    className="py-16 md:py-24 px-4 md:px-8 lg:px-12 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto">
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p
          className="font-body text-base md:text-xl uppercase tracking-[0.35em] mb-6 font-semibold"
          style={{ color: ACCENT }}
        >
          A Global Cohort
        </p>
        <h2
          className="font-display font-bold leading-[0.95]"
          style={{ color: ACCENT, fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
        >
          Join students
          <br />
          <em className="font-normal not-italic">from around the world</em>
          <br />
          at Cambridge.
        </h2>
      </motion.div>

      {/* Stats — Editorial */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <AnimatedStat
              value={s.value}
              suffix={s.suffix}
              className="font-display font-bold leading-none"
              style={{ color: ACCENT, fontSize: "clamp(4rem, 10vw, 8rem)" }}
            />
            <div className="h-[2px] w-full mt-4 mb-4" style={{ backgroundColor: ACCENT }} />
            <p
              className="font-body text-sm md:text-base uppercase tracking-[0.22em] font-semibold"
              style={{ color: ACCENT }}
            >
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Photo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl overflow-hidden h-[300px] md:h-[480px]"
      >
        <img src={IMAGES.gallery1} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  </section>
);

export default StatsGallery;
