import { motion } from "framer-motion";
import { CalendarCheck, Utensils, PlaneTakeoff, CircleDollarSign, Users, FileCheck, Mail } from "lucide-react";
const sectionDivider = "/__l5e/assets-v1/a6736cfe-d234-422e-b06a-a7db5168f766/section-divider.jpg";

const termItems = [
  { icon: CalendarCheck, text: "The check-in date at the allocated college accommodation is 18 July 2027 (2:00 PM) and check-out would be 24 July 2027 (10:00 AM)." },
  { icon: Utensils, text: "On 18 July, the fee includes dinner only. From 21 July, all three meals - breakfast, lunch, and dinner - are covered. On 24 July, only breakfast is provided." },
  { icon: PlaneTakeoff, text: "The fee covers airport pickup on 18 July 2027 and airport drop off on 24 July 2027. (The exact pick-up location to be confirmed closer to the programme dates)." },
  { icon: CircleDollarSign, text: "The fee does not cover airfare, visa charges, or individual expenses like sightseeing, travel on account of personal reasons, and any other expenses not directly related to the programme." },
  { icon: Users, text: "In the case of a teacher or guardian accompanying a group of students, they are permitted to drop off the students at the campus. However, classroom access during the programme will be limited to the registered participants only." },
  { icon: FileCheck, text: "Students are responsible for obtaining any necessary visas or permits required to enter and stay in the United Kingdom for the entire duration of the programme, if applicable. It is essential to ensure all visa requirements are fulfilled well in advance of the programme start date." },
  { icon: Mail, text: "Once the student completes the fee payment, an invitation letter would be shared with the student to support the visa application process." },
];

const TermsSection = () => (
  <>
    {/* Divider image */}
    <div className="w-full h-[350px] md:h-[500px] overflow-hidden">
      <img
        src={sectionDivider}
        alt="Students at the programme"
        className="w-full h-full object-cover object-top"
      />
    </div>

    {/* Terms section */}
    <section id="terms" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Terms & <span className="italic text-[#c23b22]">Conditions</span>
          </h2>
        </motion.div>

        <div className="space-y-5">
          {termItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-5 border-b border-foreground/8 pb-5 last:border-b-0"
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-[#c23b22] text-white flex items-center justify-center mt-1">
                  <Icon size={20} />
                </span>
                <p className="text-foreground/80 font-body text-lg md:text-2xl leading-relaxed">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default TermsSection;
