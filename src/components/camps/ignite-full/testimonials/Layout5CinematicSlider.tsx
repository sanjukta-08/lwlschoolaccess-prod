import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { studentTestimonials } from "./testimonialData";

const Layout5CinematicSlider = () => {
  const [active, setActive] = useState(0);
  const current = studentTestimonials[active];
  const prev = useCallback(() => setActive((a) => (a - 1 + studentTestimonials.length) % studentTestimonials.length), []);
  const next = useCallback(() => setActive((a) => (a + 1) % studentTestimonials.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative bg-card rounded-2xl shadow-prestigious py-12 px-8 md:py-16 md:px-20 overflow-hidden min-h-[340px] flex items-center">
      <span className="absolute top-0 left-6 text-[12rem] md:text-[16rem] font-display text-muted-foreground/5 leading-none select-none pointer-events-none">"</span>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#c23b22] hover:text-primary-foreground hover:border-[#c23b22] transition-colors z-10">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#c23b22] hover:text-primary-foreground hover:border-[#c23b22] transition-colors z-10">
        <ChevronRight size={18} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full"
        >
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl">
            "{current.quote}"
          </p>
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-[#c23b22] text-[#c23b22]" />
              ))}
            </div>
          </div>
          <div className="mt-2">
              <p className="font-display font-bold text-foreground text-lg">{current.name}</p>
              <p className="text-sm text-muted-foreground">{current.detail}</p>
              <p className="text-sm text-[#c23b22] font-medium">{current.school}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Layout5CinematicSlider;
