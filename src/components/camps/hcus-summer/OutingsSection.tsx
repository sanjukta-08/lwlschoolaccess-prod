import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useVideoAutoplay } from "./use-video-autoplay";

const outings = [
  { title: "Bowling", location: "Kings Dining & Entertainment, Seaport", description: "Kings offers multiple lanes for large groups with dedicated event spaces.", image: "/lovable-uploads/bowling.jpg" },
  { title: "Harvard Campus Tour", location: "Harvard University, Cambridge", description: "Walk through 400 years of history on Harvard's iconic grounds.", video: "/lovable-uploads/harvard-tour-video.mp4", image: "/lovable-uploads/mfa-group.jpg" },
  { title: "MIT Tour", location: "Massachusetts Institute of Technology, Cambridge", description: "Discover cutting-edge innovation at MIT.", image: "/lovable-uploads/mit-tour.jpg" },
  { title: "Farewell Dinner", location: "Cambria Hotel", description: "Celebrate new friendships at the farewell dinner.", image: "/lovable-uploads/farewell-dinner.jpg" },
  { title: "Museum Visit", location: "Museum of Fine Arts (MFA), Boston", description: "Visit one of Boston's premier cultural institutions.", video: "/lovable-uploads/museum-visit-video.mp4", image: "/lovable-uploads/museum-visit.jpg" },
  { title: "Baseball Game", location: "Fenway Park, Boston", description: "Experience an iconic Boston venue — Fenway Park.", image: "/lovable-uploads/baseball-game.jpg" },
];

const slides = Array.from({ length: Math.ceil(outings.length / 3) }, (_, i) => outings.slice(i * 3, i * 3 + 3));

const OutingVideo = ({ src }: { src: string }) => {
  const { videoRef, tryPlay } = useVideoAutoplay();
  return <video ref={videoRef} src={src} className="w-full h-full object-cover" autoPlay loop muted playsInline preload="auto" onCanPlay={tryPlay} onLoadedData={tryPlay} />;
};

const OutingsSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeOuting, setActiveOuting] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeSlide = Math.floor(activeOuting / 3);

  const next = useCallback(() => setActiveOuting((p) => (p + 1) % outings.length), []);
  const prev = useCallback(() => setActiveOuting((p) => (p - 1 + outings.length) % outings.length), []);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next, paused, inView]);

  const currentSlide = slides[activeSlide] ?? slides[0];
  if (!currentSlide) return null;

  return (
    <section ref={sectionRef} className="py-24 md:py-32 pb-12 md:pb-16 px-6 bg-primary-foreground relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">Beyond the Classroom</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory-foreground mb-6">Possible Outings</h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <button onClick={prev} className="absolute -left-2 md:-left-6 top-36 md:top-40 z-10 w-10 h-10 rounded-full bg-background/30 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground" aria-label="Previous">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="absolute -right-2 md:-right-6 top-36 md:top-40 z-10 w-10 h-10 rounded-full bg-background/30 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground" aria-label="Next">
            <ChevronRight className="w-4 h-4" />
          </button>

          <motion.div key={activeSlide} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentSlide.map((outing, i) => (
              <div key={i} className="flex flex-col">
                <div className="relative h-56 md:h-72 rounded-lg overflow-hidden mb-6">
                  {'video' in outing && outing.video ? <OutingVideo src={outing.video} /> : <img src={outing.image} alt={outing.title} className="w-full h-full object-cover" loading="lazy" />}
                </div>
                <div className="w-full h-[2px] bg-primary mb-5" />
                <h3 className="font-serif text-xl md:text-2xl text-primary mb-2">{outing.title}</h3>
                <div className="flex items-start gap-2 text-ivory-foreground font-sans font-semibold text-sm md:text-base mb-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                  <span>Location: {outing.location}</span>
                </div>
                <p className="font-sans text-muted-foreground leading-relaxed text-sm md:text-base">{outing.description}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
          {outings.map((o, i) => (
            <button key={i} onClick={() => setActiveOuting(i)} className="group flex flex-col items-center gap-2" aria-label={o.title}>
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i === activeOuting ? "w-8 bg-primary" : "w-3 bg-muted-foreground/30"}`} />
              <span className={`text-sm md:text-base font-sans ${i === activeOuting ? "text-primary font-semibold" : "text-muted-foreground"}`}>{o.title}</span>
            </button>
          ))}
        </div>

        <p className="text-center mt-8 font-serif text-lg md:text-xl text-primary/80 italic">…and many more!</p>
      </div>
    </section>
  );
};

export default OutingsSection;
