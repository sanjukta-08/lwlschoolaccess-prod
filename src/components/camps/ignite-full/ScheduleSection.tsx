import { motion } from "framer-motion";
import ScheduleLayoutSelector from "./schedule/ScheduleLayoutSelector";

const ScheduleSection = () => {
  return (
    <section id="schedule" className="relative bg-background overflow-hidden">
      {/* Subtle warm glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_hsl(38_80%_55%_/_0.04),_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_hsl(7_68%_45%_/_0.03),_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Header — centered, flush with the cover below */}
        <div className="pt-28 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm md:text-base uppercase tracking-[0.35em] font-body font-bold text-cambridge-rust mb-4">
              Tentative Programme Schedule
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.05]">
              Your Week <span className="text-cambridge-rust italic">at a Glance</span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Every session, mentor hour and cultural moment — laid out in full. Tap a day to explore.
            </p>
            <div className="mx-auto mt-8 h-px w-24 bg-cambridge-rust/60" />
          </motion.div>
        </div>

        {/* Schedule cover — flush, no separator */}
        <div className="pb-20">
          <ScheduleLayoutSelector />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cambridge-gold/30 to-transparent" />
    </section>
  );
};

export default ScheduleSection;
