import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
  location?: string;
}
interface DaySchedule {
  day: string;
  title: string;
  items: ScheduleItem[];
}

const days: DaySchedule[] = [
  {
    day: "Day 1",
    title: "Arrival & Orientation",
    items: [
      {
        time: "15:00 – 23:59",
        title: "Hotel Check-in Available",
        location: "Cambria Hotel Boston Somerville",
      },
      { time: "18:30 – 20:30", title: "Dinner" },
    ],
  },
  {
    day: "Day 2",
    title: "Foundations of Leadership and Communication",
    items: [
      {
        time: "9:00 – 10:00",
        title: "Welcome and Program Overview",
        description: "Introduction to goals, activities, expectations, and program leaders.",
      },
      {
        time: "10:00 – 11:00",
        title: "Keynote Speech on Leadership Principles",
        description: "Guest speaker on integrity, empathy, and communication in leadership.",
      },
      {
        time: "11:00 – 12:00",
        title: "Workshop: Developing Effective Communication Skills",
        description: "Active listening, storytelling, and non-verbal communication activities.",
      },
      { time: "12:00 – 13:00", title: "Lunch and Networking" },
      { time: "13:00 – 14:30", title: "Panel Discussion: Careers in Leadership" },
      { time: "14:30 – 15:30", title: "Group Brainstorming on Community Outreach Project Ideas" },
      { time: "15:30 – 17:00", title: "Workshop: Planning and Executing Community Projects" },
      { time: "17:00 – 18:00", title: "Dinner" },
      { time: "18:00 – 20:00", title: "Evening Outing" },
    ],
  },
  {
    day: "Day 3",
    title: "Public Speaking and Debating Skills",
    items: [
      { time: "9:00 – 10:30", title: "Workshop: Mastering Public Speaking" },
      { time: "10:30 – 12:00", title: "Debate Workshop: Building Strong Arguments" },
      { time: "12:00 – 13:00", title: "Lunch and Networking" },
      { time: "13:00 – 14:30", title: "Mock Debate Simulation" },
      { time: "14:30 – 16:00", title: "Guest Speaker Panel: The Art of Persuasion" },
      { time: "16:00 – 17:00", title: "Reflection and Discussion" },
      { time: "17:00 – 18:00", title: "Dinner" },
      { time: "18:00 – 20:00", title: "Evening Outing" },
    ],
  },
  {
    day: "Day 4",
    title: "Media Strategies, Communication, Teamwork and Problem Solving",
    items: [
      { time: "9:00 – 10:30", title: "Workshop: Leading and Working in Teams" },
      { time: "10:30 – 12:00", title: "Problem-Solving Activity: Leadership Challenge" },
      { time: "12:00 – 13:00", title: "Lunch and Networking" },
      { time: "13:00 – 14:30", title: "Workshop: Crafting Media Campaigns for Impact" },
      { time: "14:30 – 16:00", title: "Media Campaign Simulation" },
      { time: "16:00 – 17:00", title: "Discussion: Media Ethics in Communication" },
      { time: "17:00 – 18:00", title: "Dinner" },
      { time: "18:00 – 20:00", title: "Evening Outing" },
    ],
  },
  {
    day: "Day 5",
    title: "Advocacy, Outreach, and Grassroots Leadership",
    items: [
      { time: "9:00 – 10:30", title: "Workshop: Building Grassroots Movements" },
      { time: "10:30 – 12:00", title: "Group Work: Planning a Grassroots Campaign" },
      { time: "12:00 – 13:00", title: "Lunch and Networking" },
      { time: "13:00 – 14:30", title: "Guest Speaker Panel: Leaders in Community Outreach" },
      { time: "14:30 – 16:00", title: "Workshop: Strategies for Advocacy" },
      { time: "16:00 – 17:00", title: "Project Development: Community Outreach Plans" },
      { time: "17:00 – 18:00", title: "Dinner" },
      { time: "18:00 – 20:00", title: "Evening Outing" },
    ],
  },
  {
    day: "Day 6",
    title: "Visionary Leadership and Project Presentations",
    items: [
      { time: "9:00 – 10:30", title: "Workshop: Exploring Visionary Leadership" },
      { time: "10:30 – 12:00", title: "Case Study Analysis: Leadership in Action" },
      { time: "12:00 – 13:00", title: "Lunch and Networking" },
      { time: "13:00 – 15:30", title: "Final Project Presentations" },
      { time: "15:30 – 17:00", title: "Leadership Walk and Reflection" },
      { time: "17:00 – 18:00", title: "Dinner" },
      { time: "18:00 – 20:00", title: "Evening Outing" },
    ],
  },
  {
    day: "Day 7",
    title: "Final Presentations, Reflections and Future Opportunities",
    items: [
      {
        time: "9:00 – 11:00",
        title: "Final Presentations: Grassroots Campaigns and Outreach Projects",
      },
      { time: "11:00 – 12:00", title: "Mentor Feedback and Reflections" },
      { time: "12:00 – 13:00", title: "Lunch and Networking" },
      { time: "13:00 – 15:30", title: "Group Reflection" },
      { time: "15:30 – 17:30", title: "Closing Panel + Certificate Ceremony" },
      { time: "18:00 – 20:00", title: "Farewell Dinner" },
    ],
  },
  {
    day: "Day 8",
    title: "Departure",
    items: [
      { time: "7:30 – 9:00", title: "Breakfast" },
      {
        time: "Before 12:00",
        title: "Check out of the Hotel",
        location: "Cambria Hotel Boston Somerville",
      },
    ],
  },
];

const dayImages = Array.from({ length: 8 }, (_, i) => `/lovable-uploads/schedule-day${i + 1}.jpg`);

const ScheduleSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (inView) setSelectedDay(0);
  }, [inView]);

  return (
    <section id="schedule" ref={ref} className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={dayImages[selectedDay]}
            alt={`Day ${selectedDay + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div className="relative z-10 flex flex-col lg:flex-row p-4 sm:p-8 md:p-12 lg:p-16 gap-6 sm:gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:w-[35%] flex flex-col"
        >
          <p className="text-secondary uppercase tracking-[0.3em] text-xs md:text-sm font-sans mb-4">
            Itinerary
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-3">
            Tentative
          </h2>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-8">
            Schedule
          </h2>
          <div className="w-12 h-px bg-secondary mb-8" />

          <div className="flex flex-wrap gap-2">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`px-5 py-2.5 text-xs font-sans uppercase tracking-wider transition-all duration-300 rounded-sm ${selectedDay === i ? "bg-primary text-primary-foreground shadow-lg" : "bg-black/30 backdrop-blur-sm text-primary-foreground/70 hover:bg-black/50"}`}
              >
                {d.day}
              </button>
            ))}
          </div>

          <p className="mt-6 text-primary-foreground font-serif text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {days[selectedDay]!.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-[65%] flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              {days[selectedDay]!.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-black/40 backdrop-blur-md border border-primary-foreground/10"
                >
                  <div className="shrink-0 pt-0.5">
                    <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded bg-primary/90 text-primary-foreground text-xs sm:text-sm font-sans font-semibold whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-lg md:text-xl text-primary-foreground leading-tight">
                      {item.title}
                    </h4>
                    {item.location && (
                      <p className="text-secondary text-sm font-sans italic">📍 {item.location}</p>
                    )}
                    {item.description && (
                      <p className="font-sans text-primary-foreground/70 text-sm leading-snug line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <p className="px-5 pt-3 font-sans text-xs md:text-sm text-primary-foreground/50 italic">
                *Schedule is subject to change.
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleSection;
