import { motion } from 'framer-motion';

const objectives = [
  "Problem solving and creative thinking",
  "What is innovation and the innovation process?",
  "Core business skills – business plans and financial awareness",
  "Team building and teamwork",
  "Personal leadership and influencing skills",
  "Good communication skills and the confidence to pitch ideas and work with feedback",
  "The importance of setting SMART goals and acting on these",
  "How to build valuable connections and networks"
];

export const IgniteLearningObjectives = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-georgia font-bold text-[#8B1538] text-xl md:text-2xl lg:text-3xl uppercase tracking-wide mb-8">
          PROGRAMME LEARNING OBJECTIVES
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border-l-4 border-[#2B7CB3] pl-6 md:pl-8"
          >
            
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              As the students are supported to develop an entrepreneurial mindset and will work to develop and appreciate 
              the following skills and competencies associated with this mindset. Whether they value these skills for their 
              future career planning and/or the development of their own ideas for new venture creation.
            </p>

            <ul className="space-y-3 mb-8">
              {objectives.map((objective, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2B7CB3] mt-2 shrink-0" />
                  <span className="text-base">{objective}</span>
                </motion.li>
              ))}
            </ul>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              The programme will be grounded in the{' '}
              <span className="text-[#C5B82A] font-semibold">University of Cambridge</span>{' '}
              ecosystem, offering students the chance to meet current students, visit some of the colleges and experience Cambridge.
            </p>
          </motion.div>

          {/* Right Column - Visual Element (can be extended later) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#C5B82A]/20 -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[#2B7CB3]/20 translate-y-1/4 -translate-x-1/4" />
              
              {/* Stats card */}
              <div className="relative bg-muted/50 rounded-2xl p-8 border border-border">
                <div className="text-center space-y-6">
                  <div>
                    <p className="text-5xl font-black text-[#C5B82A]">8+</p>
                    <p className="text-sm text-muted-foreground mt-1">Core Skills Developed</p>
                  </div>
                  <div className="w-full h-px bg-border" />
                  <div>
                    <p className="text-5xl font-black text-[#2B7CB3]">7</p>
                    <p className="text-sm text-muted-foreground mt-1">Days of Immersive Learning</p>
                  </div>
                  <div className="w-full h-px bg-border" />
                  <div>
                    <p className="text-5xl font-black text-[#8B1538]">100%</p>
                    <p className="text-sm text-muted-foreground mt-1">Hands-on Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
