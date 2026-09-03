import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  { label: "Fees & Coverage", icon: "💰", terms: [
    "The fee covers academic fees during the Winter Camp at Harvard University, stay and meals for 7 nights and 8 days and airport pick-up and drop-off. It does not include air tickets and Visa fees for the program.",
    "The fee does not cover airfare, visa charges, or individual expenses like sightseeing, travel on account of personal reasons, and any other expenses not directly related to the Winter Camp.",
  ]},
  { label: "Accommodation", icon: "🏨", terms: [
    "For Cohort 1: The hotel check-in date would be 3 January 2027 (3:00 PM) and the hotel check-out would be 10 January 2027 (12:00 PM).\nFor Cohort 2: The hotel check-in date would be 10 January 2027 (3:00 PM) and hotel check-out would be 17 January 2027 (12:00 PM).",
    "In case of any accompanying adult or guardian with the student, an additional USD 2,500 (for twin-sharing room) per head or USD 3,500 (for single occupancy room) per head has to be paid to cover stay, meals and airport transfer during the program duration.",
    "Additional days of stay beyond the program dates will have to be organized and managed by the student or parent themselves.",
  ]},
  { label: "Meals", icon: "🍽️", terms: [
    "For Cohort 1: On 3 January, the fee includes dinner only. From 4 to 9 January, all three meals - breakfast, lunch and dinner - will be covered. On 10 January, only breakfast will be provided.\nFor Cohort 2: On 10 January, the fee includes dinner only. From 11 to 16 January, all three meals - breakfast, lunch and dinner - will be covered. On 17 January, only breakfast will be provided.",
  ]},
  { label: "Visa & Travel", icon: "✈️", terms: [
    "Students are responsible for obtaining any necessary visas or permits required to enter and stay in the United States for the entire duration of the Winter Camp, if applicable. It is essential to ensure all visa requirements are fulfilled well in advance of the program start date.",
  ]},
  { label: "Guardians", icon: "👥", terms: [
    "In the case of a teacher or guardian accompanying a group of students, they are permitted to drop off the students at the campus. However, classroom access during the program will be limited to registered participants only.",
  ]},
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
          <p className="text-primary uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">Important Information</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-6">Terms & Conditions</h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(i)}
              className={`group relative px-4 md:px-5 py-2.5 md:py-3 rounded-full font-sans text-sm md:text-base transition-all duration-300 border ${
                activeTab === i
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-transparent text-ivory-foreground/70 border-border hover:border-primary/40 hover:text-ivory-foreground"
              }`}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-ivory-foreground/[0.03] border border-border rounded-2xl p-6 md:p-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">{categories[activeTab].icon}</span>
            <h3 className="font-serif text-2xl md:text-3xl text-ivory-foreground">{categories[activeTab].label}</h3>
          </div>

          <div className="space-y-6">
            {categories[activeTab].terms.map((term, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="flex gap-4 group"
              >
                <div className="shrink-0 mt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 ring-4 ring-primary/10" />
                </div>
                <p className="font-sans text-[15px] md:text-base leading-[1.85] text-ivory-foreground/75 whitespace-pre-line">{term}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-8 font-sans text-sm text-ivory-foreground/50 italic"
        >
          Please review all categories carefully before confirming your enrollment.
        </motion.p>
      </div>
    </section>
  );
};

export default TermsSection;
