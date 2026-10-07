import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const collageImages = [
  { src: "/lovable-uploads/certificate-ceremony.jpg", alt: "Certificate ceremony" },
  { src: "/lovable-uploads/divinity-school.jpg", alt: "Harvard Divinity School lecture" },
  { src: "/lovable-uploads/harvard-bags.jpg", alt: "Harvard University merchandise" },
  { src: "/lovable-uploads/group-discussion.jpg", alt: "Group discussion" },
  { src: "/lovable-uploads/group-steps.jpg", alt: "Group photo on steps" },
  { src: "/lovable-uploads/masterchef.jpg", alt: "MasterChef activity" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-16 md:py-20 bg-primary-foreground relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="uppercase tracking-[0.3em] font-sans mb-4 text-base text-primary">
            WELCOME TO THE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-4">
            HCUS Summer Camp
          </h2>
          <p className="text-ivory-foreground/70 text-lg md:text-xl font-sans italic mb-5">
            "Where academic excellence meets global leadership"
          </p>
          <div className="divider-thin mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-10"
        >
          <p className="font-sans text-ivory-foreground text-lg leading-relaxed">
            Harvard College Union Society Young Global Leaders Program is a week-long experience
            designed to help young leaders make a positive impact in their communities. The program
            takes place at Harvard University and brings together students from around the world to
            participate in workshops, discussions, and practical activities. Participants will learn
            from Harvard Student Mentors, gaining skills that are important for leadership today.
            The program also offers opportunities to explore the historical and cultural landmarks
            of Cambridge and Boston.
          </p>
          <div>
            <p className="font-sans text-ivory-foreground text-lg leading-relaxed">
              The program also offers students a unique opportunity to visit Harvard University,
              providing them with a once-in-a-lifetime chance to explore the prestigious campus.
              Students will acquire the skills needed to develop their leadership abilities,
              enabling them to create a positive impact on both the school and community.
            </p>
            <p className="font-sans text-ivory-foreground text-lg leading-relaxed mt-5">
              Students will enhance their critical thinking and problem-solving skills through
              engaging academic sessions, collaborate with talented peers and mentors from HCUS,
              build leadership and teamwork abilities through hands-on activities, and strengthen
              their portfolios with a certificate of completion from HCUS.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative overflow-hidden"
      >
        <div className="flex gap-4 animate-marquee-left w-max">
          {collageImages.concat(collageImages).map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] md:w-[340px] overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
