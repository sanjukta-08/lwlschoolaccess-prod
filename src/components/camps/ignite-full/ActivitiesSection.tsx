import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
const activitiesDinner = "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/086bd98a-c9eb-4774-83b1-bda5ffe311c9/activities-dinner.jpg";
const activitiesPunting = "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/67301399-8988-49d4-8c12-5524a010de0a/activities-punting.jpg";
const activitiesCampus = "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/10611018-354d-48e3-8978-5ce4a51913c8/activities-campus.jpg";
const activitiesMuseum = "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/82136c7f-b4be-42b1-9a59-621afb6ece9c/activities-museum.jpg";
const activitiesDining = "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/31782966-8445-4950-9cbc-48be2d881e9f/activities-dining.jpg";

const photos = [
  { src: activitiesCampus, alt: "Students on Cambridge campus", label: "Campus Tour", desc: "Campus Tour of Cambridge covering its history and notable sights" },
  { src: activitiesPunting, alt: "Students punting on the River Cam", label: "Punting", desc: "Punting on the River Cam" },
  { src: activitiesMuseum, alt: "Cambridge museum visit", label: "Museum Visit", desc: "Excursion to Cambridge Museums" },
  { src: activitiesDinner, alt: "Students at College Dinner", label: "College Dinner", desc: "College Dinner" },
  { src: activitiesDining, alt: "Students enjoying evening activities", label: "Evening Activities", desc: "Variety of daily evening activities (Tenpin bowling, sports, quiz)" },
];

const ActivitiesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 316, behavior: "smooth" });
  };

  return (
    <section id="activities" className="bg-[#cbcc02]">
      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-8">
        <motion.div className="text-center max-w-4xl mx-auto mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 leading-[1.05] mb-8">
            Out of Class <span className="italic text-white">Activities</span>
          </h2>
          <p className="text-xl font-body text-neutral-900/75 leading-relaxed">
            Certified tour guides from University of Cambridge will lead excursions in Cambridge and other destinations. Together with your fellow students, you will enjoy an inspirational and fun programme of activities such as punting, trips to Cambridge, sports, and more.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-28">
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-sm"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {photos.map((p, i) => (
              <div key={i} className="relative snap-start flex-shrink-0 w-[300px] aspect-[3/4] rounded-sm overflow-hidden bg-neutral-900">
                <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-5 pt-24">
                  <h3 className="text-white font-display text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{p.label}</h3>
                  <p className="text-white/90 font-body text-sm mt-1.5 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Editorial arrow buttons */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous activities"
            className="group absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-900 text-[#cbcc02] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-[#c23b22] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={22} strokeWidth={2.25} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next activities"
            className="group absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-900 text-[#cbcc02] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-[#c23b22] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowRight size={22} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
