import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import cambridgeLogo from "@/assets/logos/cambridge-jbs-logo.png";
import lwlLogo from "@/assets/logos/lwl-logo-black.png";

interface IgniteCTASectionProps {
  onApplyClick: () => void;
}

export const IgniteCTASection = ({ onApplyClick }: IgniteCTASectionProps) => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-white">
      {/* Left Logo - Cambridge */}
      <div className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2">
        <img
          src={cambridgeLogo}
          alt="Cambridge Judge Business School"
          className="w-20 md:w-24 lg:w-32 h-auto opacity-80"
        />
      </div>

      {/* Right Logo - LWL */}
      <div className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2">
        <img
          src={lwlLogo}
          alt="Learn With Leaders"
          className="w-20 md:w-24 lg:w-32 h-auto opacity-80"
        />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-georgia text-2xl md:text-3xl lg:text-4xl font-bold text-[#8B1538] mb-6 uppercase tracking-wide">
            Ready to Transform Your Future?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            Join the IGNITE Young Minds Summer Programme at Cambridge and take the first step
            towards becoming a future leader and innovator.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onApplyClick}
              className="bg-[#8B1538] text-white hover:bg-[#701029] text-lg h-14 px-10 font-semibold shadow-lg"
            >
              Apply Now
            </Button>
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            18 - 24 July 2027 • Cambridge Judge Business School
          </p>
        </motion.div>
      </div>
    </section>
  );
};
