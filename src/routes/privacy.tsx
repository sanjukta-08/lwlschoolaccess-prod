import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";

const TITLE = "Privacy Policy | Learn with Leaders";
const DESC =
  "How Learn with Leaders handles information on lwlschoolaccess.com: quiz answers, saved programmes, Compass messages, advisor bookings, local storage and your choices.";
const URL = "https://lwlschoolaccess.com/privacy";
const EMAIL = "team@learnwithleaders.com";
const PARTNER_SITES = [
  "apply.learnwithleaders.com",
  "futuredoctorsprogram.com",
  "futurelawyersprogram.com",
  "sirluthercenter.com",
  "joinfinlit.com",
  "joinonwards.com",
  "purposeplaybook.ai",
  "satinstinct.com",
  "thresholdeo.com",
  "studentform.ivycomp.com",
  "studentform.ivyolympiad.com",
];

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: PrivacyPage,
});

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className="text-crimson underline">
    {children}
  </a>
);

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        Learn with Leaders runs this website, lwlschoolaccess.com, to help families and schools
        find live programmes, competitions, camps and conferences for students in Grades 5–12.
        When this policy says "we" or "us", it means Learn with Leaders.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Fit quiz answers.</strong> Your answers (such as grade and interests) appear in
            the page address. To suggest matches, they are sent to our server and an AI service.
            We don't save them.
          </li>
          <li>
            <strong>Programme Finder filters.</strong> These are kept in the page address only, so
            you can bookmark or share a search.
          </li>
          <li>
            <strong>Saved programmes.</strong> Your shortlist is stored in your own browser, not on
            our servers. If you choose to share it, the list is encoded into the link you send.
          </li>
          <li id="compass" className="scroll-mt-28">
            <strong>Messages to Compass.</strong> What you type to our Compass assistant is sent
            to our server and to an AI service to write a reply. We store the conversation and how
            you reached the site (for example, the campaign link you used). If you choose to leave
            your name and contact details so an advisor can follow up, we store those too.
          </li>
          <li>
            <strong>Advisor calls.</strong> If you book a call, you enter your details directly on
            Calendly, which shares the booking with us.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Visit information.</strong> We record the pages you view, the website that sent
            you, and basic device and browser details. This is linked to a random visitor ID kept
            in your browser, and to the campaign tags in the link you arrived on (such as
            utm_source or an ad click ID).
          </li>
          <li>
            <strong>Usage limits.</strong> To stop misuse of Compass and the fit quiz, we keep a
            scrambled (hashed) form of your internet address for a short time. We don't store the
            address itself.
          </li>
        </ul>
        <p>We don't use Google Analytics, Meta Pixel, Hotjar or any advertising trackers on this site.</p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: (
      <ul>
        <li>To match students with suitable programmes.</li>
        <li>To keep your shortlist and reminders on your device.</li>
        <li>To answer questions and follow up when you ask us to.</li>
        <li>To arrange advisor calls.</li>
        <li>
          To understand which pages and campaigns are helpful, so we can improve the site. We
          also carry the campaign tags from your visit onto our application pages, so we know how
          you found us.
        </li>
      </ul>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's privacy",
    body: (
      <>
        <p>
          Our programmes are for students in Grades 5–12, and many are under 18. For students
          under 18, we ask that a parent or guardian provides information and makes any bookings.
        </p>
        <p>
          We don't knowingly collect personal information from children without a parent's
          involvement. Parents can contact us at any time to review or delete their child's
          information.
        </p>
      </>
    ),
  },
  {
    id: "student-stories",
    title: "Student stories, testimonials and media",
    body: (
      <p>
        Names, photos, videos, handwritten notes, quotes and social posts that students and
        families share with us are published on this site with their consent. Any student or
        parent can ask us to remove their content, and we'll handle the request promptly.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    body: (
      <>
        <p>
          The site uses or links to the services below. Each has its own privacy policy, which
          applies to what you do there.
        </p>
        <ul>
          <li>
            <strong>Calendly</strong>: booking advisor calls.
          </li>
          <li>
            <strong>Lovable</strong>: hosts this website and provides the AI service behind
            Compass and the fit quiz. Through Lovable, Compass messages are processed by an
            OpenAI model and fit quiz answers by a Google Gemini model.
          </li>
          <li>
            <strong>Supabase</strong>: our database, which holds the programme catalogue, Compass
            conversations, and visit records.
          </li>
          <li>
            <strong>Google Fonts</strong>: some page fonts load from Google.
          </li>
          <li>
            <strong>Google Drive and Vimeo</strong>: some videos and their preview images.
          </li>
          <li>
            <strong>LinkedIn and Instagram</strong>: links to student stories and posts.
          </li>
          <li>
            <strong>WhatsApp</strong>: only if you choose to share a Compass summary.
          </li>
        </ul>
        <p>
          The "Apply", "Reserve a free seat" and payment pages are not on this site. Each of the
          following websites has its own privacy policy, which applies to anything you enter
          there:
        </p>
        <ul>
          {PARTNER_SITES.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "cookies-and-local-storage",
    title: "Cookies and local storage",
    body: (
      <>
        <p>
          This site doesn't set advertising or tracking cookies. Instead, it saves a few small
          items in your browser:
        </p>
        <ul>
          <li>your saved shortlist;</li>
          <li>a random visitor ID and the campaign tags from your first visit;</li>
          <li>
            for the current tab only, your visit's session ID, its campaign tags and your Compass
            conversation.
          </li>
        </ul>
        <p>
          These stay on your device. You can clear them at any time through your browser settings.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing your information",
    body: (
      <p>
        We don't sell personal information. We share it only with the service providers listed
        above, as needed to run the site and our programmes, or where the law requires it.
      </p>
    ),
  },
  {
    id: "international-users",
    title: "International users",
    body: (
      <p>
        We serve families in the Gulf, India, Southeast Asia, the UK and Europe, and North
        America. Your information may be processed in a country other than your own.
      </p>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep information",
    body: (
      <p>
        At the moment we have no automatic deletion schedule for Compass conversations, contact
        details left in Compass, page-view and visitor-ID records, or scrambled internet
        addresses. They are kept until we delete them or you ask us to. You can ask us to delete
        your information at any time using the details in "Contact us".
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <p>
        You can ask to see, correct or delete your information, or withdraw your consent.
        Parents can do this for their children. Your rights may vary depending on the country you
        live in.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We take reasonable steps to protect your information. No online service can promise
        complete security.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we update this policy, we'll post the new version on this page with a new "Last
        updated" date.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "Contact us",
    body: (
      <p>
        For any privacy question or request, email{" "}
        <a href={`mailto:${EMAIL}`} className="text-crimson underline">
          {EMAIL}
        </a>
        , or <A href={CALENDLY_BOOKING_URL}>talk to an advisor</A>. You can also visit{" "}
        <A href="https://www.learnwithleaders.com/">learnwithleaders.com</A>.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <>
      <main className="page-shell py-12 md:py-16">
        <div className="mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[220px_minmax(0,760px)]">
          <aside className="lg:order-none">
            <details className="rounded-2xl border border-line bg-paper p-4 lg:hidden">
              <summary className="cursor-pointer font-semibold text-ink">On this page</summary>
              <Toc />
            </details>
            <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
              <span className="mono-label text-gold">On this page</span>
              <Toc />
            </nav>
          </aside>
          <article className="privacy-prose max-w-[760px] text-ink-soft">
            <h1 className="text-4xl font-bold text-ink md:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-ink-faint">Last updated: 8 October 2026</p>
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2>
                  <a href={`#${s.id}`} className="text-ink no-underline hover:text-crimson">
                    {s.title}
                  </a>
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Toc() {
  return (
    <ol className="mt-3 flex flex-col gap-1.5 text-[0.85rem]">
      {SECTIONS.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="text-ink-soft no-underline hover:text-crimson">
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
