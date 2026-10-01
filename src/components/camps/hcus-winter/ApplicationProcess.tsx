import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { step: "01", title: "Inquiry", description: "Explore the program details and reach out with any questions." },
  { step: "02", title: "Application", description: "Submit your application with academic records and a personal statement." },
  { step: "03", title: "Review", description: "Our admissions committee carefully reviews each application." },
  { step: "04", title: "Acceptance", description: "Receive your acceptance letter and secure your place in the cohort." },
];

const ApplicationProcess = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-16 px-6 bg-ivory" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm md:text-base font-sans font-semibold mb-4">Admissions</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-6">Application Process</h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="text-center relative"
            >
              <p className="font-serif text-5xl text-primary mb-4">{s.step}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+3rem)] right-[-3rem] h-px bg-primary/40" />
              )}
              <h3 className="font-serif text-xl text-ivory-foreground mb-3">{s.title}</h3>
              <p className="text-ivory-foreground/60 text-base font-sans leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
