import { Link } from "@tanstack/react-router";
import jojoAsset from "@/assets/future-careers/dr-jojo.jpg.asset.json";
import darkLogoAsset from "@/assets/future-careers/lwl-dark-logo.png.asset.json";
import lightLogoAsset from "@/assets/future-careers/lwl-light-logo.png.asset.json";
import birdAsset from "@/assets/future-careers/lwl-bird.png.asset.json";
import "@fontsource/source-sans-3/latin-400.css";
import "@fontsource/source-sans-3/latin-500.css";
import "@fontsource/source-sans-3/latin-600.css";
import "@fontsource/source-sans-3/latin-700.css";
import "@fontsource/source-serif-4/latin-400.css";
import "@fontsource/source-serif-4/latin-600.css";
import "@fontsource/source-serif-4/latin-400-italic.css";
import "@fontsource/source-serif-4/latin-600-italic.css";
import "@/components/school-leaders.css";

/** External booking page for leaders — not confirmed yet; empty keeps buttons on-page. */
const RESERVATION_URL = "";
const reserveProps = RESERVATION_URL
  ? { href: RESERVATION_URL, target: "_blank", rel: "noopener" }
  : { href: "#register" };

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="sl-kicker">
      <img src={birdAsset.url} alt="" />
      <span>{children}</span>
    </div>
  );
}

const decisions = [
  ["Policy", "An AI policy that staff and students can actually follow"],
  ["Assessment", "Assessment and academic integrity when every student has AI"],
  ["Staff", "What teachers need to learn first, and how to give them the time"],
  ["Data", "Student data, safeguarding and the tools already in your classrooms"],
  ["Parents", "What to tell parents, and what to ask of them"],
];

const checks = [
  "Do we have a written AI policy that staff and students have read?",
  "Is one named person responsible for AI in the school?",
  "Has every department checked how its assessments hold up?",
  "Do parents know the school's position on AI?",
];

const faqs = [
  ["Is it really free?", "Yes. There is no cost to attend."],
  ["Is this a sales session?", "No. It is an hour of teaching. At the end we offer a free 30-minute readiness conversation to any school that wants one."],
  ["Can my senior team join?", "Yes. Each person registers, and you score your school together."],
  ["Where does it happen?", "Live online on Zoom. You will receive the link by email after registering."],
  ["Will I get a certificate?", "Yes. Every leader who joins live receives a certificate of participation by email."],
  ["What if I cannot make it live?", "Register anyway and we will send the recording and the readiness check."],
];

const press = [
  ["https://www.chieflearningofficer.com/2024/05/02/learning-insights-jo-kearney-champions-impactful-science-based-learning/", "Chief Learning Officer →", "Learning Insights: Jo Kearney champions impactful, science-based learning · May 2024"],
  ["https://www.chieftalentofficer.co/2024/09/16/talent-insights-jojo-kearney-shapes-global-talent-management-with-communication-and-empathy/", "Chief Talent Officer →", "Talent Insights: Jojo Kearney shapes global talent management with communication and empathy · September 2024"],
  ["https://www.peoplefirsthrmagazine.com/viewinterview/jojo-o%E2%80%99driscoll-kearney", "Peoplefirst HR Magazine →", "Hot Seat interview"],
];

export function SchoolLeadersLanding() {
  return (
    <div className="sl-page">
      <header className="sl-header">
        <div className="sl-shell sl-header-inner">
          <Link to="/"><img src={darkLogoAsset.url} alt="Learn with Leaders" className="sl-logo" /></Link>
          <nav className="sl-nav" aria-label="Page sections">
            <a href="#about">About</a>
            <a href="#decisions">Five decisions</a>
            <a href="#check">Readiness check</a>
            <a href="#dr-jojo">Dr Jojo</a>
            <a href="#faq">FAQ</a>
            <a {...reserveProps} className="sl-btn sl-btn--sm">Reserve my place →</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="sl-hero">
          <div className="sl-shell">
            <div className="sl-hero-grid">
              <div className="sl-hero-copy">
                <Kicker>Free live masterclass · For school leaders</Kicker>
                <h1>Leading a School in the <em>Age of AI</em></h1>
                <div className="sl-lead">
                  <strong>Led by Dr Jojo O'Driscoll-Kearney</strong>
                  <span>Harvard Business Impact faculty · Hult Professor</span>
                </div>
                <p className="sl-summary">One clear hour for principals, deputy principals and senior leaders on the five AI decisions every school faces this year.</p>
                <div className="sl-actions">
                  <a {...reserveProps} className="sl-btn">Reserve my place →</a>
                  <a href="#check" className="sl-btn sl-btn--ghost">See the readiness check</a>
                </div>
                <ul className="sl-meta">
                  {["60 minutes", "Live online", "Bring your senior team", "Certificate of participation", "Recording sent to all who register"].map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
              <figure className="sl-hero-photo">
                <img src={jojoAsset.url} alt="Dr Jojo O'Driscoll-Kearney" />
                <figcaption>
                  <strong>Dr Jojo O'Driscoll-Kearney</strong>
                  <span>Former Chief Learning Officer, Majid Al Futtaim</span>
                </figcaption>
              </figure>
            </div>
            <dl className="sl-facts">
              {[["Date", "Tuesday 10 November 2026"], ["Time", "4:30 pm Irish time"], ["Learning mode", "Live online"], ["Audience", "Principals, deputies and senior leaders"], ["Fee", "Free"]].map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="sl-section">
          <div className="sl-shell sl-split">
            <div>
              <Kicker>Why now</Kicker>
              <h2 className="sl-title">AI is already in your school, <em>with or without a policy.</em></h2>
            </div>
            <div className="sl-prose">
              <p>Students and staff are using AI tools today. The questions reach your desk from teachers, parents and students at the same time, and each one needs a decision, not a discussion.</p>
              <p>This hour gives you a way to make those decisions, and a plan you can start the next morning.</p>
            </div>
          </div>
        </section>

        <section id="decisions" className="sl-section sl-section--tint">
          <div className="sl-shell">
            <Kicker>In 60 minutes</Kicker>
            <h2 className="sl-title">Five decisions every school leader <em>faces this year</em></h2>
            <div className="sl-decisions">
              {decisions.map(([tag, text], i) => (
                <div className="sl-decision" key={tag}>
                  <div className="sl-num">0{i + 1}</div>
                  <div className="sl-tag">{tag}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="check" className="sl-section sl-section--dark">
          <div className="sl-shell sl-split">
            <div>
              <Kicker>The AI readiness check</Kicker>
              <h2 className="sl-title">Score your school on ten questions, <em>live.</em></h2>
              <p className="sl-check-lead">You answer yes or no during the session and keep the page. It shows you where to start on Wednesday morning.</p>
            </div>
            <ol className="sl-checklist">
              {checks.map((c) => <li key={c}><span className="sl-box" aria-hidden="true" />{c}</li>)}
              <li className="sl-more">And six more, on one page</li>
            </ol>
          </div>
        </section>

        <section id="dr-jojo" className="sl-section">
          <div className="sl-shell sl-split">
            <div>
              <Kicker>Your masterclass lead</Kicker>
              <blockquote className="sl-quote">"Teachers rarely doubt their subject. They very often doubt their power."</blockquote>
              <div className="sl-byline">
                <img src={jojoAsset.url} alt="" />
                <div><strong>Dr Jojo O'Driscoll-Kearney</strong><span>Harvard Business Impact faculty · Hult Professor</span></div>
              </div>
            </div>
            <div className="sl-prose">
              <p>Dr Jojo O'Driscoll-Kearney is an Irish leadership educator with more than twenty years of experience across five continents. She has trained more than 50,000 leaders worldwide.</p>
              <div className="sl-roles">
                <div><strong>Majid Al Futtaim</strong><span>Former Chief Learning Officer</span></div>
                <div><strong>Meta</strong><span>Led global learning</span></div>
              </div>
            </div>
          </div>
          <ul className="sl-shell sl-creds">
            {["PhD Leadership", "Oxford MBA-F", "Harvard Org. Psychology", "WEF Council Member"].map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        <section id="watch" className="sl-section sl-section--tint">
          <div className="sl-shell">
            <Kicker>Watch and read</Kicker>
            <h2 className="sl-title">Dr Jojo <em>in conversation</em></h2>
            <div className="sl-watch">
              <a className="sl-video" href="https://www.youtube.com/watch?v=ZBnrvbMuM5U" target="_blank" rel="noopener">
                <div className="sl-thumb">
                  <img src={jojoAsset.url} alt="" />
                  <span className="sl-play"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
                </div>
                <div className="sl-video-text">
                  <strong>Change Ecosystems, Rapid Reskilling, and Leaders of the Future</strong>
                  <span>iVentiv interview with Jay Moore, former Chief Learning Officer at GE · Watch on YouTube →</span>
                </div>
              </a>
              <div className="sl-press">
                <div className="sl-label">Featured in</div>
                {press.map(([href, name, desc]) => (
                  <a key={href} href={href} target="_blank" rel="noopener"><strong>{name}</strong><span>{desc}</span></a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sl-section">
          <div className="sl-shell sl-cards">
            <div className="sl-card">
              <div className="sl-label">You leave with</div>
              <h2>A plan, not a slide deck</h2>
              <ul className="sl-ticks">
                <li>The one-page AI readiness check, scored for your school</li>
                <li>A 90-day plan template</li>
                <li>A certificate of participation</li>
              </ul>
            </div>
            <div className="sl-card">
              <div className="sl-label">Who it is for</div>
              <h2>The people who decide</h2>
              <p>Principals, deputy principals, assistant principals and the colleague who leads on digital learning. Register together and score your school as a team.</p>
            </div>
            <div className="sl-card sl-card--accent">
              <div className="sl-label">For your students</div>
              <h2>Future Careers in the Age of AI</h2>
              <p>Ten days later, Dr Jojo runs a free masterclass for your students in Grades 8 to 12, on Friday 20 November at 4:30 pm.</p>
              <Link to="/masterclass/students/age-of-ai">See the student masterclass →</Link>
            </div>
          </div>
        </section>

        <section id="faq" className="sl-section sl-section--tint">
          <div className="sl-shell sl-split">
            <div>
              <Kicker>Frequently asked questions</Kicker>
              <h2 className="sl-title">Good to <em>know</em></h2>
            </div>
            <div className="sl-faq">
              {faqs.map(([q, a]) => (
                <div key={q}><h3>{q}</h3><p>{a}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="register" className="sl-section sl-section--dark">
          <div className="sl-shell sl-register">
            <Kicker>Reserve your place</Kicker>
            <h2 className="sl-title">One hour now saves a year of <em>deciding late.</em></h2>
            <div className="sl-when">
              <span>Tuesday 10 November 2026</span>
              <span>4:30 pm to 5:30 pm Irish time</span>
              <span>Live online · Free</span>
            </div>
            <a {...reserveProps} className="sl-btn sl-btn--light">Reserve my place →</a>
            <p className="sl-note">You will receive the join link by email after registering.</p>
          </div>
        </section>
      </main>

      <footer className="sl-footer">
        <div className="sl-shell sl-footer-grid">
          <div>
            <img src={lightLogoAsset.url} alt="Learn with Leaders" className="sl-logo" />
            <p>Running programmes for young people since 2004, with schools in over 100 countries.</p>
          </div>
          <div>
            <div className="sl-label">Why us</div>
            <Link to="/about">About Learn with Leaders</Link>
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/finder">Programme finder</Link>
          </div>
          <div>
            <div className="sl-label">Talk to us</div>
            <a href="mailto:team@learnwithleaders.com">team@learnwithleaders.com</a>
            <a href="https://calendly.com/learnwithleaders" target="_blank" rel="noopener">Book a call</a>
            <a href="https://www.learnwithleaders.com" target="_blank" rel="noopener">www.learnwithleaders.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
