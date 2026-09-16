import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const glimpses1 = "/__l5e/assets-v1/ed29d763-c3cb-46b7-a803-5913fcf9f51c/glimpses-1.jpg";
const glimpses2 = "/__l5e/assets-v1/458ad0e4-5aa8-4e00-840c-9ba9cbc7d8b3/glimpses-2.jpg";
const glimpses3 = "/__l5e/assets-v1/460e3e02-2fbb-457c-959e-04308fccac6b/glimpses-3.jpg";
const glimpses4 = "/__l5e/assets-v1/aebc9fff-0428-42bf-8142-88f043256d9b/glimpses-4.jpg";
const glimpses5 = "/__l5e/assets-v1/fb2c3ec8-461a-4626-87ec-aa87a3c1c147/glimpses-5.jpg";
const glimpses6 = "/__l5e/assets-v1/5ed1255f-716c-44fe-83f5-836294cb159d/glimpses-6.jpg";
const glimpses7 = "/__l5e/assets-v1/949ae562-0eb8-41c5-8522-751ef34d0798/glimpses-7.jpg";
const glimpses8 = "/__l5e/assets-v1/4af61645-202b-41ab-8a9c-67548ecdce68/glimpses-8.jpg";
const glimpses9 = "/__l5e/assets-v1/f49f1f3b-a733-462f-8270-ca05e0650171/glimpses-9.jpg";
const glimpses10 = "/__l5e/assets-v1/8ee1a7a0-14ce-4732-acb4-045c05e6b73c/glimpses-10.jpg";
const glimpses11 = "/__l5e/assets-v1/2d8c2f3d-994f-4dea-9fcf-1489dc3ab503/glimpses-11.jpg";
const glimpses12 = "/__l5e/assets-v1/e6516e48-2662-4df1-bda1-166237140f96/glimpses-12.jpg";
const glimpses13 = "/__l5e/assets-v1/e3ca73d1-aa96-4abb-9836-e30d8a8e1c41/glimpses-13.jpg";
const glimpses14 = "/__l5e/assets-v1/a99dd7f6-fc3b-43d9-9f51-d2bb99daced5/glimpses-14.jpg";
const glimpses15 = "/__l5e/assets-v1/34b546b1-46e0-48f8-a8ff-510e6374d1a4/glimpses-15.jpg";
const glimpses16 = "/__l5e/assets-v1/86015dc2-1576-40a6-9db4-9bd9fb3760d2/glimpses-16.jpg";
const glimpses17 = "/__l5e/assets-v1/fd2ecf73-aa2c-4db6-be60-0d5f6dbcb2a2/glimpses-17.jpg";
const glimpses18 = "/__l5e/assets-v1/12fae8be-b457-4980-bfe1-f72a1e84ef92/glimpses-18.jpg";
const glimpses19 = "/__l5e/assets-v1/1f68d402-a211-4a54-9d27-a3c46ea573e8/glimpses-19.jpg";
const glimpses20 = "/__l5e/assets-v1/dcc0e27e-4bae-4921-accb-1fc44ab48d1a/glimpses-20.jpg";

const slides = [
  [glimpses8, glimpses10, glimpses1, glimpses4],
  [glimpses3, glimpses9, glimpses5, glimpses2],
  [glimpses6, glimpses7, glimpses19, glimpses11],
  [glimpses12, glimpses18, glimpses16, glimpses13],
  [glimpses15, glimpses14, glimpses20, glimpses17],
];

const GlimpsesSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
      if (!next) videoRef.current.play().catch(() => {});
    }
  };

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const currentSlides = slides[current] ?? slides[0] ?? [];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#c23b22" }}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            Glimpses from <span className="italic">Past Programmes</span>
          </h2>
          <p className="mt-4 text-white/70 font-body text-lg max-w-2xl mx-auto">
            Workshops, friendships, adventures, and celebrations — every cohort writes its own story.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              >
                {currentSlides.map((src, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl overflow-hidden relative group"
                  >
                    <img
                      src={src}
                      alt={`IGNITE programme moment ${current * 4 + i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed video */}
      <div className="relative w-full mt-16 md:mt-20">
        <video
          ref={videoRef}
          src="/__l5e/assets-v1/074132fa-87f2-4bab-8388-e702ce37fd07/cambridge-glimpses.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          className="w-full h-auto block"
        />
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </section>
  );
};

export default GlimpsesSection;
