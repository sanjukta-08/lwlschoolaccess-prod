import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import judgeCampusSpring from "@/assets/cambridge/judge-campus-spring.jpg";
import judgeExteriorSunshine from "@/assets/cambridge/judge-exterior-sunshine.jpg";
import judgeGateAutumn from "@/assets/cambridge/judge-gate-autumn.jpg";
import kingsCollege from "@/assets/cambridge/kings-college.jpg";
import judgeBanners from "@/assets/cambridge/judge-banners.jpg";
import cjbsExterior from "@/assets/cambridge/cjbs-exterior.webp";
import judgeGateSign from "@/assets/cambridge/judge-gate-sign.jpeg";

// Array of Cambridge images to cycle through based on day
const scheduleImages = [
  judgeCampusSpring,
  judgeExteriorSunshine,
  judgeGateAutumn,
  kingsCollege,
  judgeBanners,
  cjbsExterior,
  judgeGateSign,
];
interface ScheduleItem {
  time: string;
  activity: string;
}

interface DaySchedule {
  day: string;
  dayName: string;
  items: ScheduleItem[];
}

const scheduleData: DaySchedule[] = [
  {
    day: "Day 1",
    dayName: "Sunday",
    items: [
      { time: "16:00 - 17:30", activity: "Welcome and Introduction, Ice Breaker" },
      { time: "18:00 - 19:00", activity: "Dinner" },
    ],
  },
  {
    day: "Day 2",
    dayName: "Monday",
    items: [
      { time: "08:00 - 09:00", activity: "Breakfast in College" },
      {
        time: "09:00 - 10:30",
        activity: "Developing an Innovative Mindset: A Framework for Skill Development",
      },
      { time: "10:30 - 11:00", activity: "Tea/Coffee Break" },
      { time: "11:00 - 13:00", activity: "Track One & Track Two" },
      {
        time: "11:45 - 12:45",
        activity: "Creating the Future: An Innovation workshop (Track One & Two)",
      },
      { time: "13:00 - 14:00", activity: "Lunch" },
      {
        time: "14:00 - 16:00",
        activity: "Creating the Future: An Innovation workshop (Track One and Two)",
      },
      { time: "16:00 - 16:30", activity: "Tea/Coffee Break" },
      { time: "16:30 - 18:00", activity: "Cultural activity (Tour of Cambridge, Punting, etc.)" },
      { time: "18:30 - 19:30", activity: "Dinner" },
      { time: "19:30 - 20:30", activity: "Activity in the College" },
    ],
  },
  {
    day: "Day 3",
    dayName: "Tuesday",
    items: [
      { time: "08:00 - 09:00", activity: "Breakfast in College" },
      {
        time: "09:00 - 10:00",
        activity: "Reflection on the Workshop and Skills Used. How to take your ideas forward",
      },
      { time: "10:00 - 10:30", activity: "Tea/Coffee Break" },
      { time: "10:30 - 11:30", activity: "Track One and Two: Developing your Market Strategy" },
      { time: "11:45 - 12:45", activity: "Designing and Building your Business Model" },
      { time: "13:00 - 14:00", activity: "Lunch" },
      {
        time: "14:00 - 15:30",
        activity: "In-groups students work on their team or individual idea with their mentor",
      },
      { time: "15:30 - 16:00", activity: "Tea/Coffee Break" },
      { time: "16:00 - 17:30", activity: "Cultural activity (Tour of Cambridge, Punting, etc)" },
      { time: "18:00 - 19:00", activity: "Dinner" },
      { time: "19:00 - 20:00", activity: "Activity in the college" },
    ],
  },
  {
    day: "Day 4",
    dayName: "Wednesday",
    items: [
      { time: "08:00 - 09:00", activity: "Breakfast in College" },
      {
        time: "09:00 - 10:00",
        activity: "Track One & Two: Basics of Finance: Start-up Fundamentals",
      },
      { time: "10:00 - 10:30", activity: "Tea/Coffee Break" },
      {
        time: "10:30 - 11:30",
        activity: "Track One & Two: Basics of Finance: What Goes into a Business Plan",
      },
      {
        time: "11:45 - 12:45",
        activity:
          "Track One: Guest Speaker on Emerging Trends in Innovation / Track Two: Sources of funding for Start-ups",
      },
      { time: "13:00 - 14:00", activity: "Lunch" },
      {
        time: "14:00 - 15:30",
        activity: "Track One & Two: A Workshop on Presentation Skills & Effective Communication",
      },
      { time: "15:30 - 16:00", activity: "Tea/Coffee Break" },
      {
        time: "16:00 - 17:30",
        activity: "In-groups students work on their team or individual idea with their mentor",
      },
      { time: "18:00 - 19:00", activity: "Dinner" },
      { time: "19:00 - 20:00", activity: "Quiz or Treasure Hunt" },
    ],
  },
  {
    day: "Day 5",
    dayName: "Thursday",
    items: [
      { time: "08:00 - 09:00", activity: "Breakfast in College" },
      { time: "09:00 - 10:30", activity: "Track One & Two: Leadership and Influencing skills" },
      { time: "10:30 - 11:00", activity: "Tea/Coffee Break" },
      {
        time: "11:00 - 12:00",
        activity: "Track One & Two: Meet the Entrepreneurs - an Inspirational Panel Session",
      },
      { time: "12:00 - 13:00", activity: "Lunch" },
      {
        time: "13:00 - 14:30",
        activity: "In-groups students work on their team or individual idea with their mentor",
      },
      { time: "14:30 - 15:00", activity: "Tea/Coffee Break" },
      {
        time: "15:00 - 16:30",
        activity: "In-groups students work on their team or individual idea with their mentor",
      },
      { time: "16:30 - 18:00", activity: "Free Time" },
      { time: "18:00 - 19:00", activity: "Dinner" },
      { time: "19:00 - 20:00", activity: "The group works on the Business Plan and Pitch" },
    ],
  },
  {
    day: "Day 6",
    dayName: "Friday",
    items: [
      { time: "08:00 - 09:00", activity: "Breakfast in College" },
      {
        time: "09:00 - 10:00",
        activity: "Track One & Two: Designing Your Future: A Career Focused Session",
      },
      { time: "10:00 - 10:30", activity: "Tea/Coffee Break" },
      {
        time: "10:30 - 11:30",
        activity: "Track One & Two: Workshop Designing & Building a Professional Digital Presence",
      },
      { time: "11:45 - 12:45", activity: "Time to Fine-Tune Presentations" },
      { time: "13:00 - 14:00", activity: "Lunch" },
      {
        time: "14:00 - 15:00",
        activity:
          "Teams or individual students present their Business Plan to a carefully selected panel",
      },
      { time: "15:00 - 15:20", activity: "Tea/Coffee Break" },
      { time: "15:20 - 16:30", activity: "Teams present their Business Plan" },
      { time: "16:30", activity: "Programme ends" },
      { time: "16:30 - 19:00", activity: "Free Time" },
      { time: "19:30 - 21:00", activity: "Dinner in college and Presentation of Certificates" },
    ],
  },
  {
    day: "Day 7",
    dayName: "Saturday",
    items: [
      { time: "08:00 - 10:00", activity: "Breakfast and Final Goodbyes" },
      { time: "10:30", activity: "Check-out" },
    ],
  },
];

export const IgniteScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section className="bg-[#C5B82A] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-georgia font-bold text-[#8B1538] text-2xl md:text-3xl lg:text-4xl mb-8 uppercase tracking-wide">
          PROGRAMME SCHEDULE
        </h2>

        {/* Day Tabs */}
        <div className="flex items-center mb-8 overflow-x-auto">
          {scheduleData.map((day, index) => (
            <div key={day.day} className="flex items-center">
              <button
                onClick={() => setActiveDay(index)}
                className={`px-4 md:px-6 py-2 text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                  activeDay === index
                    ? "border-2 border-[#8B1538] text-[#8B1538] bg-white/20"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {day.day}
              </button>
              {index < scheduleData.length - 1 && <div className="w-px h-6 bg-black/30 mx-1" />}
            </div>
          ))}
        </div>

        {/* Content Area - Card with overlapping image */}
        <div className="relative">
          {/* White Card - extends most of the width */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 md:p-8 md:pr-[35%] w-full relative z-0"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-[#8B1538] mb-6">
                {scheduleData[activeDay]!.dayName}
              </h3>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {scheduleData[activeDay]!.items.map((item, index) => (
                  <div key={index} className="flex gap-4 md:gap-6">
                    <span className="text-[#2B7CB3] font-medium text-sm md:text-base w-24 md:w-28 shrink-0">
                      {item.time}
                    </span>
                    <span className="text-black text-sm md:text-base">{item.activity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image overlapping on top of the card - changes per day */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${activeDay}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block absolute right-4 top-4 bottom-4 w-[30%] overflow-hidden z-10 shadow-xl"
            >
              <img
                src={scheduleImages[activeDay]}
                alt={`Cambridge Day ${activeDay + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
