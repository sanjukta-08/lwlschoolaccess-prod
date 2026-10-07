import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "8", label: "Days of Immersion" },
  { number: "30", suffix: "+", label: "Countries Represented" },
  { number: "1000", suffix: "+", label: "Alumni" },
  { number: "3", label: "Selective Cohorts" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 md:py-20 px-6 bg-primary-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="text-center"
          >
            <p className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-ivory-foreground leading-none mb-3">
              {stat.number}
              {stat.suffix && (
                <span className="text-5xl sm:text-6xl md:text-7xl">{stat.suffix}</span>
              )}
            </p>
            <p className="font-sans text-sm sm:text-base md:text-lg uppercase tracking-[0.2em] text-ivory-foreground/70 mt-4 font-semibold">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
