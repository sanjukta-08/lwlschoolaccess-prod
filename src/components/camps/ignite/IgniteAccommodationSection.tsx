import { motion } from "framer-motion";
import { Building2, MapPin, Users, UtensilsCrossed, ShieldCheck, CalendarDays } from "lucide-react";
import clareMemorialCourt from "@/assets/cambridge/clare-memorial-court.jpg";
import clareCommonRoom from "@/assets/cambridge/clare-common-room.jpg";
import clareStudentRoom from "@/assets/cambridge/clare-student-room.jpg";

const amenities = [
  { icon: Building2, label: "Furnished Single & Twin Rooms" },
  { icon: MapPin, label: "Prime Location" },
  { icon: Users, label: "Student-Only Floors" },
  { icon: UtensilsCrossed, label: "On-Site Dining" },
  { icon: ShieldCheck, label: "24/7 On-Site Support" },
  { icon: CalendarDays, label: "Historic Event Spaces" },
];

export const IgniteAccommodationSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-[#8B1538] text-white p-8"
          >
            <p className="text-[#C5B82A] font-semibold tracking-wider text-sm mb-4">
              ACCOMMODATION
            </p>
            <h2 className="font-georgia font-bold text-3xl md:text-4xl mb-6">
              Clare College,
              <br />
              Cambridge
            </h2>
            <p className="text-white/80 mb-2">
              Trinity Lane, Cambridge
              <br />
              CB2 1TL, United Kingdom
            </p>
            <a
              href="https://www.clare.cam.ac.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-[#C5B82A] transition-colors inline-block mb-8"
            >
              clare.cam.ac.uk
            </a>

            <div className="mb-8">
              <h3 className="text-[#C5B82A] font-bold text-lg mb-3">OUR HERITAGE</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Founded in 1326, Clare College is the second-oldest surviving college at the
                University of Cambridge. Its stunning medieval architecture and beautiful gardens
                provide an inspiring setting for academic excellence and personal growth.
              </p>
            </div>

            <div>
              <h3 className="text-[#C5B82A] font-bold text-lg mb-3">YOUR STAY</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                During the programme, students reside in Clare College's historic accommodation.
                Experience authentic Cambridge college life with comfortable rooms, communal dining
                in the Great Hall, and access to beautiful college grounds.
              </p>
            </div>
          </motion.div>

          {/* Middle Column - Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="grid grid-rows-[2fr_1fr] gap-4 h-full">
              {/* Main Large Image */}
              <div className="overflow-hidden">
                <img
                  src={clareMemorialCourt}
                  alt="Clare College Memorial Court"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Two Smaller Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden">
                  <img
                    src={clareStudentRoom}
                    alt="Clare College Student Room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src={clareCommonRoom}
                    alt="Clare College Common Room"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Amenities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
              {amenities.map((amenity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 flex items-center justify-center text-[#2B7CB3] mb-2">
                    <amenity.icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-gray-700">{amenity.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
