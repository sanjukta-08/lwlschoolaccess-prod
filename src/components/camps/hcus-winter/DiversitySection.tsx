import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useVideoAutoplay } from "./use-video-autoplay";
import WorldMapChart from "./WorldMapChart";

const allCountries = [
  { name: "India", emoji: "🇮🇳" }, { name: "Canada", emoji: "🇨🇦" }, { name: "UAE", emoji: "🇦🇪" },
  { name: "USA", emoji: "🇺🇸" }, { name: "Saudi Arabia", emoji: "🇸🇦" }, { name: "Kenya", emoji: "🇰🇪" },
  { name: "Côte d'Ivoire", emoji: "🇨🇮" }, { name: "Nigeria", emoji: "🇳🇬" }, { name: "Mexico", emoji: "🇲🇽" },
  { name: "Mauritius", emoji: "🇲🇺" }, { name: "Uganda", emoji: "🇺🇬" }, { name: "Spain", emoji: "🇪🇸" },
  { name: "DR Congo", emoji: "🇨🇩" }, { name: "Burkina Faso", emoji: "🇧🇫" }, { name: "Brazil", emoji: "🇧🇷" },
  { name: "Bermuda", emoji: "🇧🇲" }, { name: "Taiwan", emoji: "🇹🇼" }, { name: "Rwanda", emoji: "🇷🇼" },
  { name: "Mauritania", emoji: "🇲🇷" }, { name: "Kazakhstan", emoji: "🇰🇿" }, { name: "Jordan", emoji: "🇯🇴" },
  { name: "Georgia", emoji: "🇬🇪" }, { name: "France", emoji: "🇫🇷" }, { name: "Estonia", emoji: "🇪🇪" },
  { name: "Cuba", emoji: "🇨🇺" }, { name: "Austria", emoji: "🇦🇹" }, { name: "Armenia", emoji: "🇦🇲" },
  { name: "Sri Lanka", emoji: "🇱🇰" }, { name: "China", emoji: "🇨🇳" }, { name: "Qatar", emoji: "🇶🇦" },
  { name: "Philippines", emoji: "🇵🇭" }, { name: "Ghana", emoji: "🇬🇭" }, { name: "Indonesia", emoji: "🇮🇩" },
  { name: "Netherlands", emoji: "🇳🇱" }, { name: "Japan", emoji: "🇯🇵" },
];

const DiversitySection = () => {
  const { videoRef, tryPlay } = useVideoAutoplay();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-10 md:py-14 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="relative mb-6 rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            src="/lovable-uploads/global-community-video-v2.webm"
            autoPlay muted loop playsInline preload="auto"
            onCanPlay={tryPlay}
            onLoadedData={tryPlay}
            className="w-full aspect-[3/1] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/75 to-primary/40" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6"
          >
            <p className="font-sans text-xs md:text-sm text-primary-foreground/70 uppercase tracking-[0.3em] mb-2">Global Reach</p>
            <h2 className="font-serif text-lg sm:text-2xl md:text-4xl text-primary-foreground mb-2 drop-shadow-md">A Truly Global Community</h2>
            <div className="w-12 h-px bg-primary-foreground/50 mb-3" />
            <p className="font-sans text-primary-foreground/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
              Our program brings together students from over 35 countries across 6 continents, creating a truly diverse learning environment at Harvard.
            </p>
          </motion.div>
        </div>

        <div className="w-full mb-6"><WorldMapChart /></div>

        <div className="flex flex-wrap gap-2 justify-center">
          {allCountries.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/[0.08] border border-primary-foreground/10">
              <span className="text-sm">{c.emoji}</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-primary-foreground/70 font-semibold">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiversitySection;
