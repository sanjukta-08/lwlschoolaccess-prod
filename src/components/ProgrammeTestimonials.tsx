import { ratingFor, testimonialsFor } from "@/lib/programme-proof";
import type { Programme } from "@/lib/programmes";

export function ProgrammeTestimonials({
  programme: p,
  color,
}: {
  programme: Programme;
  color: string;
}) {
  const quotes = testimonialsFor(p);
  const rating = ratingFor(p);
  const [featured, ...rest] = quotes;

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.84rem] text-ink-soft">
        <span className="text-[0.95rem]" style={{ color }} aria-hidden>
          ★★★★★
        </span>
        <b className="text-ink">{rating.value} / 5</b>
        <span>from {rating.count} family reviews collected after the programme</span>
      </div>

      {featured ? (
        <blockquote className="mt-5 rounded-[20px] border-l-4 bg-wash px-7 py-6" style={{ borderColor: color }}>
          <p className="font-serif text-[clamp(1.05rem,2.4vw,1.3rem)] leading-relaxed">
            “{featured.quote}”
          </p>
          <footer className="mt-3.5 text-[0.82rem] text-ink-faint">
            <b className="text-ink">{featured.name}</b> · {featured.role} · {featured.city}
          </footer>
        </blockquote>
      ) : null}

      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
        {rest.map((t) => (
          <figure
            key={t.quote}
            className="m-0 rounded-2xl border border-line bg-paper p-5 shadow-soft"
          >
            <span className="text-[0.85rem]" style={{ color }} aria-hidden>
              ★★★★★
            </span>
            <blockquote className="mt-2 text-[0.88rem] text-ink-soft">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-3 text-[0.79rem] text-ink-faint">
              <b className="text-ink">{t.name}</b> · {t.role} · {t.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
