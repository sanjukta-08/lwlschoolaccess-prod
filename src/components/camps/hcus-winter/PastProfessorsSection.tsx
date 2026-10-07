import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const professors = [
  {
    name: "Danielle Allen",
    title: "Harvard University Professor",
    image: "/lovable-uploads/danielle-allen.png",
    bio: "Danielle Allen is the James Bryant Conant University Professor at Harvard University and Director of the Allen Lab for Democracy Renovation at Harvard Kennedy School. A leading scholar of political philosophy, ethics, and public policy, she is an award-winning author, democracy advocate, and civic education leader. She is the 2020 recipient of the Library of Congress' Kluge Prize and has played a major role in advancing democratic practice and public dialogue in the United States.",
  },
  {
    name: "James G. Anderson",
    title: "Harvard University Professor",
    image: "/lovable-uploads/james-anderson.png",
    bio: "James G. Anderson is the Philip S. Weld Professor at Harvard University, with appointments in Chemistry, Earth and Planetary Sciences, and Engineering. A member of the National Academy of Sciences, he is a highly decorated scientist recognized for major contributions to environmental science, climate research, and chemical sciences, and has advised U.S. Senate and House committees on energy and climate policy.",
  },
];

const PastProfessorsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-parchment-dark border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">
            Distinguished Faculty
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-6">
            Former Program Lecturers
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {professors.map((prof, i) => (
            <motion.div
              key={prof.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
            >
              <div className="shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl border-4 border-primary/15">
                  <img src={prof.image} alt={prof.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className={`${i % 2 === 0 ? "md:text-left" : "md:text-right"} text-center`}>
                <h3 className="font-serif text-2xl md:text-3xl text-ivory-foreground mb-1">
                  {prof.name}
                </h3>
                <p className="text-primary font-sans text-sm uppercase tracking-widest mb-5">
                  {prof.title}
                </p>
                <p className="font-sans text-[15px] md:text-base text-ivory-foreground/70 leading-relaxed">
                  {prof.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastProfessorsSection;
