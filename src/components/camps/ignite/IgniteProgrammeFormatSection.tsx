import { motion } from "framer-motion";
import cjbsInterior from "@/assets/cambridge/cjbs-interior.png";

const bulletPoints = [
  "Interactive teaching sessions",
  "Immersive workshops",
  "Engaging presentations",
  "Practical group work with a facilitators",
  "Extra-curricular activities such as tour of Cambridge, punting and visiting world famous museums will be offered in the late afternoons",
  "Topical guest speaker sessions and sessions with University of Cambridge students will provide opportunities to learn about student life and routes to studying in Cambridge, supported by a specific career focused session.",
];

export const IgniteProgrammeFormatSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden shadow-xl">
              <img
                src={cjbsInterior}
                alt="Cambridge Judge Business School Interior"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-georgia font-bold text-[#8B1538] text-2xl md:text-3xl lg:text-4xl mb-6 uppercase tracking-wide">
              PROGRAMME FORMAT AND CONTENT
            </h2>

            <p className="text-gray-700 text-lg mb-4">
              The programme will be delivered in person in
            </p>

            <p className="font-georgia italic text-[#C94A20] text-2xl md:text-3xl lg:text-4xl leading-tight mb-8">
              Cambridge Judge Business School, University of Cambridge, Trumpington Street, CB2 1AG.
            </p>

            <ul className="space-y-3">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#C94A20] mt-1.5">•</span>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
