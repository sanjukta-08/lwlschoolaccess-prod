import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { quote: "The Winter Camp was an incredible opportunity to meet and collaborate with students from all around the world. I also gained valuable knowledge that will support me throughout high school and university.", name: "Arthur Ulak", details: "Grade 8, Royal St George's College, Canada", image: "/lovable-uploads/arthur-testimonial.png" },
  { quote: "During the camp, I learned so much — from public speaking to policymaking and beyond. I'm incredibly grateful for this experience and for everyone who took the time to teach us these valuable lessons.", name: "Miel del Pilar", details: "Grade 9, Assumption College, Philippines", image: "/lovable-uploads/miel-testimonial.png" },
  { quote: "I discovered the art of socializing with peers from around the world. The program provided insights into public speaking, which is crucial as I aspire to apply to top universities.", name: "Najla Alfhaid", details: "Grade 10, King Faisal School, Saudi Arabia", image: "/lovable-uploads/najla-testimonial.png" },
  { quote: "The Winter Camp was an experience like no other! I had never left the United States before, but this week, I was surrounded by amazing new friends from all over the world.", name: "Ryann Holden", details: "Grade 11, Hopkins School, USA", image: "/lovable-uploads/ryann-testimonial.png" },
  { quote: "Everyone was so welcoming and kind! The biggest takeaway from this camp was how much it pushed me to speak up, understand my leadership style, and find ways to make my voice more impactful.", name: "Cici Liang", details: "Grade 10, Crofton House School, Canada", image: "/lovable-uploads/cici-testimonial.png" },
  { quote: "I learned so much, not just academically but also about myself. My self-confidence has grown, and I feel much more comfortable speaking in public.", name: "Shivaansh Rathi", details: "Grade 10, MCTM International, India", image: "/lovable-uploads/shivaansh-testimonial.png" },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (dir: number) => { setDirection(dir); setActive((p) => (p + dir + testimonials.length) % testimonials.length); };
  const item = testimonials[active]!;
  const isEven = active % 2 === 0;

  return (
    <section id="testimonials" className="py-16 md:py-20 px-6 bg-ivory" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-sans mb-4">Scholar Voices</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-6">Student Testimonials</h2>
          <p className="text-accent text-base md:text-lg font-sans font-medium tracking-wide">From past cohorts at Harvard University</p>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="relative overflow-hidden max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={active} initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }} transition={{ duration: 0.5 }}
              className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} border border-border rounded-2xl overflow-hidden bg-primary-foreground`}>
              <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <blockquote className="font-serif text-base md:text-lg text-ivory-foreground leading-relaxed italic mb-6">"{item.quote}"</blockquote>
                <div>
                  <p className="font-serif text-lg text-ivory-foreground font-semibold">{item.name}</p>
                  <p className="text-ivory-foreground/50 text-sm font-sans mt-1">{item.details}</p>
                </div>
              </div>
              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover min-h-[280px] md:min-h-full" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full border border-ivory-foreground/20 flex items-center justify-center text-ivory-foreground/40 hover:text-primary" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-primary" : "w-2 bg-ivory-foreground/20"}`} />
            ))}
          </div>
          <button onClick={() => navigate(1)} className="w-10 h-10 rounded-full border border-ivory-foreground/20 flex items-center justify-center text-ivory-foreground/40 hover:text-primary" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
