import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HCUSSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 pb-32 md:pb-40 px-6 bg-parchment-dark">
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[62%] rounded-xl overflow-hidden shadow-xl"
        >
          <img
            src="/lovable-uploads/winthrop-house.jpg"
            alt="Winthrop House, Harvard University"
            className="w-full aspect-[3/4] lg:aspect-auto lg:h-[720px] object-cover object-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative lg:absolute lg:right-0 lg:top-[12%] lg:w-[55%] bg-primary-foreground rounded-xl shadow-2xl p-8 md:p-12 -mt-12 lg:mt-0 mx-2 lg:mx-0"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-sans mb-3">
                About
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-ivory-foreground leading-tight">
                Harvard College Union Society
              </h2>
            </div>
            <img
              src="/lovable-uploads/hcus-logo-full.png"
              alt="Harvard College Union Society"
              className="w-24 md:w-32 shrink-0"
            />
          </div>

          <p className="font-sans text-base md:text-[17px] text-ivory-foreground/70 leading-relaxed mb-5">
            The Harvard College Union Society is a community of Harvard students dedicated to free
            inquiry and civil discourse. We work to bring open arguments on the most important
            debates of the American milieu back to Harvard University.
          </p>
          <p className="font-sans text-base md:text-[17px] text-ivory-foreground/70 leading-relaxed mb-5">
            Through our group, students and faculty debate political-philosophical topics with
            boldness in the face of controversy, building trust that discourse is still possible in
            the 21st-century academy.
          </p>
          <p className="font-sans text-base md:text-[17px] text-ivory-foreground/70 leading-relaxed">
            We defend the free communication and critique of acceptable, controversial, and
            half-formed views alike, and encourage mutual criticism. We welcome all views expressed
            in a spirit of good faith and mutual respect.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HCUSSection;
