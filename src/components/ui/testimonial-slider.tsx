"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Contributor = {
  id: string | number;
  name: string;
  affiliation: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc: string;
};

interface TestimonialSliderProps {
  contributors: Contributor[];
  className?: string;
}

export const TestimonialSlider = ({
  contributors,
  className,
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const activeContributor = contributors[currentIndex]!;

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % contributors.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + contributors.length) % contributors.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const thumbnailContributors = contributors
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        
        {/* Left Column: Meta and Thumbnails */}
        <div className="md:col-span-2 flex flex-row md:flex-col justify-between md:justify-start gap-4 md:gap-8">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
            <span className="text-2xl md:text-3xl font-bold text-[#8B1538]">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(contributors.length).padStart(2, "0")}
            </span>
            <span className="hidden md:block text-xs uppercase tracking-widest text-gray-500 md:writing-mode-vertical md:rotate-180"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Contributors
            </span>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex flex-row md:flex-col gap-2">
            {thumbnailContributors.map((contributor) => {
              const originalIndex = contributors.findIndex(
                (c) => c.id === contributor.id
              );
              return (
                <button
                  key={contributor.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden rounded-md w-14 h-18 md:w-16 md:h-20 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:ring-offset-2"
                  aria-label={`View contributor ${contributor.name}`}
                >
                  <img
                    src={contributor.thumbnailSrc}
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: Main Image */}
        <div className="md:col-span-4 relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={activeContributor.id}
              src={activeContributor.imageSrc}
              alt={activeContributor.name}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Right Column: Text and Navigation */}
        <div className="md:col-span-6 flex flex-col justify-between h-full py-4">
          {/* Text Content */}
          <div className="flex-1 flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeContributor.id}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-4"
              >
                <p className="text-sm uppercase tracking-wider text-[#C5B82A] font-semibold">
                  {activeContributor.affiliation}
                </p>
                <h3 className="text-2xl md:text-3xl font-georgia font-bold text-[#8B1538]">
                  {activeContributor.name}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed italic">
                  "{activeContributor.quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white"
              aria-label="Previous contributor"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white"
              aria-label="Next contributor"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
