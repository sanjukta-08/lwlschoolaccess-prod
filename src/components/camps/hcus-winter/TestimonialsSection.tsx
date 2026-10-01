import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  { quote: "The Winter Camp was an incredible opportunity to meet and collaborate with students from all around the world. I also gained valuable knowledge that will support me throughout high school and university. My favorite activity was attending the Harvard vs. Brown hockey game — it was such a fun way to connect with the Harvard community through sports!",
    name: "Arthur Ulak", details: "Grade 8, Royal St George's College, Canada", image: "/lovable-uploads/arthur-testimonial.png" },
  { quote: "During the camp, I learned so much — from public speaking to policymaking and beyond. I'm incredibly grateful for this experience and for everyone who took the time to teach us these valuable lessons. I especially loved the outings after our lessons — they gave us the perfect opportunity to bond and create lasting memories.",
    name: "Miel del Pilar", details: "Grade 9, Assumption College, San Lorenzo, Philippines", image: "/lovable-uploads/miel-testimonial.png" },
  { quote: "I discovered the art of socializing with peers from around the world and eagerly anticipated the hockey game. The program provided insights into public speaking, which is crucial as I aspire to apply to top universities. It's helping me prepare for my dream and fostering my independence.",
    name: "Najla Alfhaid", details: "Grade 10, King Faisal School, Saudi Arabia", image: "/lovable-uploads/najla-testimonial.png" },
  { quote: "The Winter Camp was an experience like no other! I had never left the United States before, but this week, I was surrounded by amazing new friends from all over the world. The classes were incredibly engaging and enjoyable, and I can't wait to apply what I learned in school and MUN!",
    name: "Ryann Holden", details: "Grade 11, Hopkins School, USA", image: "/lovable-uploads/ryann-testimonial.png" },
  { quote: "Everyone was so welcoming and kind! The biggest takeaway from this camp was how much it pushed me to speak up, understand my leadership style, and find ways to make my voice more impactful. My favorite activity was the Harvard Museum visit — I absolutely love botany and rocks, and it was the perfect place to explore both!",
    name: "Cici Liang", details: "Grade 10, Crofton House School, Canada", image: "/lovable-uploads/cici-testimonial.png" },
  { quote: "I learned so much, not just academically but also about myself. My self-confidence has grown, and I feel much more comfortable speaking in public. My favorite activity was ice skating — it was a new experience and something I hadn't tried before!",
    name: "Shivaansh Rathi", details: "Grade 10, MCTM International, India", image: "/lovable-uploads/shivaansh-testimonial.png" },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const item = testimonials[active]!;
  const isEven = active % 2 === 0;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-16 md:py-20 px-6 bg-ivory" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-sans mb-4">Scholar Voices</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-6">Student Testimonials</h2>
          <p className="text-accent text-base md:text-lg font-sans font-medium tracking-wide">From past cohorts at Harvard University</p>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="relative overflow-hidden max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} border border-border rounded-2xl overflow-hidden bg-primary-foreground`}
            >
              <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <blockquote className="font-serif text-base md:text-lg text-ivory-foreground leading-relaxed italic mb-6">
                  "{item.quote}"
                </blockquote>
                <div>
                  <p className="font-serif text-lg text-ivory-foreground font-semibold">{item.name}</p>
                  <p className="text-ivory-foreground/50 text-sm font-sans mt-1">{item.details}</p>
                </div>
              </div>

              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover min-h-[280px] md:min-h-full"
                  />
                ) : (
                  <div className="bg-primary/5 w-full h-full min-h-[280px] md:min-h-full flex items-center justify-center p-8 md:p-10">
                    <div className="text-center">
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="w-24 h-24 rounded-full bg-primary mx-auto flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                        <span className="font-serif text-4xl text-primary-foreground font-bold">{item.name.charAt(0)}</span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </motion.div>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-sm text-ivory-foreground/40 tracking-widest uppercase">
                        {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                      </motion.p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full border border-ivory-foreground/20 flex items-center justify-center text-ivory-foreground/40 hover:text-primary hover:border-primary/40 transition-all" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-primary" : "w-2 bg-ivory-foreground/20 hover:bg-ivory-foreground/40"}`}
              />
            ))}
          </div>
          <button onClick={() => navigate(1)} className="w-10 h-10 rounded-full border border-ivory-foreground/20 flex items-center justify-center text-ivory-foreground/40 hover:text-primary hover:border-primary/40 transition-all" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
