import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Globe, FileText } from "lucide-react";

const awards = [
  {
    title: "Certificate from Harvard College Union Society",
    description:
      "Receive an official certificate recognizing your participation and accomplishments during the program.",
    icon: Award,
    image: "/lovable-uploads/certificate-ceremony-2.jpg",
  },
  {
    title: "Build a Global Network",
    description:
      "Connect with like-minded scholars from over 30 countries around the world and forge lifelong bonds.",
    icon: Globe,
    image: "/lovable-uploads/group-steps-2.jpg",
  },
  {
    title: "Portfolio Enhancement",
    description:
      "Strengthen your college applications with a distinguished leadership experience at Harvard University.",
    icon: FileText,
    image: "/lovable-uploads/workshop-group.jpg",
  },
];

const AwardsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/harvard-summer-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative pt-24 md:pt-32 px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-primary-foreground/50 uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">
            Outcomes
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">
            Awards & Recognition
          </h2>
          <div className="w-16 h-px bg-primary-foreground/30 mx-auto" />
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, i) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="group rounded-xl overflow-hidden shadow-xl border border-border bg-primary-foreground"
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="w-10 h-[2px] bg-primary mb-5" />
                  <h3 className="font-serif text-lg md:text-xl text-ivory-foreground mb-3 leading-snug">
                    {award.title}
                  </h3>
                  <p className="font-sans text-sm text-ivory-foreground/60 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
