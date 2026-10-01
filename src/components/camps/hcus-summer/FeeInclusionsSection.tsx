import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const inclusions = [
  { icon: "🎓", title: "Academic Programme", desc: "Full curriculum & instruction" },
  { icon: "✈️", title: "Airport Transfers", desc: "Boston Logan pickup & drop-off" },
  { icon: "🏨", title: "7 Nights Accommodation", desc: "8 days & 7 nights stay included" },
  { icon: "🍽️", title: "All Meals Included", desc: "Breakfast, lunch & dinner daily" },
  { icon: "🗺️", title: "Outings & Excursions", desc: "Camp-related trips & activities" },
  { icon: "💡", title: "Interactive Workshops", desc: "Hands-on learning sessions" },
  { icon: "📜", title: "Official Certificate", desc: "From Harvard College Union Society" },
  { icon: "📚", title: "All Program Material", desc: "Resources & study materials" },
];

const FeeInclusionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-20 relative overflow-hidden" style={{ backgroundColor: 'hsl(40, 30%, 95%)' }}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">All-Inclusive Experience</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory-foreground mb-6">Everything Included in Your Program Fee</h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {inclusions.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }}
              className="text-center p-8 rounded-xl bg-white shadow-md hover:shadow-lg border border-muted/50 transition-shadow duration-300">
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <p className="font-serif text-lg md:text-xl text-ivory-foreground font-semibold mb-2">{item.title}</p>
              <p className="font-sans text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeeInclusionsSection;
