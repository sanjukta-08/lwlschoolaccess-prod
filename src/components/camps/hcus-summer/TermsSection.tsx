import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    label: "Fees & Coverage",
    icon: "💰",
    terms: [
      "The fee covers academic fees during the Summer Camp at Harvard University, stay and meals for 7 nights and 8 days and airport pick-up and drop-off. It does not include air tickets and Visa fees.",
      "The fee does not cover airfare, visa charges, or individual expenses like sightseeing, travel on account of personal reasons, and any other expenses not directly related to the Summer Camp.",
    ],
  },
  {
    label: "Accommodation",
    icon: "🏨",
    terms: [
      "Cohort 1: Check-in 21 June (3:00 PM), check-out 28 June (12:00 PM).\nCohort 2: Check-in 28 June (3:00 PM), check-out 5 July (12:00 PM).\nCohort 3: Check-in 5 July (3:00 PM), check-out 12 July (12:00 PM).",
      "Accompanying adults: USD 2,500 (twin-sharing) or USD 3,500 (single occupancy) per head, covering stay, meals and airport transfer.",
      "Additional days of stay beyond the program dates must be organized and managed by the student or parent themselves.",
    ],
  },
  {
    label: "Meals",
    icon: "🍽️",
    terms: [
      "All breakfast, lunch and dinner are included on program days; arrival day includes dinner only and departure day breakfast only.",
    ],
  },
  {
    label: "Visa & Travel",
    icon: "✈️",
    terms: [
      "Students are responsible for obtaining any necessary visas or permits to enter and stay in the United States for the entire duration of the Summer Camp.",
    ],
  },
  {
    label: "Guardians",
    icon: "👥",
    terms: [
      "Teachers or guardians may drop off students at the campus, but classroom access during the program is limited to registered participants only.",
    ],
  },
];

const TermsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref} className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 bg-primary-foreground">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">
            Important Information
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-6">
            Terms & Conditions
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 md:px-5 py-2.5 md:py-3 rounded-full font-sans text-sm md:text-base transition-all duration-300 border ${activeTab === i ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-transparent text-ivory-foreground/70 border-border hover:border-primary/40 hover:text-ivory-foreground"}`}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-ivory-foreground/[0.03] border border-border rounded-2xl p-6 md:p-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">{categories[activeTab]!.icon}</span>
            <h3 className="font-serif text-2xl md:text-3xl text-ivory-foreground">
              {categories[activeTab]!.label}
            </h3>
          </div>
          <div className="space-y-6">
            {categories[activeTab]!.terms.map((term, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 mt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40 ring-4 ring-primary/10" />
                </div>
                <p className="font-sans text-[15px] md:text-base leading-[1.85] text-ivory-foreground/75 whitespace-pre-line">
                  {term}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsSection;
