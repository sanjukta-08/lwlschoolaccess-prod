import { motion, useInView } from "framer-motion";
import { useRef, useCallback, useEffect, useState } from "react";
import campVideo from "@/assets/camp-video/harvard-camp-video.mp4.asset.json";

const galleryImages = [
  {
    src: "/lovable-uploads/gallery-harvard-steps.jpg",
    alt: "Students on Harvard steps",
    label: "Harvard Campus",
  },
  {
    src: "/lovable-uploads/gallery-ai-debate.jpg",
    alt: "Student presenting AI debate",
    label: "Classroom Sessions",
  },
  { src: "/lovable-uploads/gallery-museum.jpg", alt: "Students at museum", label: "Museum Visits" },
  { src: "/lovable-uploads/gallery-bowling.jpg", alt: "Students bowling", label: "Social Outings" },
  { src: "/lovable-uploads/gallery-mit.jpg", alt: "Students at MIT", label: "MIT Tour" },
  {
    src: "/lovable-uploads/gallery-ice-skating.jpg",
    alt: "Students ice skating",
    label: "Ice Skating",
  },
  {
    src: "/lovable-uploads/gallery-swartz-hall.jpg",
    alt: "Students at Swartz Hall",
    label: "Swartz Hall",
  },
  {
    src: "/lovable-uploads/gallery-statue.jpg",
    alt: "Students at Harvard statue",
    label: "John Harvard Statue",
  },
  {
    src: "/lovable-uploads/gallery-chalkboard.jpg",
    alt: "Student writing on chalkboard",
    label: "Group Work",
  },
  {
    src: "/lovable-uploads/gallery-workshop.jpg",
    alt: "Students in workshop",
    label: "Creative Workshop",
  },
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

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    if (v.paused) v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    tryPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) tryPlay();
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(v);
    const t1 = setTimeout(tryPlay, 1000);
    const t2 = setTimeout(tryPlay, 3000);
    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [tryPlay]);

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="relative"
      >
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
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 text-primary-foreground font-sans text-sm font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.label}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-primary to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-primary to-transparent pointer-events-none z-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 mt-12"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl relative">
          <video
            ref={videoRef}
            src={campVideo.url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={tryPlay}
            onLoadedData={tryPlay}
            className="w-full h-auto"
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 rounded-full text-primary-foreground transition-all duration-300 hover:scale-110 z-10"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default GallerySection;
