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
      {
        time: "12:00 – 13:00",
        title: "Lunch and Networking",
        description: "Build connections with mentors and fellow participants.",
      },
      {
        time: "13:00 – 14:30",
        title: "Panel Discussion: Careers in Leadership",
        description: "Professionals share how leadership shapes their careers and growth.",
      },
      {
        time: "14:30 – 15:30",
        title: "Group Brainstorming on Community Outreach Project Ideas",
        description: "Collaborate in teams to brainstorm ideas addressing real-world issues.",
      },
      {
        time: "15:30 – 17:00",
        title: "Workshop: Planning and Executing Community Projects",
        description: "Set clear goals, timelines, and resource plans for sustainable impact.",
      },
      {
        time: "17:00 – 18:00",
        title: "Dinner",
        description: "Relax and continue conversations in a casual setting.",
      },
      {
        time: "18:00 – 20:00",
        title: "Evening Outing",
        description: "Details to be finalized and shared soon.",
      },
    ],
  },
  {
    day: "Day 3",
    title: "Public Speaking and Debating Skills",
    items: [
      {
        time: "9:00 – 10:30",
        title: "Workshop: Mastering Public Speaking",
        description: "Voice modulation, posture, and audience engagement techniques.",
      },
      {
        time: "10:30 – 12:00",
        title: "Debate Workshop: Building Strong Arguments",
        description: "Constructing arguments, rebuttals, and meaningful debate strategies.",
      },
      {
        time: "12:00 – 13:00",
        title: "Lunch and Networking",
        description: "Build connections with mentors and fellow participants.",
      },
      {
        time: "13:00 – 14:30",
        title: "Mock Debate Simulation",
        description: "Debate on a relevant topic with mentor feedback.",
      },
      {
        time: "14:30 – 16:00",
        title: "Guest Speaker Panel: The Art of Persuasion",
        description: "Experts share persuasion and negotiation skills from various industries.",
      },
      {
        time: "16:00 – 17:00",
        title: "Reflection and Discussion",
        description: "Group discussion on public speaking and debating in success.",
      },
      {
        time: "17:00 – 18:00",
        title: "Dinner",
        description: "Relax and continue conversations in a casual setting.",
      },
      {
        time: "18:00 – 20:00",
        title: "Evening Outing",
        description: "Details to be finalized and shared soon.",
      },
    ],
  },
  {
    day: "Day 4",
    title: "Media Strategies, Communication, Teamwork and Problem Solving",
    items: [
      {
        time: "9:00 – 10:30",
        title: "Workshop: Leading and Working in Teams",
        description: "Foster collaboration, resolve conflicts, and lead diverse teams.",
      },
      {
        time: "10:30 – 12:00",
        title: "Problem-Solving Activity: Leadership Challenge",
        description: "Team-based challenge using problem-solving for a complex scenario.",
      },
      {
        time: "12:00 – 13:00",
        title: "Lunch and Networking",
        description: "Build connections with mentors and fellow participants.",
      },
      {
        time: "13:00 – 14:30",
        title: "Workshop: Crafting Media Campaigns for Impact",
        description: "How communication strategies and media campaigns shape public opinion.",
      },
      {
        time: "14:30 – 16:00",
        title: "Media Campaign Simulation",
        description: "Create and present a media campaign with feedback on execution.",
      },
      {
        time: "16:00 – 17:00",
        title: "Discussion: Media Ethics in Communication",
        description: "Real-world ethical challenges in responsible media communication.",
      },
      {
        time: "17:00 – 18:00",
        title: "Dinner",
        description: "Relax and continue conversations in a casual setting.",
      },
      {
        time: "18:00 – 20:00",
        title: "Evening Outing",
        description: "Details to be finalized and shared soon.",
      },
    ],
  },
  {
    day: "Day 5",
    title: "Advocacy, Outreach, and Grassroots Leadership",
    items: [
      {
        time: "9:00 – 10:30",
        title: "Workshop: Building Grassroots Movements",
        description: "Design grassroots campaigns by mobilizing volunteers and messaging.",
      },
      {
        time: "10:30 – 12:00",
        title: "Group Work: Planning a Grassroots Campaign",
        description: "Design a campaign addressing a local issue with actionable steps.",
      },
      {
        time: "12:00 – 13:00",
        title: "Lunch and Networking",
        description: "Build connections with mentors and fellow participants.",
      },
      {
        time: "13:00 – 14:30",
        title: "Guest Speaker Panel: Leaders in Community Outreach",
        description: "Activists share challenges and successes driving social change.",
      },
      {
        time: "14:30 – 16:00",
        title: "Workshop: Strategies for Advocacy",
        description: "Explore lobbying and digital activism to amplify campaigns.",
      },
      {
        time: "16:00 – 17:00",
        title: "Project Development: Community Outreach Plans",
        description: "Finalize outreach plans for presentation on the last day.",
      },
      {
        time: "17:00 – 18:00",
        title: "Dinner",
        description: "Relax and continue conversations in a casual setting.",
      },
      {
        time: "18:00 – 20:00",
        title: "Evening Outing",
        description: "Details to be finalized and shared soon.",
      },
    ],
  },
  {
    day: "Day 6",
    title: "Visionary Leadership and Project Presentations",
    items: [
      {
        time: "9:00 – 10:30",
        title: "Workshop: Exploring Visionary Leadership",
        description: "Learn about visionary leaders and the traits that define them.",
      },
      {
        time: "10:30 – 12:00",
        title: "Case Study Analysis: Leadership in Action",
        description: "Analyze real-life examples of leaders overcoming challenges.",
      },
      {
        time: "12:00 – 13:00",
        title: "Lunch and Networking",
        description: "Build connections with mentors and fellow participants.",
      },
      {
        time: "13:00 – 15:30",
        title: "Final Project Presentations",
        description: "Present community outreach projects with mentor and peer feedback.",
      },
      {
        time: "15:30 – 17:00",
        title: "Leadership Walk and Reflection",
        description: "Reflective walk exploring leadership lessons from the program.",
      },
      {
        time: "17:00 – 18:00",
        title: "Dinner",
        description: "Relax and continue conversations in a casual setting.",
      },
      {
        time: "18:00 – 20:00",
        title: "Evening Outing",
        description: "Details to be finalized and shared soon.",
      },
    ],
  },
  {
    day: "Day 7",
    title: "Final Presentations, Reflections and Future Opportunities",
    items: [
      {
        time: "9:00 – 11:00",
        title: "Final Presentations: Grassroots Campaigns and Outreach Projects",
        description: "Showcase final projects on leadership, communication, and engagement.",
      },
      {
        time: "11:00 – 12:00",
        title: "Mentor Feedback and Reflections",
        description: "Constructive feedback to refine skills for future leadership roles.",
      },
      {
        time: "12:00 – 13:00",
        title: "Lunch and Networking",
        description: "Build connections with mentors and fellow participants.",
      },
      {
        time: "13:00 – 15:30",
        title: "Group Reflection",
        description: "Celebrate and reflect on the week's learnings together.",
      },
      {
        time: "15:30 – 17:30",
        title: "Closing Panel: Shaping the Future of Leadership + Certificate Ceremony",
        description: "Panel on future leadership challenges followed by Certificate Ceremony.",
      },
      {
        time: "18:00 – 20:00",
        title: "Farewell Dinner",
        description: "Final meal celebrating connections and knowledge gained.",
      },
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

const dayImages = [
  "/lovable-uploads/schedule-day1.jpg",
  "/lovable-uploads/schedule-day2.jpg",
  "/lovable-uploads/schedule-day3.jpg",
  "/lovable-uploads/schedule-day4.jpg",
  "/lovable-uploads/schedule-day5.jpg",
  "/lovable-uploads/schedule-day6.jpg",
  "/lovable-uploads/schedule-day7.jpg",
  "/lovable-uploads/schedule-day8.jpg",
];

const ScheduleSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedDay, setSelectedDay] = useState(0);
  const scheduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) setSelectedDay(0);
  }, [inView]);

  const handleDayClick = (index: number) => {
    setSelectedDay(index);
    scheduleRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            alt={`Day ${selectedDay + 1} activities`}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
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
              <motion.button
                key={i}
                onClick={() => handleDayClick(i)}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 text-xs font-sans uppercase tracking-wider transition-all duration-300 rounded-sm ${
                  selectedDay === i
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-black/30 backdrop-blur-sm text-primary-foreground/70 hover:bg-black/50 hover:text-primary-foreground"
                }`}
              >
                {d.day}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={selectedDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-primary-foreground font-serif text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            >
              {days[selectedDay]!.title}
            </motion.p>
          </AnimatePresence>
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="flex gap-3 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-black/40 backdrop-blur-md border border-primary-foreground/10 hover:bg-black/50 transition-all duration-300"
                >
                  <div className="shrink-0 pt-0.5">
                    <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded bg-primary/90 text-primary-foreground text-xs sm:text-sm font-sans font-semibold tracking-wide whitespace-nowrap">
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
                </motion.div>
              ))}
              <p className="px-5 pt-3 font-sans text-xs md:text-sm text-primary-foreground/50 italic">
                *Please note that the schedule is subject to change and the exact schedule will be
                shared closer to the program.
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleSection;
