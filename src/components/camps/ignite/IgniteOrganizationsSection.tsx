import { motion } from 'framer-motion';
import judgeCampusSpring from '@/assets/cambridge/judge-campus-spring.jpg';
import judgeExteriorSunshine from '@/assets/cambridge/judge-exterior-sunshine.jpg';

export const IgniteOrganizationsSection = () => {
  return (
    <section className="overflow-hidden">
      {/* Cambridge Judge Business School - Red/Orange Background */}
      <div className="bg-[#C94A20]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="h-64 lg:h-auto"
          >
            <img
              src={judgeCampusSpring}
              alt="Cambridge Judge Business School"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center"
          >
            <p className="text-white/90 font-bold italic text-lg mb-4">
              Get to know the Organizations
            </p>
            <h2 className="font-georgia font-bold text-[#C5B82A] text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6">
              CAMBRIDGE<br />
              JUDGE BUSINESS<br />
              SCHOOL
            </h2>
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Cambridge Judge Business School at the University of Cambridge specialises 
              in the transformation of individuals, organisations and society. Put this into 
              practice and it means it works with every student and organisation at a deep 
              level to help them identify today's important problems requiring an innovative 
              response, challenging and coaching people to find new solutions as part of 
              their personal growth. It develops individuals who can create and own their 
              own future career path, at the same time contributing to society and economic 
              advancement.
            </p>
            <p className="text-white/90 text-sm">
              E-Mail:{' '}
              <a 
                href="mailto:ignite@jbs.cam.ac.uk" 
                className="text-[#C5B82A] hover:underline"
              >
                ignite@jbs.cam.ac.uk
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* The Entrepreneurship Centre - White Background */}
      <div className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center order-2 lg:order-1"
          >
            <h2 className="font-georgia text-3xl lg:text-4xl leading-tight mb-6">
              <span className="text-gray-600">THE</span><br />
              <span className="text-[#2B7CB3]">ENTREPRENEURSHIP</span><br />
              <span className="text-[#2B7CB3]">CENTRE</span>
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              The <span className="text-[#C94A20]">Entrepreneurship Centre</span> at Cambridge Judge Business School aims to inspire, enable and 
              research <span className="text-[#2B7CB3]">entrepreneurship</span> around important <span className="text-[#C94A20]">societal</span> and economic issues. It encompasses the 
              full entrepreneurial journey, supporting and empowering emerging entrepreneurs looking to 
              create a better future by addressing these issues through <span className="text-[#C94A20]">new venture creation</span>, right through to 
              supporting small and medium sized enterprises looking to grow and build <span className="text-[#C94A20]">economic capacity</span> in 
              their <span className="text-[#2B7CB3]">ecosystems</span>.
            </p>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="h-64 lg:h-auto order-1 lg:order-2"
          >
            <img
              src={judgeExteriorSunshine}
              alt="The Entrepreneurship Centre"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
