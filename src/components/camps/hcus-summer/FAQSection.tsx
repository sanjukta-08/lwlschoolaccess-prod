import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQSchema } from "@/components/seo/FAQSchema";

const faqs = [
  {
    q: "What is the HCUS Summer Camp?",
    a: "The Harvard College Union Society (HCUS) Young Global Leaders Program is a week-long summer camp designed for students to develop leadership, critical thinking, public speaking, and teamwork skills through hands-on projects, workshops, and mentorship from Harvard students.",
  },
  {
    q: "Where is the camp held?",
    a: "The camp takes place at Harvard University, with participants staying at Cambria Hotel Boston Somerville.",
  },
  {
    q: "What are the program dates?",
    a: "There are three batches:\n• Batch 1: June 21 – June 28, 2026\n• Batch 2: June 28 – July 5, 2026\n• Batch 3: July 5 – July 12, 2026",
  },
  {
    q: "Who is eligible to apply?",
    a: "Students in Grades 8–12 (School Years 9–13) from around the world are eligible to participate.",
  },
  {
    q: "What is the application deadline?",
    a: "Application Deadline: May 30th, 2026.",
  },
  {
    q: "What is included in the program fee?",
    a: "The fee covers:\n• Academic sessions and workshops\n• Accommodation for 7 nights and 8 days\n• All meals during the program (except travel days)\n• Airport transfers\n• Harvard campus tour and field trips",
  },
  {
    q: "What is not included in the fee?",
    a: "The fee does not cover airfare, visa fees, personal expenses, or additional sightseeing beyond the program itinerary.",
  },
  {
    q: "Is there a refund policy?",
    a: "Refund requests are accepted until May 28, 2026. No refunds will be processed after this date.",
  },
  {
    q: "What activities are included in the camp?",
    a: "The camp includes:\n• Workshops on leadership, public speaking, debate, and teamwork\n• Panel discussions with industry experts\n• Harvard campus tour and cultural visits\n• Group projects and presentations\n• A closing ceremony with certificates",
  },
  {
    q: "Who will be the mentors?",
    a: "The program is led by student mentors from Harvard College Union Society, who guide participants through various leadership activities.",
  },
  {
    q: "Will participants receive a certificate?",
    a: "Yes! Upon successful completion, students will receive a certificate from Harvard College Union Society.",
  },
  {
    q: "Are field trips included?",
    a: "Yes. Possible outings include:\n• Harvard University Tour\n• MIT Campus Visit\n• Museum of Fine Arts, Boston\n• A Baseball Game at Fenway Park",
  },
  {
    q: "Where will students stay?",
    a: "Participants will stay at Cambria Hotel Boston Somerville, located close to Harvard University.",
  },
  {
    q: "Are airport transfers provided?",
    a: "Yes. Transfers from the Boston Logan International airport to the hotel and back are included only on the check-in and check-out days respectively. If students arrive earlier than the check-in day or leave later than the check-out day, they will need to make their own airport transfer arrangements.",
  },
  {
    q: "Can parents or guardians accompany students?",
    a: "Yes, but they will not have access to classrooms or program activities. Parents/guardians can opt for:\n• Twin-sharing room: $2,500 USD\n• Single occupancy room: $3,500 USD",
  },
  {
    q: "How can I apply?",
    a: "You can apply via the website, www.hcusociety.com or scan the QR code in the camp brochure.",
  },
  {
    q: "Is this program officially affiliated with Harvard University?",
    a: "No. The program is organized by Harvard College Union Society, an independent student-run organization. It is not officially provided or endorsed by Harvard University.",
  },
  {
    q: "How can I contact the camp organizers?",
    a: "You can reach out at team@learnwithleaders.com or visit www.learnwithleaders.com.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-24 px-4 bg-[#f7f1e8]">
    <FAQSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[#9b1c1c] font-body text-sm tracking-[0.3em] uppercase mb-4">Have Questions?</p>
        <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#0f1a2b]">
          Frequently Asked Questions
        </h2>
        <div className="w-16 h-0.5 bg-[#9b1c1c] mx-auto mt-4" />
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-none rounded-md overflow-hidden bg-[#9b1c1c] data-[state=open]:bg-[#7a1414]"
          >
            <AccordionTrigger className="font-body font-semibold text-white text-left px-6 py-4 hover:no-underline [&>svg]:text-white">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="bg-white px-6 py-5">
              <p className="text-[#0f1a2b] font-body text-sm leading-relaxed whitespace-pre-line">{f.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
