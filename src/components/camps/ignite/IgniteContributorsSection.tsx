import { motion } from "framer-motion";
import { TestimonialSlider, type Contributor } from "@/components/ui/testimonial-slider";

// Import contributor images
import simonStockley from "@/assets/contributors/simon-stockley.webp";
import moniqueBoddington from "@/assets/contributors/monique-boddington.webp";
import annDavidson from "@/assets/contributors/ann-davidson.webp";
import andrewHatcher from "@/assets/contributors/andrew-hatcher.webp";
import daniilShcherbakov from "@/assets/contributors/daniil-shcherbakov.webp";
import hamidHashemi from "@/assets/contributors/hamid-hashemi.webp";
import michaelGrange from "@/assets/contributors/michael-grange.webp";

// Import background
import cambridgeSketchBg from "@/assets/cambridge/cambridge-sketch-bg.jpg";

const contributors: Contributor[] = [
  {
    id: 1,
    name: "Ann Davidson",
    affiliation: "Head of Practice, CJBS Entrepreneurship Centre",
    quote:
      "Helping new founders develop a purpose-led venture, identifying and working with company values and prototyping and iterating into your value proposition.",
    imageSrc: annDavidson,
    thumbnailSrc: annDavidson,
  },
  {
    id: 2,
    name: "Dr Monique Boddington",
    affiliation: "Director of the MSt in Entrepreneurship programme, CJBS",
    quote:
      "Passionate about understanding how research can improve the delivery and impact of entrepreneurship education to educate the next generation of entrepreneurs.",
    imageSrc: moniqueBoddington,
    thumbnailSrc: moniqueBoddington,
  },
  {
    id: 3,
    name: "Simon Stockley",
    affiliation: "Management Practice Associate Professor, CJBS",
    quote:
      "Research interests include entrepreneurship education, technology ventures, and entrepreneurial behaviour. Simon's MBA course in entrepreneurship was ranked 3rd in the world by the Financial Times.",
    imageSrc: simonStockley,
    thumbnailSrc: simonStockley,
  },
  {
    id: 4,
    name: "Michael Grange",
    affiliation: "CEO at Parker Veese Limited",
    quote:
      "An experienced professional specializing in artificial intelligence, entrepreneurship, and leadership development. Guiding numerous entrepreneurs and young professionals in launching and scaling innovative businesses.",
    imageSrc: michaelGrange,
    thumbnailSrc: michaelGrange,
  },
  {
    id: 5,
    name: "Dr Hamid Hashemi",
    affiliation: "CEO of school.how",
    quote:
      "20 years experience providing career advice, guidance with university choices and professional qualifications. Founder of a leading educational consultancy helping students each year fulfil their ambitions.",
    imageSrc: hamidHashemi,
    thumbnailSrc: hamidHashemi,
  },
  {
    id: 6,
    name: "Daniil Shcherbakov",
    affiliation: "Co-Founder & Chief Revenue Officer, Libi & Daughters",
    quote:
      "An experienced venture builder with more than 12 years in launching and scaling technology startups worldwide. Committed to fostering entrepreneurial success and has secured over £3.5 million in funding.",
    imageSrc: daniilShcherbakov,
    thumbnailSrc: daniilShcherbakov,
  },
  {
    id: 7,
    name: "Andrew Hatcher",
    affiliation: "Managing Director, The Applied Knowledge Network Limited",
    quote:
      "A seasoned entrepreneur, investor, and advisor with a proven track record in driving innovation and growth. As a mentor at both Cambridge Judge Business School and London Business School, he imparts practical knowledge in strategy development and strategic marketing.",
    imageSrc: andrewHatcher,
    thumbnailSrc: andrewHatcher,
  },
];

export const IgniteContributorsSection = () => {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${cambridgeSketchBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/90" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#C5B82A] text-lg mb-2 uppercase tracking-wide">
            Teaching & Workshops
          </p>
          <h2 className="font-georgia font-bold text-[#8B1538] text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide">
            CONTRIBUTORS
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <TestimonialSlider contributors={contributors} />
        </motion.div>
      </div>
    </section>
  );
};
