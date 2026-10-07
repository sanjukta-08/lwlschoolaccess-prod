import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const facultyAngus =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/6fe0c41c-778d-424b-8941-baa0d4050694/faculty-angus.jpg";
const facultyJohn =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/8b7d638e-8c85-4d1b-bbc9-cd94fc10f846/faculty-john.jpg";
const facultyRichard =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/db2816c7-f598-4c2d-b81f-15a2d3f43cf3/faculty-richard.jpg";

const facultyTestimonialsData = [
  {
    name: "Angus Pauley",
    detail: "Programme Facilitator and Mentor",
    school: "Cambridge Judge Business School",
    quote:
      "We're taking these students from ideas through to reality in just five days. Along the way they learn all sorts of innovation skills as well as getting the chance to work in teams and develop their ideas across the course of the week.",
    image: facultyAngus,
  },
  {
    name: "John Doherty",
    detail: "Technical Founder and CEO",
    school: "Orca Scan",
    quote:
      "Our sessions focus on helping students think critically, turn ideas into action, and gain the confidence to solve problems and explore entrepreneurship.",
    image: facultyJohn,
  },
  {
    name: "Dr Richard Leaver",
    detail: "Regional Director-Cambridge, CEO",
    school: "Greybook Ltd",
    quote:
      "I've been living and working in Cambridge as an entrepreneur and investor for 30 years. I'm now helping the Judge Business School, mentoring young students on the IGNITE programme.",
    image: facultyRichard,
  },
];

const FacultyCinematicSlider = () => {
  const [active, setActive] = useState(0);
  const current = facultyTestimonialsData[active];
  if (!current) return null;
  const prev = useCallback(
    () =>
      setActive((a) => (a - 1 + facultyTestimonialsData.length) % facultyTestimonialsData.length),
    [],
  );
  const next = useCallback(() => setActive((a) => (a + 1) % facultyTestimonialsData.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative bg-card rounded-2xl shadow-prestigious py-12 px-8 md:py-16 md:px-20 overflow-hidden min-h-[340px] flex items-center">
      <span className="absolute top-0 left-6 text-[12rem] md:text-[16rem] font-display text-muted-foreground/5 leading-none select-none pointer-events-none">
        "
      </span>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#c23b22] hover:text-primary-foreground hover:border-[#c23b22] transition-colors z-10"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#c23b22] hover:text-primary-foreground hover:border-[#c23b22] transition-colors z-10"
      >
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

export default FacultyCinematicSlider;
