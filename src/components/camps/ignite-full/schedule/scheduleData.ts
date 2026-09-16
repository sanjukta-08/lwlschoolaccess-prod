const schedule1 = "/__l5e/assets-v1/8cc903e7-bd62-4c04-9442-7c82aebaee15/schedule-1.jpg";
const schedule2 = "/__l5e/assets-v1/f594f07a-2e82-4622-8f60-3381013141a8/schedule-2.jpg";
const schedule3 = "/__l5e/assets-v1/87412c6b-ec57-4bfd-a44a-16f0b39aaaf7/schedule-3.jpg";
const schedule4 = "/__l5e/assets-v1/34cc81f3-3256-4336-974b-9bc7a3f478f3/schedule-4.jpg";
const schedule5 = "/__l5e/assets-v1/8d1a989b-10a3-4650-b2dd-0204ed7e7966/schedule-5.jpg";
const schedule6 = "/__l5e/assets-v1/b72514be-f216-4e05-b96a-6c767dbae053/schedule-6.jpg";
const schedule7 = "/__l5e/assets-v1/240b0241-8eed-49cf-bc07-5b547951d710/schedule-7.jpg";

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface ScheduleDay {
  day: string;
  label: string;
  shortLabel: string;
  theme: string;
  image: string;
  imagePosition: string;
  items: ScheduleItem[];
}

export const schedule: ScheduleDay[] = [
  {
    day: "Day 1", label: "Sunday", shortLabel: "Sun", theme: "18 July – Sunday", image: schedule1, imagePosition: "center 40%",
    items: [
      { time: "16:00 – 17:30", activity: "Welcome and Introduction, Ice Breaker" },
      { time: "18:00 – 19:00", activity: "Dinner" },
    ],
  },
  {
    day: "Day 2", label: "Monday", shortLabel: "Mon", theme: "19 July – Monday", image: schedule2, imagePosition: "center 60%",
    items: [
      { time: "08:00 – 09:00", activity: "Breakfast in College" },
      { time: "09:00 – 10:30", activity: "Developing an Innovative Mindset: A Framework for Skill Development" },
      { time: "10:30 – 11:00", activity: "Tea/Coffee Break" },
      { time: "11:00 – 11:45", activity: "Track One & Track Two" },
      { time: "11:45 – 12:45", activity: "Creating the Future: An Innovation Workshop (Track One & Two)" },
      { time: "13:00 – 14:00", activity: "Lunch" },
      { time: "14:00 – 16:00", activity: "Creating the Future: An Innovation Workshop (Track One & Two)" },
      { time: "16:00 – 16:30", activity: "Tea/Coffee Break" },
      { time: "16:30 – 18:00", activity: "Cultural Activity (Tour of Cambridge, Punting, etc.)" },
      { time: "18:30 – 19:30", activity: "Dinner" },
      { time: "19:30 – 20:30", activity: "Activity in the College" },
    ],
  },
  {
    day: "Day 3", label: "Tuesday", shortLabel: "Tue", theme: "20 July – Tuesday", image: schedule3, imagePosition: "center 40%",
    items: [
      { time: "08:00 – 09:00", activity: "Breakfast in College" },
      { time: "09:00 – 10:00", activity: "Reflection on the Workshop and Skills Used" },
      { time: "10:00 – 10:30", activity: "Tea/Coffee Break" },
      { time: "10:30 – 11:30", activity: "Track One & Two: Developing Your Market Strategy" },
      { time: "11:45 – 12:45", activity: "Designing and Building Your Business Model" },
      { time: "13:00 – 14:00", activity: "Lunch" },
      { time: "14:00 – 15:30", activity: "In-groups students work on their idea with mentor" },
      { time: "15:30 – 16:00", activity: "Tea/Coffee Break" },
      { time: "16:00 – 17:30", activity: "Cultural Activity (Tour of Cambridge, Punting, etc.)" },
      { time: "18:00 – 19:00", activity: "Dinner" },
      { time: "19:00 – 20:00", activity: "Activity in the College" },
    ],
  },
  {
    day: "Day 4", label: "Wednesday", shortLabel: "Wed", theme: "21 July – Wednesday", image: schedule4, imagePosition: "center 25%",
    items: [
      { time: "08:00 – 09:00", activity: "Breakfast in College" },
      { time: "09:00 – 10:00", activity: "Track One & Two: Basics of Finance – Start-up Fundamentals" },
      { time: "10:00 – 10:30", activity: "Tea/Coffee Break" },
      { time: "10:30 – 11:30", activity: "Track One & Two: What Goes into a Business Plan" },
      { time: "11:45 – 12:45", activity: "Guest Speaker / Sources of Funding for Start-ups" },
      { time: "13:00 – 14:00", activity: "Lunch" },
      { time: "14:00 – 15:30", activity: "Workshop on Presentation Skills & Communication" },
      { time: "15:30 – 16:00", activity: "Tea/Coffee Break" },
      { time: "16:00 – 17:30", activity: "In-groups students work on their idea with mentor" },
      { time: "18:00 – 19:00", activity: "Dinner" },
      { time: "19:00 – 20:00", activity: "Quiz or Treasure Hunt" },
    ],
  },
  {
    day: "Day 5", label: "Thursday", shortLabel: "Thu", theme: "22 July – Thursday", image: schedule5, imagePosition: "center 50%",
    items: [
      { time: "08:00 – 09:00", activity: "Breakfast in College" },
      { time: "09:00 – 10:30", activity: "Track One & Two: Leadership and Influencing Skills" },
      { time: "10:30 – 11:00", activity: "Tea/Coffee Break" },
      { time: "11:00 – 12:00", activity: "Meet the Entrepreneurs – Inspirational Panel" },
      { time: "12:00 – 13:00", activity: "Lunch" },
      { time: "13:00 – 14:30", activity: "In-groups students work on their idea with mentor" },
      { time: "14:30 – 15:00", activity: "Tea/Coffee Break" },
      { time: "15:00 – 16:30", activity: "In-groups students work on their idea with mentor" },
      { time: "16:30 – 18:00", activity: "Free Time" },
      { time: "18:00 – 19:00", activity: "Dinner" },
      { time: "19:00 – 20:00", activity: "Business Plan and Pitch Work" },
    ],
  },
  {
    day: "Day 6", label: "Friday", shortLabel: "Fri", theme: "23 July – Friday", image: schedule6, imagePosition: "center 65%",
    items: [
      { time: "08:00 – 09:00", activity: "Breakfast in College" },
      { time: "09:00 – 10:00", activity: "Designing Your Future – Career Focused Session" },
      { time: "10:00 – 10:30", activity: "Tea/Coffee Break" },
      { time: "10:30 – 11:30", activity: "Building a Professional Digital Presence" },
      { time: "11:45 – 12:45", activity: "Time to Fine-Tune Presentations" },
      { time: "13:00 – 14:00", activity: "Lunch" },
      { time: "14:00 – 16:30", activity: "Business Plan Presentations to Expert Panel" },
      { time: "16:30", activity: "Programme Ends" },
      { time: "16:30 – 19:00", activity: "Free Time" },
      { time: "19:30 – 21:00", activity: "Dinner & Presentation of Certificates" },
    ],
  },
  {
    day: "Day 7", label: "Saturday", shortLabel: "Sat", theme: "24 July – Saturday", image: schedule7, imagePosition: "center 55%",
    items: [
      { time: "08:00 – 10:00", activity: "Breakfast and Final Goodbyes" },
      { time: "10:30", activity: "Check-out" },
    ],
  },
];
