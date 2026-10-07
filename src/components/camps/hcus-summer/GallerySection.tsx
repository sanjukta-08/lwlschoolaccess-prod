import { motion, useInView } from "framer-motion";
import { useRef, useCallback, useEffect, useState } from "react";
import campVideo from "@/assets/camp-video/harvard-camp-video.mp4.asset.json";

const galleryImages = [
  {
    src: "/lovable-uploads/gallery-harvard-steps.jpg",
    alt: "Students on Harvard steps",
    label: "Harvard Campus",
  },
  { src: "/lovable-uploads/gallery-ai-debate.jpg", alt: "AI debate", label: "Classroom Sessions" },
  { src: "/lovable-uploads/gallery-museum.jpg", alt: "Museum", label: "Museum Visits" },
  { src: "/lovable-uploads/gallery-bowling.jpg", alt: "Bowling", label: "Social Outings" },
  { src: "/lovable-uploads/gallery-mit.jpg", alt: "MIT", label: "MIT Tour" },
  { src: "/lovable-uploads/gallery-ice-skating.jpg", alt: "Ice skating", label: "Ice Skating" },
  { src: "/lovable-uploads/gallery-swartz-hall.jpg", alt: "Swartz Hall", label: "Swartz Hall" },
  { src: "/lovable-uploads/gallery-statue.jpg", alt: "Statue", label: "John Harvard Statue" },
  { src: "/lovable-uploads/gallery-chalkboard.jpg", alt: "Chalkboard", label: "Group Work" },
  { src: "/lovable-uploads/gallery-workshop.jpg", alt: "Workshop", label: "Creative Workshop" },
];

const doubled = [...galleryImages, ...galleryImages];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="py-16 md:py-24 bg-primary overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">
            Glimpses
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">
            Past Cohorts at Harvard University
          </h2>
          <div className="w-16 h-px bg-primary-foreground/30 mx-auto" />
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex gap-4 animate-marquee-left hover:[animation-play-state:paused] w-max will-change-transform">
          {doubled.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] md:w-[380px] aspect-[4/3] relative overflow-hidden rounded-2xl group"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 text-primary-foreground font-sans text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="rounded-2xl overflow-hidden shadow-2xl relative">
          <video
            ref={videoRef}
            src={campVideo.url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-auto"
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 p-2.5 bg-black/50 rounded-full text-primary-foreground"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
