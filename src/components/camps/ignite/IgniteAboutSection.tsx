import { motion } from 'framer-motion';
import aboutBg from '@/assets/cambridge/about-bg.jpg';
import { IgniteSectionHeader } from './IgniteSectionHeader';

export const IgniteAboutSection = () => {
  return (
    <section 
      className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex justify-center md:justify-start">
          {/* Yellow Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#C5B82A] rounded-xl p-6 md:p-10 lg:p-12 w-full md:w-3/4 lg:w-1/2 max-h-[70vh] overflow-y-auto"
          >
            <h2 className="font-georgia font-bold text-black text-lg md:text-xl lg:text-2xl uppercase tracking-wide mb-4">ABOUT THE PROGRAMME</h2>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-georgia font-bold text-[#8B1538] mb-6 uppercase leading-tight">
              IGNITE Young Minds Programme
            </h3>
            
            {/* Skill Development */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-black mb-2">Skill Development</h3>
              <p className="text-black/85 text-sm md:text-base leading-relaxed">
                Leveraging the <span className="text-[#8B1538] font-semibold">Cambridge Judge Entrepreneurship Centre's</span> access to academic 
                faculty and research, not to mention Cambridge's vibrant entrepreneurial and innovative ecosystem, this programme is designed 
                to enable students to prepare for their future. The World Economic Forum Future of Jobs 2023 report found that analytical thinking, 
                creativity, leadership, social influence and the ability to work with other people will be amongst the key skills helping young 
                people stand out and navigate the future job markets. Key skills often associated with the development of an entrepreneurial mindset.
              </p>
            </div>

            {/* A Digital Future */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-black mb-2">A Digital Future : What Does AI Mean for Me?</h3>
              <p className="text-black/85 text-sm md:text-base leading-relaxed">
                However, as AI looks set to reshape the workforce of tomorrow, not to mention higher education, the Ignite Young Minds programme 
                will also help students explore these skills within the context of a digital future. Students will get hands-on experience of 
                using carefully curated AI tools to support their critical thinking and problem-solving skills as they work in their teams on 
                real world challenges. This practical experience will be supported by a facilitated session encouraging students to identify how 
                and where AI can best support them in their career planning, helping them to identify and communicate the personal skills they 
                can bring to a digital future and the future world of work.
              </p>
            </div>

            {/* Future Ready */}
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Future Ready.</h3>
              <p className="text-black/85 text-sm md:text-base leading-relaxed">
                By drawing on the Centre's entrepreneurial education and teaching framework, this programme is designed to help young students 
                develop these skills through intensive entrepreneurial experience. Immersive lectures, workshops and supporting activities will 
                guide the students through the entrepreneurial process of identifying and exploring new ideas and acquiring confidence and 
                communication skills to work in innovative teams and experience new and enabling technologies. Ensuring they develop these key 
                skills as part of their personal development as they prepare to go to university and enter the future workplace or start their own venture.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
