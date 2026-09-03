import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mentors = [
  { name: "Theresa (Tess) Straw", role: "President, Harvard College Union Society", image: "/lovable-uploads/tess-straw.jpg",
    bio: "Tess is a sophomore pursuing a joint concentration in Statistics and the History of Science. She serves as President of the Harvard College Union Society. Beyond academics, Tess competes on Harvard's sailing team and performs as an electric bassist in jazz ensembles." },
  { name: "Brody Douglass", role: "Vice-President, Harvard College Union Society", image: "/lovable-uploads/brody-douglass.jpg",
    bio: "Brody is a sophomore majoring in Economics with a minor in philosophy. He is also a midshipman in Navy ROTC and plans to commission as an officer in the Navy after graduation." },
  { name: "Carolina Loeffel", role: "Harvard University Student", image: "/lovable-uploads/carolina-loeffel.jpg",
    bio: "Callie is a sophomore at Harvard College, planning to concentrate in Psychology and Economics. On campus, she works with the international relations council." },
  { name: "Thomas Fleming", role: "Harvard University Student", image: "/lovable-uploads/thomas-fleming.jpg",
    bio: "Thomas is a sophomore at Harvard College studying Theology, History, and Government. Born and raised in Austin, Texas, he is currently pursuing a commission within the United States Marine Corps." },
  { name: "Chris Irankunda", role: "Harvard University Student", image: "/lovable-uploads/chris-mentor.jpg",
    bio: "Chris is a freshman at Harvard College planning to concentrate in Integrative Biology with a secondary focus on Global Health and Health Policy. Raised in Rubavu, Rwanda." },
];

const ProgramMentorsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((p) => (p + dir + mentors.length) % mentors.length);
  };

  const mentor = mentors[current];

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-lg md:text-xl font-sans mb-4">Distinguished</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">Harvard Student Mentors</h2>
          <div className="w-16 h-px bg-primary-foreground/30 mx-auto" />
        </motion.div>

        <div className="relative">
          <button onClick={() => navigate(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-14 z-20 w-12 h-12 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/70" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => navigate(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-14 z-20 w-12 h-12 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/70" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden px-4 md:px-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={current} initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <div className="shrink-0">
                  <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary-foreground/15 shadow-2xl">
                    <img src={mentor.image} alt={mentor.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-2">{mentor.name}</h3>
                  <p className="text-primary-foreground/50 font-sans text-xs uppercase tracking-[0.25em] mb-6">{mentor.role}</p>
                  <div className="w-12 h-px bg-primary-foreground/30 mb-6 mx-auto md:mx-0" />
                  <p className="font-sans text-base md:text-lg text-primary-foreground/75 leading-relaxed max-w-lg">{mentor.bio}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 mt-12">
            {mentors.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2.5 bg-primary-foreground" : "w-2.5 h-2.5 bg-primary-foreground/30"}`} aria-label={`Mentor ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramMentorsSection;
