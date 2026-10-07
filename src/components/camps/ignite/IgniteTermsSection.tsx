import { motion } from "framer-motion";

const termsData = [
  {
    number: 1,
    content: (
      <>
        <strong>Check-in</strong> at the allocated college accommodation is on the{" "}
        <strong>arrival day (2:00 PM)</strong> and <strong>check-out</strong> is on the{" "}
        <strong>departure day (10:00 AM)</strong>. Arrival is Sunday 18 July 2027 and departure is
        Saturday 24 July 2027.
      </>
    ),
  },
  {
    number: 2,
    content: (
      <>
        On the arrival day, the fee includes dinner only. From the second full day onwards, all
        three meals - breakfast, lunch, and dinner - are covered. On the departure day, only
        breakfast is provided.
      </>
    ),
  },
  {
    number: 3,
    content: (
      <>
        The fee covers airport pickup on the <strong>arrival day</strong> and airport drop off on
        the <strong>departure day</strong>. (The exact pick-up location and timings to be confirmed
        closer to the programme dates).
      </>
    ),
  },

  {
    number: 4,
    content: (
      <>
        The fee does not cover <strong>airfare, visa charges, or individual expenses</strong> like
        sightseeing, travel on account of personal reasons, and any other expenses not directly
        related to the programme.
      </>
    ),
  },
  {
    number: 5,
    content: (
      <>
        In the case of a teacher or guardian accompanying a group of students, they are permitted to
        drop off the students at the campus. However,{" "}
        <strong>
          classroom access during the programme will be limited to the registered participants only
        </strong>
        .
      </>
    ),
  },
  {
    number: 6,
    content: (
      <>
        <strong>
          Students are responsible for obtaining any necessary visas or permits required to enter
          and stay in the United Kingdom for the entire duration of the programme, if applicable.
        </strong>{" "}
        It is essential to ensure all visa requirements are fulfilled well in advance of the
        programme start date.
      </>
    ),
  },
  {
    number: 7,
    content: (
      <>
        Once the student completes the fee payment,{" "}
        <strong>
          an invitation letter would be shared with the student to support the visa application
          process
        </strong>
        .
      </>
    ),
  },
];

export const IgniteTermsSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-georgia font-bold text-[#8B1538] text-2xl md:text-3xl lg:text-4xl mb-10 uppercase tracking-wide"
        >
          TERMS AND CONDITIONS
        </motion.h2>

        {/* Terms List */}
        <motion.ol
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {termsData.map((term) => (
            <li key={term.number} className="flex gap-3">
              <span className="text-gray-900 font-bold shrink-0">{term.number}.</span>
              <p className="text-gray-700 leading-relaxed">{term.content}</p>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};
