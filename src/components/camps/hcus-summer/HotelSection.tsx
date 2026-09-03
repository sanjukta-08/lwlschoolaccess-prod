import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Wifi, Coffee, Car } from "lucide-react";

const hotelImages = [
  { src: "/lovable-uploads/hotel-exterior-new.jpg", alt: "Cambria Hotel exterior" },
  { src: "/lovable-uploads/hotel-lobby-new.jpg", alt: "Hotel lobby" },
  { src: "/lovable-uploads/hotel-room-new.jpg", alt: "Hotel twin room" },
];

const amenities = [
  { icon: MapPin, text: "0.5 miles from Harvard" },
  { icon: Wifi, text: "Free high-speed WiFi" },
  { icon: Coffee, text: "Complimentary breakfast" },
  { icon: Car, text: "Airport transfers included" },
];

const HotelSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 px-6 bg-primary" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-accent uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4">Accommodation</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">Cambria Hotel Boston Somerville</h2>
          <div className="w-16 h-px bg-primary-foreground/30 mx-auto" />
        </motion.div>

        <div className="overflow-hidden rounded-2xl mb-4">
          <img src={hotelImages[0]!.src} alt={hotelImages[0]!.alt} className="w-full h-[280px] md:h-[420px] object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="overflow-hidden rounded-2xl"><img src={hotelImages[1]!.src} alt={hotelImages[1]!.alt} className="w-full h-[180px] md:h-[280px] object-cover" /></div>
          <div className="overflow-hidden rounded-2xl"><img src={hotelImages[2]!.src} alt={hotelImages[2]!.alt} className="w-full h-[180px] md:h-[280px] object-cover" /></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-sans text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-4">
              The upscale Cambria® Hotel Boston Somerville is situated between Somerville's Union and Porter Squares, just over half a mile from Harvard University and less than 2 miles from Tufts University and MIT.
            </p>
            <p className="font-sans text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Nearby attractions include Assembly Row, Bunker Hill Monument, the USS Constitution, and Encore Casino.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {amenities.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl px-5 py-4">
                <item.icon className="w-5 h-5 text-accent flex-shrink-0" strokeWidth={1.5} />
                <span className="font-sans text-sm md:text-base text-primary-foreground/90 font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-primary-foreground/60 font-sans text-sm mt-8">
            <MapPin className="w-4 h-4 text-accent" />
            515 Somerville Avenue, Somerville, MA 02143
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSection;
