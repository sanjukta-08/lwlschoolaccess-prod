import { Link } from "@tanstack/react-router";
import { datesLabel, type Camp } from "@/lib/camps";

/**
 * "Heritage residency" camp card: tall campus photograph, mono location stamp,
 * serif title, then the facts a parent scans for (dates, length, grade band).
 */
export function CampCard({ camp }: { camp: Camp }) {
  const dated = Boolean(camp.cohorts[0]?.start);
  return (
    <Link
      to="/camps/$slug"
      params={{ slug: camp.slug }}
      className="group block rounded-md border border-line bg-paper p-4 shadow-soft transition-all duration-150 no-underline hover:-translate-y-[3px] hover:border-gold-line hover:shadow-lift"
    >
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-sm border border-line bg-wash">
        <img
          src={camp.image}
          alt={`${camp.host} campus, ${camp.city}`}
          loading="lazy"
          width={900}
          height={560}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span className="mono-label absolute top-4 left-4 bg-paper/90 px-2 py-1 text-[0.6rem] font-bold text-crimson backdrop-blur-sm">
          {camp.city}, {camp.country}
        </span>
        {!dated ? (
          <span className="mono-label absolute top-4 right-4 bg-ink/75 px-2 py-1 text-[0.6rem] text-paper backdrop-blur-sm">
            Dates soon
          </span>
        ) : null}
      </div>

      <div className="space-y-2.5">
        <div className="flex items-end justify-between gap-3">
          <span className="mono-label truncate text-ink-faint">{camp.host}</span>
          <span className="text-[0.72rem] font-bold whitespace-nowrap text-ink">
            {camp.gradeBand}
          </span>
        </div>

        <h3 className="font-serif text-[1.45rem] leading-tight font-medium text-ink transition-colors group-hover:text-crimson">
          {camp.name}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] font-semibold">
          <span className={dated ? "text-ink-soft" : "text-gold-deep"}>
            {datesLabel(camp)}
          </span>
          <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
          <span className="text-ink-soft">{camp.durationLabel}</span>
        </div>

        <p className="text-[0.88rem] leading-relaxed text-ink-soft italic">{camp.promise}</p>

        <span className="mono-label inline-flex w-full items-center justify-end gap-2 pt-2 text-crimson transition-all group-hover:gap-3.5">
          Explore camp <span aria-hidden>&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

export function CampCardGrid({ camps }: { camps: Camp[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {camps.map((c) => (
        <CampCard key={c.slug} camp={c} />
      ))}
    </div>
  );
}
