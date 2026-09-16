import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Who is eligible to apply for the programme?",
    a: "The programme is open to students aged 15–19 from around the world. No prior academic prerequisites are required, though a strong interest in learning and cross-cultural engagement is expected.",
  },
  {
    q: "What is the application deadline?",
    a: "Applications are accepted on a rolling basis until all seats are filled. We strongly recommend applying early to secure your place, as the programme has limited capacity.",
  },
  {
    q: "Is the programme conducted entirely in English?",
    a: "Yes, all lectures, workshops, and activities are conducted in English. Participants should have a working proficiency in English to fully benefit from the programme.",
  },
  {
    q: "What does the programme fee include?",
    a: "The fee covers college accommodation, meals (as outlined in the terms), airport transfers on designated dates, all academic sessions, materials, cultural activities, and a certificate of completion.",
  },
  {
    q: "Can parents or guardians stay on campus?",
    a: "Parents and guardians are welcome to drop off students at the campus. However, accommodation is provided only for registered participants, and classroom access is limited to enrolled students.",
  },
  {
    q: "What happens if my visa application is delayed or rejected?",
    a: "Upon fee payment, we issue an official invitation letter to support your visa application. If your visa is ultimately rejected, please contact our team immediately to discuss refund options based on our cancellation policy.",
  },
  {
    q: "Will students receive a certificate?",
    a: "Yes, all participants who complete the programme will receive an official certificate of participation from the programme, which can be a valuable addition to university applications.",
  },
  {
    q: "Is there a refund or cancellation policy?",
    a: "Yes, cancellations made more than 60 days before the programme start date are eligible for a partial refund. Cancellations within 60 days are non-refundable. Full details will be shared upon registration.",
  },
  {
    q: "How are students supervised during the programme?",
    a: "Students are supervised by experienced programme staff and mentors throughout the duration. There is 24/7 support available on campus, and all activities are guided by trained professionals.",
  },
  {
    q: "What should students bring with them?",
    a: "Students should bring appropriate clothing for the British summer (layers recommended), personal toiletries, any prescribed medication, a valid passport, and a positive attitude. A detailed packing list will be shared closer to the programme date.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24" style={{ backgroundColor: "#c23b22" }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Frequently Asked <span className="italic text-white/80">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left gap-4"
              >
                <span className="font-display font-semibold text-white text-base md:text-lg">
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-[#c23b22] transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 md:px-8 pb-6 text-white/70 font-body text-base md:text-lg leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
