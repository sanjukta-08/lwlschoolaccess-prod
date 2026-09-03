import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import gallery images
import gardenCelebration from '@/assets/gallery/garden-celebration.jpg';
import diningHall from '@/assets/gallery/dining-hall.jpg';
import lectureHall from '@/assets/gallery/lecture-hall.jpg';
import certificateCeremony from '@/assets/gallery/certificate-ceremony.jpg';
import teamPresentation from '@/assets/gallery/team-presentation.jpg';
import groupTour from '@/assets/gallery/group-tour.jpg';
import natureWalk from '@/assets/gallery/nature-walk.jpg';
import workshopActivity from '@/assets/gallery/workshop-activity.jpg';
import outdoorSession from '@/assets/gallery/outdoor-session.jpg';
import graduationGroup from '@/assets/gallery/graduation-group.jpg';
import registrationDesk from '@/assets/gallery/registration-desk.jpg';

const galleryImages = [
  { src: lectureHall, alt: 'Lecture session at Cambridge' },
  { src: diningHall, alt: 'Students at the dining hall' },
  { src: workshopActivity, alt: 'Workshop activity session' },
  { src: teamPresentation, alt: 'Team presentation' },
  { src: groupTour, alt: 'Group tour at Cambridge' },
  { src: natureWalk, alt: 'Nature walk excursion' },
  { src: outdoorSession, alt: 'Outdoor mentoring session' },
  { src: gardenCelebration, alt: 'Garden celebration' },
  { src: certificateCeremony, alt: 'Certificate ceremony' },
  { src: graduationGroup, alt: 'Graduation group photo' },
  { src: registrationDesk, alt: 'Registration desk at Cambridge Judge Business School' },
];

export const IgniteGallerySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let animationFrameId: number;
    let scrollPosition = scrollContainer.scrollLeft;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollPosition += scrollSpeed;
      
      // Reset when reaching the end
      if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoScrolling]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    setIsAutoScrolling(false);
    
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });

    // Resume auto-scroll after 5 seconds
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-georgia font-bold text-[#8B1538] text-2xl md:text-3xl lg:text-4xl mb-4 uppercase tracking-wide">
            PROGRAM GALLERY
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The IGNITE Young Minds Summer Programme at Cambridge Judge Entrepreneurship Centre.
          </p>
        </motion.div>
      </div>

      {/* Gallery with navigation buttons */}
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={() => handleManualScroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#C94A20] text-white flex items-center justify-center shadow-lg hover:bg-[#A83D1A] transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => handleManualScroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#C94A20] text-white flex items-center justify-center shadow-lg hover:bg-[#A83D1A] transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrolling Gallery */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden px-4 py-4"
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          {/* Double the images for seamless loop effect */}
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 md:w-80 h-56 md:h-64 overflow-hidden shadow-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
