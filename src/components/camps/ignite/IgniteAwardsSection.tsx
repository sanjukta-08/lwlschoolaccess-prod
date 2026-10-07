import { motion } from "framer-motion";
import { Award, Globe, FileCheck } from "lucide-react";
import cambridgeQuad from "@/assets/cambridge/cambridge-quad.jpg";

const awards = [
  {
    icon: Award,
    title: "Get Certificates from the Entrepreneurship Centre at Cambridge Judge Business School",
    description:
      "These certificates can be valuable assets in pursuing further education or advancing in a career",
  },
  {
    icon: Globe,
    title: "Build a Global Network",
    description:
      "Connect with mentors from Cambridge Judge Business School Entrepreneurship Centre and international students, and gain real-world skills",
  },
  {
    icon: FileCheck,
    title: "Portfolio Enhancement",
    description: "Enhance your resume and student portfolio with certificates and presentations",
  },
];

export const IgniteAwardsSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Lime/Yellow-green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C5D631] via-[#D4E157] to-[#E8F5E9]" />

      {/* Cambridge building background at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cambridgeQuad})` }}
      />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-georgia font-bold text-[#8B1538] text-2xl md:text-3xl lg:text-4xl mb-4 uppercase tracking-wide">
            AWARDS AND RECOGNITION FOR STUDENTS
          </h2>
          <p className="text-gray-700 text-lg">
            Showcase your achievements to the rest of the world
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-48 md:mb-64">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm p-6 shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <award.icon className="w-12 h-12 text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="text-[#8B1538] font-semibold text-lg mb-3 leading-tight">
                {award.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
