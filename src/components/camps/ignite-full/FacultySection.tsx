import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { faculty, sectionHeader } from "./faculty/facultyData";

const FacultySection = () => {
  const [active, setActive] = useState(0);
  const current = faculty[active];
  const next = () => setActive((active + 1) % faculty.length);
  const prev = () => setActive((active - 1 + faculty.length) % faculty.length);

  return (
    <section id="faculty" className="bg-background py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 mb-12 border-b border-foreground/10"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.05]">
            {sectionHeader.title}{" "}
            <span className="italic text-[#c23b22]">{sectionHeader.italic}</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-lg lg:text-right leading-relaxed font-medium">
            {sectionHeader.lead}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative bg-neutral-50 rounded-3xl overflow-hidden p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-[400px_1fr] gap-10 items-center"
            >
              <div className="relative h-[420px] rounded-2xl overflow-hidden">
                <img
                  src={current.image}
                  alt={current.name}
                  style={{ objectPosition: current.objectPosition }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight">
                  {current.name}
                </h3>
                {current.credentials && (
                  <p className="text-sm text-cambridge-gold font-body font-semibold mt-3">
                    {current.credentials}
                  </p>
                )}
                <p className="text-base text-muted-foreground font-body mt-2 mb-5">
                  {current.title}
                </p>
                <p className="text-sm text-foreground/85 font-body leading-relaxed whitespace-pre-line">
                  {current.bio}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {faculty.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to contributor ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    active === i ? "w-8 bg-[#c23b22]" : "w-1.5 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-11 h-11 rounded-full bg-neutral-900 text-[#cbcc02] hover:bg-[#c23b22] hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="w-11 h-11 rounded-full bg-neutral-900 text-[#cbcc02] hover:bg-[#c23b22] hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
