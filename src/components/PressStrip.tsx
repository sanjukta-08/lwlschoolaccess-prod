import { PRESS, PRESS_WORDMARKS } from "@/lib/social-proof";

export function PressStrip() {
  return (
    <section id="press" className="scroll-mt-20 bg-wash px-5 py-14">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center font-serif text-[clamp(1.5rem,3.6vw,2rem)] font-medium">
          In the <em className="text-crimson-deep">press</em>
        </h2>
        <p className="mx-auto mt-2 max-w-[38em] text-center text-[0.9rem] text-ink-soft">
          Coverage of what happens when school students are mentored by university
          leaders - and asked to finish something.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-line py-5">
          {PRESS_WORDMARKS.map((w) => (
            <span
              key={w}
              className="font-serif text-[1.05rem] font-semibold tracking-tight text-ink-soft"
            >
              {w}
            </span>
          ))}
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRESS.map((a) => (
            <a
              key={a.publication + a.headline}
              href={a.url}
              target="_blank"
              rel="noopener"
              className="group flex flex-col rounded-2xl border border-line bg-paper p-5 no-underline shadow-soft transition-shadow hover:shadow-lift"
            >
              <span className="mono-label flex items-center gap-2 text-crimson">
                {a.publication}
                <span className="text-ink-faint">· {a.date}</span>
              </span>
              <h3 className="mt-2 font-serif text-[1.05rem] font-semibold leading-snug text-ink">
                {a.headline}
              </h3>
              <span className="mt-auto pt-4 text-[0.8rem] font-semibold text-crimson">
                Read the article
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  {" →"}
                </span>
              </span>
              {a.placeholder ? (
                <span className="mono-label mt-2 text-ink-faint">
                  Placeholder - link to be updated
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
