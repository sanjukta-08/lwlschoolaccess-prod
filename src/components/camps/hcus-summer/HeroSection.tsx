import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useVideoAutoplay } from "./use-video-autoplay";
import heroBg from "@/assets/hcus/hero-bg.jpg";
import hcusLogo from "@/assets/hcus/hcus-hero-logo.png";
import lwlLogo from "@/assets/hcus/lwl-hero-logo.png";

const REGISTRATION_URL = "/apply?program=harvard-summer-camp";
const SCHOOL_REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSciaj-F5b3E5yph1cx0rwZYb1jd5jo3Hz0TR_MfBndu9LP2Mw/viewform";

const HeroSection = () => {
  const { videoRef, tryPlay } = useVideoAutoplay();

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto" controls={false}
          disablePictureInPicture disableRemotePlayback aria-hidden="true" tabIndex={-1}
          poster={heroBg}
          onCanPlay={tryPlay}
          onLoadedData={tryPlay}
          className="hero-video w-full h-full object-cover pointer-events-none"
        >
          <source src="/hcus/hero-video.webm" type="video/webm" />
          <source src="/hcus/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black/85 z-[1]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pt-16 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-6 mb-10 bg-white/95 rounded-lg px-8 py-4 shadow-lg"
        >
          <img src={hcusLogo} alt="Harvard College Union Society" className="h-10 sm:h-12 md:h-14 w-auto" />
          <div className="w-px h-8 sm:h-10 bg-black/20" />
          <img src={lwlLogo} alt="Learn with Leaders" className="h-8 sm:h-9 md:h-11 w-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="mb-4"
        >
          <p className="font-serif text-base sm:text-lg md:text-xl uppercase tracking-[0.25em] font-semibold mb-4"
            style={{ color: "#D4AF37", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
            Harvard College Union Society
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-2"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.8)" }}>
            Young Global Leaders
          </h1>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic mt-4"
            style={{ color: "#D4AF37", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
            Summer Camp
          </p>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-white/70 mt-4"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
            at &nbsp;<span className="text-white font-semibold not-italic">Harvard University</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col items-center gap-2 mb-10 mt-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {[
              { label: "Cohort 1", dates: "21 – 28 June 2026" },
              { label: "Cohort 2", dates: "28 June – 5 July 2026" },
              { label: "Cohort 3", dates: "5 – 12 July 2026" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-1">
                <p className="font-sans text-sm sm:text-base uppercase tracking-[0.2em] font-bold"
                  style={{ color: "#D4AF37", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>{c.label}</p>
                <p className="font-sans text-sm sm:text-base uppercase tracking-[0.1em] text-white font-medium"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>{c.dates}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={REGISTRATION_URL}>
              <Button
                size="lg"
                className="px-12 py-6 bg-primary text-primary-foreground font-sans font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-primary/90 transition-all duration-500 shadow-[0_4px_30px_rgba(139,0,0,0.35)] hover:shadow-[0_8px_40px_rgba(139,0,0,0.55)]"
              >
                Apply Now
              </Button>
            </Link>
            <a href={SCHOOL_REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/70 text-white font-sans font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-primary transition-all duration-500"
              >
                Register as a School
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
