import { motion } from "framer-motion";
import { Puzzle, BarChart3, Users2, Target, MapPin, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const obj1 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/b3988ca6-8171-4f83-a4a1-3111f20a99bc/objectives-1.jpg";
const obj2 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/0ac2141f-88dc-4ac7-af91-8e52a181436e/objectives-2.jpg";
const obj3 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/4a529745-9693-439c-97e3-b40c49f9e514/objectives-3.jpg";
const obj4 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/4548f844-7b7e-4c3f-b5e3-6851cb5bd99e/objectives-4.jpg";
const obj5 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/c0ad1366-7330-4e69-b639-4c09fc70f64d/objectives-5.jpg";
const obj6 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/48042b39-27fe-4c96-91e7-5ffabf4453fd/objectives-6.jpg";

interface Objective {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const objectives: Objective[] = [
  {
    icon: Puzzle,
    title: "Problem Solving & Creative Thinking",
    description:
      "Understanding problem-solving techniques and fostering creative thinking, explore the concept of innovation and the innovation process.",
    image: obj1,
  },
  {
    icon: BarChart3,
    title: "Core Business Skills",
    description:
      "Developing essential business skills including business plan creation and financial awareness.",
    image: obj2,
  },
  {
    icon: Users2,
    title: "Personal Leadership & Influencing Skills",
    description:
      "Enhance influencing skills for effective leadership, cultivate teamwork skills and gain confidence in communicating and pitching ideas.",
    image: obj3,
  },
  {
    icon: Target,
    title: "Setting SMART Goals",
    description:
      "Learn how to set SMART goals and take action, understand how to give and receive feedback effectively.",
    image: obj4,
  },
  {
    icon: MapPin,
    title: "Extracurricular Activities",
    description:
      "Engage in cultural activities and field visits such as Cambridge Tour, Punting, King's College Chapel, and visiting world-famous museums.",
    image: obj5,
  },
  {
    icon: UserCheck,
    title: "Mentorship & Networking",
    description:
      "Guest speaker sessions and sessions with Cambridge University students will provide opportunities to learn about student life and routes to studying in Cambridge.",
    image: obj6,
  },
];

const ObjectivesSection = () => (
  <section id="programme" className="py-20 bg-cambridge-rust relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_hsl(0_0%_100%_/_0.06),_transparent_70%)] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_hsl(0_0%_0%_/_0.08),_transparent_70%)] pointer-events-none" />

    <div className="container mx-auto px-4 lg:px-8">
      {/* Header */}
      <div className="border-b border-white/20 pb-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05]">
            Programme
            <br />
            <span className="text-cambridge-cream italic">Learning Objectives</span>
          </h2>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {objectives.map((obj, i) => {
          const Icon = obj.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-lg overflow-hidden"
            >
              <img src={obj.image} alt={obj.title} className="w-full h-52 object-cover" />
              <div className="p-4 bg-white">
                <div className="flex items-center gap-2">
                  <Icon size={18} className="text-[#c23b22]" />
                  <h3 className="text-lg font-display font-bold text-[#c23b22]">{obj.title}</h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

    <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </section>
);

export default ObjectivesSection;
