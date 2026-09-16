import { motion } from "framer-motion";
import Layout5CinematicSlider from "./testimonials/Layout5CinematicSlider";
import FacultyCinematicSlider from "./testimonials/FacultyCinematicSlider";

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Voices from <span className="italic text-cambridge-rust">Past Programmes</span>
        </h2>
      </motion.div>

      {/* Student Testimonials */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cambridge-rust/40 to-transparent" />
          <p className="text-cambridge-rust font-display text-lg md:text-2xl font-semibold uppercase tracking-[0.25em]">
            Student Testimonials
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cambridge-rust/40 to-transparent" />
        </div>
        <Layout5CinematicSlider />
      </div>

      {/* Faculty Testimonials */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cambridge-rust/40 to-transparent" />
          <p className="text-cambridge-rust font-display text-lg md:text-2xl font-semibold uppercase tracking-[0.25em]">
            Faculty Testimonials
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cambridge-rust/40 to-transparent" />
        </div>
        <FacultyCinematicSlider />
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
