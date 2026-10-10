import {
  CalendarDays,
  Clock3,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Monitor,
  Play,
  Scale,
  Tag,
  TrendingUp,
  Users, Award, Video } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import jojoAsset from "@/assets/future-careers/dr-jojo.jpg.asset.json";
import darkLogoAsset from "@/assets/future-careers/lwl-dark-logo.png.asset.json";
import lightLogoAsset from "@/assets/future-careers/lwl-light-logo.png.asset.json";
import birdAsset from "@/assets/future-careers/lwl-bird.png.asset.json";
import graduationGroupAsset from "@/assets/future-careers/graduation-group.jpg.asset.json";
import graduationStageAsset from "@/assets/future-careers/graduation-stage.png.asset.json";
import jojoRedAsset from "@/assets/future-careers/dr-jojo-red.jpg.asset.json";
import awardAsset from "@/assets/future-careers/award-ceremony.jpg.asset.json";
import schoolsClassAsset from "@/assets/future-careers/for-schools-classroom.png.asset.json";
import aiRobotAsset from "@/assets/future-careers/robot-friendly.png";
import "@fontsource/lato/latin-400.css";
import "@fontsource/lato/latin-700.css";
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-400-italic.css";
import "@/components/future-careers.css";

const RESERVATION_URL = "";

const outcomes = [
  "Explore how AI is reshaping major industries",
  "Discover emerging careers you have not heard of yet",
  "Learn which leadership skills AI cannot replace",
  "Put your questions to Dr Jojo live",
];

import { HANDWRITTEN_NOTES } from "@/lib/handwritten-notes";

function ReserveButton({ className = "" }: { className?: string }) {
  if (RESERVATION_URL) {
    return (
      <Button asChild className={`fc-btn ${className}`}>
        <a href={RESERVATION_URL}>Reserve my place →</a>
      </Button>
    );
  }

  return (
    <Button type="button" className={`fc-btn ${className}`} aria-disabled="true">
      Reserve my place →
    </Button>
  );
}

function Kicker({ children }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="fc-kicker">
      <img src={birdAsset.url} alt="" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="fc-detail">
      <div className="fc-detail-icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <div className="fc-detail-label">{label}</div>
        <div className="fc-detail-value">{value}</div>
      </div>
    </div>
  );
}

export function FutureCareersLanding() {
  // The hero robot stands in the bottom-right corner, so on this page the Compass
  // button moves to the opposite corner instead of standing on top of it.
  useEffect(() => {
    document.documentElement.classList.add("fc-campaign");
    return () => document.documentElement.classList.remove("fc-campaign");
  }, []);

  return (
    <div id="top" className="future-careers-page">
      <header className="fc-header">
        <div className="fc-shell fc-header-inner">
          <a href="#top" aria-label="Learn with Leaders, back to top">
            <img className="fc-header-logo" src={darkLogoAsset.url} alt="Learn with Leaders" />
          </a>
          <nav className="fc-nav" aria-label="Page sections">
            <a href="#about">About</a>
            <a href="#challenge">The challenge</a>
            <a href="#dr-jojo">Dr Jojo</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </nav>
          <ReserveButton />
        </div>
      </header>

      <main>
        <section className="fc-hero">
          <div className="fc-hero-bg" aria-hidden="true">
        <span className="fc-hero-halo" />
      </div>
          <div className="fc-shell fc-hero-inner">
            <div className="fc-hero-body">
              <div className="fc-hero-copy">
                <div className="fc-badge">
                  <span>Free live masterclass · Grades 8 to 12</span>
                </div>
                <h1>
                  <span>Future Careers in the</span>
                  <span>
                    <em>Age of AI</em>
                  </span>
                </h1>
                <div className="fc-hero-lead">Led by Dr Jojo O'Driscoll-Kearney</div>
                <div className="fc-hero-role">Harvard Business Impact faculty · Hult Professor</div>
                <p className="fc-hero-summary">
                  A 60-minute live session on how AI is reshaping work, the careers now emerging,
                  and the leadership skills you will need.
                </p>
                <div className="fc-hero-actions">
                  <ReserveButton />
                  <a className="fc-watch" href="#watch">
                    <span className="fc-play" aria-hidden="true">
                      <Play size={17} fill="currentColor" />
                    </span>
                    <span>Watch Dr Jojo</span>
                  </a>
                </div>
                <div className="fc-meta">
                  <span><Clock3 size={22} color="var(--fc-crimson)" />60 minutes</span>
                  <span><Monitor size={22} color="var(--fc-crimson)" />Live online</span>
                  <span><Users size={22} color="var(--fc-crimson)" />Parents welcome</span>
                  <span><Award size={22} color="var(--fc-crimson)" />Certificate of participation</span>
                  <span><Video size={22} color="var(--fc-crimson)" />Recording sent to all who register</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fc-hero-robot" aria-hidden="true">
            <img
              src={aiRobotAsset}
              alt=""
              width={1015}
              height={831}
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <section id="about" className="fc-section">
          <div className="fc-shell">
            <div className="fc-about-grid">
              <figure className="fc-photo fc-about-photo">
                <img
                  src={graduationGroupAsset.url}
                  alt="Learn with Leaders students in graduation gowns holding their certificates on stage in front of the Harvard crest"
                />
              </figure>
              <div className="fc-about-copy">
                <Kicker>Free live masterclass</Kicker>
                <h2 className="fc-title">About this <em>programme</em></h2>
                <p className="fc-body-copy">
                  A free, 60-minute live online masterclass for students in Grades 8 to
                  12, led by Dr Jojo O'Driscoll-Kearney, on how AI is reshaping work and the
                  leadership skills you will need. No prior AI knowledge needed.
                </p>
                <ReserveButton />
              </div>
            </div>
            <div className="fc-details-strip" aria-label="Masterclass details">
              <Detail icon={<CalendarDays size={20} />} label="Date" value="Friday 20 November 2026" />
              <Detail icon={<Clock3 size={20} />} label="Time" value="4:30 pm Irish time" />
              <Detail icon={<Monitor size={20} />} label="Learning mode" value="Live online, from home" />
              <Detail icon={<Users size={20} />} label="Audience" value="Grades 8 to 12" />
              <Detail icon={<Tag size={20} />} label="Fee" value="Free" />
            </div>
          </div>
        </section>

        <section id="why" className="fc-section fc-wash">
          <div className="fc-shell">
            <Kicker>Why this matters</Kicker>
            <div className="fc-why-head">
              <h2 className="fc-title">The jobs today's students will hold are being <em>rewritten now.</em></h2>
              <p className="fc-body-copy">
                Medicine, law, finance, engineering and entrepreneurship will all look different by
                the time they graduate. This session helps students see what is changing and where they fit.
              </p>
            </div>
            <div className="fc-why-grid">
              <figure className="fc-why-photo">
                <img
                  src={graduationStageAsset.url}
                  alt="A graduating class of Learn with Leaders students on stage with their certificates in front of the Harvard crest"
                />
              </figure>
              <div className="fc-industries">
              <div className="fc-industry"><span><HeartPulse /></span><strong>Medicine</strong></div>
              <div className="fc-industry"><span><Scale /></span><strong>Law</strong></div>
              <div className="fc-industry"><span><TrendingUp /></span><strong>Finance</strong></div>
              <div className="fc-industry"><span><GraduationCap /></span><strong>Engineering</strong></div>
              <div className="fc-industry"><span><Lightbulb /></span><strong>Entrepreneurship</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="fc-section">
          <div className="fc-shell">
            <Kicker>In 60 minutes</Kicker>
            <h2 className="fc-title">What you will <em>do</em></h2>
            <div className="fc-outcomes">
              {outcomes.map((outcome, index) => (
                <div className="fc-outcome" key={outcome}>
                  <div className="fc-outcome-number">{String(index + 1).padStart(2, "0")}</div>
                  <p>{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="challenge" className="fc-section fc-challenge">
          <div className="fc-shell fc-challenge-grid">
            <div className="fc-challenge-copy">
              <Kicker light>The challenge</Kicker>
              <h2>
                <span>Invent a career</span>
                <span>that <em>does not</em></span>
                <span><em>exist yet.</em></span>
              </h2>
              <p>Name it, and tell us the real-world problem it solves. You will get the chance to share your idea live.</p>
            </div>
            <div className="fc-career-wrap" aria-hidden="true">
              <div className="fc-career-card">
                <div className="fc-career-top"><span>Career card</span><img src={birdAsset.url} alt="" width="24" height="24" /></div>
                <div className="fc-career-field">Name it</div>
                <div className="fc-career-line">Your idea here</div>
                <div className="fc-career-field">The real-world problem it solves</div>
                <div className="fc-career-line" />
                <div className="fc-career-line" />
                <div className="fc-career-field">Share it live</div>
                <div className="fc-career-line fc-career-date">Friday 20 November</div>
              </div>
            </div>
          </div>
        </section>

        <section id="dr-jojo" className="fc-section">
          <div className="fc-shell">
            <Kicker>Your masterclass lead</Kicker>
            <h2 className="fc-title">Dr Jojo <em>O'Driscoll-Kearney</em></h2>
            <p style={{ marginTop: 14, fontSize: 20, fontWeight: 700 }}>
              Dean of Programmes, Learn with Leaders <span style={{ color: "var(--fc-muted)", fontWeight: 400 }}>· Harvard Business Impact faculty · Hult Professor</span>
            </p>
            <div className="fc-mentor-grid">
              <div className="fc-mentor-image-col">
                <div className="fc-mentor-image">
                  <img src={jojoRedAsset.url} alt="Portrait of Dr Jojo O'Driscoll-Kearney" />
                  <div className="fc-mentor-tag"><b>Dean of Programmes</b><span>Learn with Leaders</span></div>
                </div>
              </div>
              <div className="fc-mentor-copy">
                <div className="fc-quote-mark" aria-hidden="true">“</div>
                <blockquote>Young people don't need more lectures. They need someone to hand them the tools, name the problem, and step out of the way.</blockquote>
                <p className="fc-body-copy">Dr Jojo O'Driscoll-Kearney is an Irish leadership educator with more than twenty years of experience across five continents. She has trained more than 50,000 leaders worldwide.</p>
                <div className="fc-stats">
                  <div className="fc-stat"><strong>20+</strong><span>years of experience</span></div>
                  <div className="fc-stat"><strong>5</strong><span>continents</span></div>
                  <div className="fc-stat"><strong>50,000+</strong><span>leaders trained</span></div>
                </div>
                <div className="fc-history">
                  <div><b>Majid Al Futtaim</b><span>Former Chief Learning Officer</span></div>
                  <div><b>Meta</b><span>Led global learning</span></div>
                </div>
              </div>
            </div>
            <div className="fc-credentials">
              <span>PhD Leadership</span><span>Oxford MBA-F</span><span>Harvard Org. Psychology</span><span>WEF Council Member</span>
            </div>
          </div>
        </section>

        <section id="watch" className="fc-section fc-wash">
          <div className="fc-shell">
            <Kicker>Watch and read</Kicker>
            <h2 className="fc-title">Dr Jojo <em>in conversation</em></h2>
            <div className="fc-watch-grid">
              <div className="fc-video-col">
                <a className="fc-video" href="https://www.youtube.com/watch?v=ZBnrvbMuM5U" target="_blank" rel="noopener noreferrer" aria-label="Watch the iVentiv interview on YouTube">
                  <img src={jojoAsset.url} alt="" />
                  <span className="fc-play"><Play size={26} fill="currentColor" /></span>
                </a>
                <h3>Change Ecosystems, Rapid Reskilling, and Leaders of the Future</h3>
                <p>iVentiv interview with Jay Moore, former Chief Learning Officer at GE · <a href="https://www.youtube.com/watch?v=ZBnrvbMuM5U" target="_blank" rel="noopener noreferrer">Watch on YouTube →</a></p>
              </div>
              <div className="fc-featured">
                <div className="fc-featured-label">Featured in</div>
                <a className="fc-feature" href="#watch"><strong>Chief Learning Officer →</strong><span>Learning Insights: Jo Kearney champions impactful, science-based learning · May 2024</span></a>
                <a className="fc-feature" href="#watch"><strong>Chief Talent Officer →</strong><span>Talent Insights: Jojo Kearney shapes global talent management with communication and empathy · September 2024</span></a>
                <a className="fc-feature" href="#watch"><strong>Peoplefirst HR Magazine →</strong><span>Hot Seat interview</span></a>
                <a className="fc-feature" href="#watch"><strong>Harvard Extension School →</strong><span>Career Path Spotlight webinar: Consulting and Organizational Development</span></a>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="fc-section">
          <div className="fc-shell">
            <Kicker>Thank-you notes · Students</Kicker>
            <h2 className="fc-title fc-reviews-title">What students wrote <em>afterwards</em></h2>
            <p className="fc-body-copy fc-reviews-intro">Handwritten notes to Dr Jojo from students on her Communication & Leadership Programme.</p>
            <div className="fc-reviews-marquee">
              <div className="fc-reviews-track">
                {[...HANDWRITTEN_NOTES, ...HANDWRITTEN_NOTES].map((note, i) => (
                  <figure className="fc-review fc-note" key={`${note.id}-${i}`} aria-hidden={i >= HANDWRITTEN_NOTES.length}>
                    <img
                      className="fc-note-img"
                      src={note.src}
                      alt={`Handwritten thank-you note from ${note.name}`}
                      loading="lazy"
                    />
                    <figcaption><b>{note.name}</b><span>{note.programme}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="fc-section fc-wash">
          <div className="fc-shell fc-audiences">
            <div className="fc-audience">
              <img
                className="fc-audience-photo"
                src={awardAsset.url}
                alt="Dr Jojo receiving an award at the Majid Al Futtaim Leadership Development Programmes ceremony"
              />
              <div className="fc-audience-body">
                <div className="fc-audience-label">Who it is for</div>
                <h3>Students in Grades 8 to 12</h3>
                <p>No prior AI knowledge needed. Parents and guardians are welcome to join.</p>
              </div>
            </div>
            <div className="fc-audience">
              <img
                className="fc-audience-photo fc-audience-photo--class"
                src={schoolsClassAsset.url}
                alt="A teacher presenting to students with laptops in a modern classroom with a large wall screen"
              />
              <div className="fc-audience-body">
                <div className="fc-audience-label">For schools</div>
                <h3>Nothing for the school to organise</h3>
                <p>Share this page with your students and parents through your newsletter or school app. Students register individually and join from home.</p>
                <p>Questions: <a href="mailto:team@learnwithleaders.com">team@learnwithleaders.com</a></p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="fc-section">
          <div className="fc-shell fc-faq-grid">
            <div className="fc-faq-heading">
              <Kicker>Frequently asked questions</Kicker>
              <h2 className="fc-title">Good to <em>know</em></h2>
            </div>
            <div className="fc-faq-list">
              <div className="fc-faq"><h3>Is it really free?</h3><p>Yes. There is no cost to attend.</p></div>
              <div className="fc-faq"><h3>What do I need?</h3><p>A laptop or phone, and a notebook.</p></div>
              <div className="fc-faq"><h3>Where does it happen?</h3><p>Live online on Zoom. You will receive the link by email after registering.</p></div>
              <div className="fc-faq"><h3>Can parents join?</h3><p>Yes, parents and guardians are welcome.</p></div>
              <div className="fc-faq"><h3>Will I get a certificate?</h3><p>Yes. Every student who joins live receives a certificate of participation by email.</p></div>
              <div className="fc-faq"><h3>What if I cannot make it live?</h3><p>Register anyway and we will send the recording.</p></div>
            </div>
          </div>
        </section>

        <section className="fc-section fc-closing">
          <div className="fc-shell fc-closing-inner">
            <h2 className="fc-title">Your future career may not exist yet. <em>Come and imagine it.</em></h2>
            <p className="fc-closing-meta">Friday 20 November 2026 · 4:30 pm to 5:30 pm Irish time · Live online · Free</p>
            <ReserveButton />
          </div>
        </section>
      </main>

      <footer className="fc-footer">
        <div className="fc-shell fc-footer-grid">
          <div className="fc-footer-brand">
            <img src={lightLogoAsset.url} alt="Learn with Leaders" />
            <p>Running programmes for young people since 2004, with schools in over 100 countries.</p>
          </div>
          <div className="fc-footer-links">
            <b>Why us</b>
            <a href="https://www.learnwithleaders.com">About Learn with Leaders</a>
            <a href="https://www.learnwithleaders.com">Testimonials</a>
            <a href="https://www.learnwithleaders.com">Programme finder</a>
          </div>
          <div className="fc-footer-links">
            <b>Talk to us</b>
            <a href="mailto:team@learnwithleaders.com">team@learnwithleaders.com</a>
            <a href="https://www.learnwithleaders.com">Book a call</a>
            <a href="https://www.learnwithleaders.com">www.learnwithleaders.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}