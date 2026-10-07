import { motion } from "framer-motion";
import kingsCollege from "@/assets/cambridge/kings-college.jpg";
import judgeGateSign from "@/assets/cambridge/judge-gate-sign.jpeg";
import judgeBanners from "@/assets/cambridge/judge-banners.jpg";
import cambridgeWalk from "@/assets/cambridge/cambridge-walk.jpg";

const activities = [
  "Campus Tour of Cambridge covering its history and notable sights",
  "Punting",
  "Excursion to Cambridge Museums",
  "Variety of daily evening activities (Tenpin bowling, sports, quiz)",
  "College Dinner",
];

export const IgniteActivitiesSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-georgia font-bold text-[#8B1538] text-2xl md:text-3xl lg:text-4xl text-center mb-8 uppercase tracking-wide"
        >
          OUT OF CLASS ACTIVITIES &<br />
          CAMBRIDGE TOURS
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-gray-700 max-w-3xl mx-auto mb-12"
        >
          Certified tour guides from{" "}
          <span className="text-[#8B1538] font-semibold">University of Cambridge</span> will lead
          excursions in Cambridge and other destinations. Together with your fellow students, you
          will enjoy an inspirational and fun programme of activities such as punting, trips to
          Cambridge, sports, and more.
        </motion.p>

        {/* Image Collage */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 row-span-2 rounded-lg overflow-hidden"
          >
            <img
              src={kingsCollege}
              alt="King's College Cambridge"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1 rounded-lg overflow-hidden"
          >
            <img
              src={judgeGateSign}
              alt="Judge Business School Gate"
              className="w-full h-48 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-2 rounded-lg overflow-hidden"
          >
            <img
              src={judgeBanners}
              alt="Students at Cambridge Judge Business School"
              className="w-full h-48 md:h-64 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-3 rounded-lg overflow-hidden"
          >
            <img
              src={cambridgeWalk}
              alt="Cambridge Walking Tour"
              className="w-full h-48 md:h-64 object-cover"
            />
          </motion.div>
        </div>

        {/* Activities Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-[#8B1538] font-bold text-lg md:text-xl mb-6 text-center md:text-left">
            Experience student life at Cambridge beyond the classroom and participate in:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5B82A] mt-2 shrink-0" />
                <span className="text-gray-700">{activity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
