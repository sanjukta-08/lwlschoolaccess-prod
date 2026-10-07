import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const heroPoster =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/ad772eb1-f28b-44e5-92d3-92b081548d8b/hero-cambridge.jpg";
const logo =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/6dff8ed0-1edc-466d-95a8-8a418c9bee74/logofv-2.png";
const ecLogo =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/afce3599-77f5-4ac4-a4ec-2ece9e7084e5/cambridge-ec-logo-white.png";

const HeroSection = ({ applyUrl }: { applyUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // autoplay blocked; ignore
      }
    };
    void tryPlay();
    const handlePause = () => {
      setTimeout(() => {
        if (video.paused) void tryPlay();
      }, 100);
    };
    video.addEventListener("pause", handlePause);
    return () => video.removeEventListener("pause", handlePause);
  }, []);

  return (
    <section className="relative min-h-[85vh] overflow-hidden flex items-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroPoster}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={
            "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/c043fbe7-cf40-4c2e-835d-61b3847acf64/hero-bg.mp4"
          }
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-44 pb-32">
        <div className="max-w-3xl">
          {/* EC Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6"
          >
            <img
              src={ecLogo}
              alt="Entrepreneurship Centre – University of Cambridge Judge Business School"
              className="h-16 md:h-20 w-auto"
            />
          </motion.div>

          {/* Summer School Tag */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/80 text-2xl md:text-3xl font-body font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Summer School 2027
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
          >
            IGNITE Young Minds <span className="italic">Programme</span>
          </motion.h1>

          {/* Institution Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-2xl md:text-3xl font-body text-white/90 mb-2"
          >
            at the{" "}
            <span className="font-display font-semibold text-white">
              Cambridge Judge Entrepreneurship Center
            </span>
          </motion.p>

          {/* Programme Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-6 mb-10 flex items-stretch"
          >
            <div className="w-1.5 rounded-full" style={{ backgroundColor: "#c23b22" }} />
            <p className="pl-4 text-white font-body text-lg md:text-xl font-bold uppercase tracking-[0.15em]">
              Programme Dates: 18–24 July 2027
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-body font-semibold text-sm tracking-wide rounded-lg shadow-lg hover:bg-white/90 hover:shadow-xl transition-all duration-300"
            >
              Register as a Student
              <ArrowRight size={16} />
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfl0WAUkv4wDjA9hOXSm-pYUGUQwgbDCyf8au82IZNMTU1FWw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-semibold text-sm tracking-wide text-white rounded-lg shadow-lg transition-all duration-300"
              style={{ backgroundColor: "#c23b22" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a83220")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c23b22")}
            >
              Register as a School
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
