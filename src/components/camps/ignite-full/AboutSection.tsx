import { motion } from "framer-motion";
import { About14ScrollReveal } from "./about/AboutLayouts";

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-cambridge-cream/40 overflow-hidden py-14 md:py-20 border-y border-foreground/10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <About14ScrollReveal />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
