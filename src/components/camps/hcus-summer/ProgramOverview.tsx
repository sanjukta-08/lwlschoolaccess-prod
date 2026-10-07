import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const programs = [
  {
    title: "Critical Thinking & Public Speaking",
    description:
      "Develop and practice critical thinking, public speaking, networking and presentation skills through reflection, analysis, and feedback from distinguished mentors.",
    icon: "🎓",
  },
  {
    title: "Real-World Leadership",
    description:
      "Gain a comprehensive understanding of leadership principles and the opportunity to apply them in real-world scenarios through case studies and team projects.",
    icon: "🌍",
  },
  {
    title: "Global Perspectives",
    description:
      "Engage with students and mentors from diverse backgrounds and cultures, participate in international case studies, and develop a global mindset essential for today's interconnected world.",
    icon: "🤝",
  },
  {
    title: "The Harvard Experience",
    description:
      "Experience the Harvard University campus firsthand — explore iconic buildings, picturesque landscapes, and vibrant student life with mentors at the forefront of their fields.",
    icon: "🏛",
  },
  {
    title: "Community Impact Projects",
    description:
      "Collaborate with mentors to launch community initiatives addressing local issues, gaining practical skills and a deeper understanding of the real world.",
    icon: "💡",
  },
  {
    title: "Student Leadership Development",
    description:
      "Access tools and resources to develop leadership abilities and skills for making a positive impact on your school and community.",
    icon: "⚡",
  },
];

const slides: (typeof programs)[] = [];
for (let i = 0; i < programs.length; i += 3) slides.push(programs.slice(i, i + 3));

const ProgramOverview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="program" className="section-padding relative overflow-hidden bg-primary" ref={ref}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-primary-foreground/70 uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">
            The Ivy-Inspired Experience
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">
            Program Overview
          </h2>
          <div className="w-16 h-px bg-primary-foreground/40 mx-auto" />
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {slides[current]!.map((prog, i) => (
                <motion.div
                  key={prog.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col items-center text-center"
                >
                  <span className="text-4xl mb-5 block">{prog.icon}</span>
                  <h3 className="font-serif text-xl md:text-2xl text-ivory-foreground mb-3">
                    {prog.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-ivory-foreground/70 leading-relaxed">
                    {prog.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prev}
            className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary-foreground w-8" : "bg-primary-foreground/30 w-2.5 hover:bg-primary-foreground/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;
