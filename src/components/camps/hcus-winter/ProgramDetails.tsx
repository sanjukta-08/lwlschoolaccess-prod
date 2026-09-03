import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, GraduationCap, Clock } from "lucide-react";
import programDetailsBg from "@/assets/hcus-winter/program-details-bg.jpg";

const details = [
  { icon: Calendar, label: "Dates", value: "Cohort 1: 3 – 10 January 2027\nCohort 2: 10 – 17 January 2027" },
  { icon: MapPin, label: "Venue", value: "Harvard University\nCambridge, Massachusetts" },
  { icon: GraduationCap, label: "Eligibility", value: "Grades 8–12\nSchool Years 9–13" },
  { icon: Clock, label: "Program Hours", value: "9:00 AM – 4:00 PM\nOn Program Days" },
];

const ProgramDetails = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-primary-foreground">
      <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
        <img src={programDetailsBg} alt="Harvard University campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
      </div>

      <div className="relative px-4 md:px-8 -mt-32 md:-mt-40 pb-6 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto bg-primary rounded-2xl px-5 sm:px-8 md:px-20 py-10 sm:py-14 md:py-20 shadow-2xl"
        >
          <div className="text-center mb-14">
            <p className="text-primary-foreground/60 font-sans text-sm uppercase tracking-[0.3em] mb-3">Harvard College Union Society</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">Winter Camp Overview & Details</h2>
            <div className="w-16 h-px bg-primary-foreground/30 mx-auto" />
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-14">
            {details.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`flex-1 text-center py-10 md:py-0 md:px-8 ${i < details.length - 1 ? "border-b md:border-b-0 md:border-r border-primary-foreground/15" : ""}`}
              >
                <detail.icon className="w-8 h-8 text-secondary mx-auto mb-5" strokeWidth={1.5} />
                <p className="font-serif text-xl md:text-2xl text-primary-foreground font-semibold mb-4 whitespace-nowrap">{detail.label}</p>
                <div className="font-sans text-base md:text-lg text-primary-foreground/80 leading-relaxed whitespace-pre-line">
                  {detail.label === "Dates"
                    ? detail.value.split("\n").map((line) => (
                        <span key={line} className="block whitespace-nowrap">{line}</span>
                      ))
                    : detail.value}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="p-5 sm:p-8 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15"
            >
              <p className="text-secondary font-serif text-xl md:text-2xl font-semibold mb-5">Application Fees</p>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="text-primary-foreground/80 font-sans text-sm sm:text-base">Early Application</span>
                  <span className="font-serif text-2xl sm:text-3xl text-primary-foreground">USD 4,250</span>
                </div>
                <div className="h-px bg-primary-foreground/15" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="text-primary-foreground/80 font-sans text-sm sm:text-base">Regular Application</span>
                  <span className="font-serif text-2xl sm:text-3xl text-primary-foreground">USD 4,650</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="p-5 sm:p-8 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15"
            >
              <p className="text-secondary font-serif text-xl md:text-2xl font-semibold mb-5">Application Deadlines</p>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="text-primary-foreground/80 font-sans text-sm sm:text-base">Early Application</span>
                  <span className="font-serif text-xl sm:text-2xl text-primary-foreground">30 November 2026</span>
                </div>
                <div className="h-px bg-primary-foreground/15" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="text-primary-foreground/80 font-sans text-sm sm:text-base">Regular Application</span>
                  <span className="font-serif text-xl sm:text-2xl text-primary-foreground">7 December 2026</span>
                </div>
              </div>
              <p className="text-base text-secondary mt-5 font-sans font-medium">
                Limited seats — apply early to secure your place.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0 }}
            className="text-center mt-12"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe8-WcdCzp_QSOaPtic5FHJnDfGqMt36i80LCvfJChPykmvIQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary-foreground text-primary font-sans font-bold text-base md:text-lg uppercase tracking-[0.15em] px-12 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Apply Now
              <span className="text-xl">→</span>
            </a>
            <p className="text-primary-foreground/50 font-sans text-sm mt-3">Early application deadline: 30 November 2026</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramDetails;
