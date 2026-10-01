import { motion } from "framer-motion";
import { aboutData as D } from "./aboutData";

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const stats = [
  { label: "Dates", value: "19 - 24 July 2027" },
  { label: "Eligibility", value: "Ages 15–18" },
  { label: "Duration", value: "7 Days" },
];

export const About14ScrollReveal = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8 items-start">
        {/* Left: headline + quote */}
        <motion.div {...fade}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] text-foreground">
            {D.title1}
            <br />
            <span className="italic text-cambridge-rust">{D.title2}</span>
          </h2>
          <p className="font-display italic text-foreground/70 leading-[1.3] mt-6 text-lg md:text-xl">
            "Empowering young minds to lead, create, and shape the future."
          </p>
        </motion.div>

        {/* Right: paragraphs */}
        <motion.div {...fade} className="space-y-5 lg:pt-3">
          <p className="font-body text-base md:text-[17px] text-foreground/80 leading-[1.65]">
            {D.lead}
          </p>
          <p className="font-body text-base md:text-[17px] text-foreground/80 leading-[1.65]">
            {D.intro}
          </p>
          {D.pillars.map((p) => (
            <div key={p.title} className="pt-2">
              <h3 className="font-display font-bold text-foreground text-xl md:text-2xl leading-[1.2] mb-2">
                {p.title}
              </h3>
              <p className="font-body text-base md:text-[17px] text-foreground/80 leading-[1.65]">
                {p.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="mt-12 pt-8 border-t border-foreground/15 grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            {...fade}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-body text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-2">
              {s.label}
            </p>
            <p
              className="font-display font-bold leading-none tracking-[-0.02em] text-foreground"
              style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)" }}
            >
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
