import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import igniteHero from '@/assets/cambridge/ignite-hero.jpg';

interface IgniteHeroProps {
  onApplyClick: () => void;
  brochureUrl?: string;
}

export const IgniteHero = ({ onApplyClick, brochureUrl }: IgniteHeroProps) => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden">
      {/* Background Image - adjusted position to account for navbar */}
      <div className="absolute inset-0 pt-20">
        <img
          src={igniteHero}
          alt="Cambridge University - King's College Chapel"
          className="w-full h-full object-cover object-[center_30%]"
        />
      </div>

      {/* Floating CTA at bottom center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-12 inset-x-0 flex justify-center"
      >
        <Button
          size="lg"
          onClick={onApplyClick}
          className="bg-[#8B1538] text-white hover:bg-[#701029] font-bold text-base h-12 px-8 rounded-md shadow-xl"
        >
          APPLY NOW
        </Button>

      </motion.div>
    </section>
  );
};
