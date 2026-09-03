import { Link } from "@tanstack/react-router";
import { datesLabel, type Camp } from "@/lib/camps";

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 p-3">
      <span className="mono-label text-[0.55rem] text-ink-faint">{label}</span>
      <span
        className={`text-[0.68rem] font-semibold tracking-wide uppercase ${
          accent ? "text-gold-deep" : "text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * "Ledger" camp card: portrait campus photo on the left, then a ruled fact
 * table (location / duration / schedule / grade band) and the promise line.
 */
export function CampCard({ camp }: { camp: Camp }) {
  const dated = Boolean(camp.cohorts[0]?.start);
  return (
    <Link
      to="/camps/$slug"
      params={{ slug: camp.slug }}
      className="group flex flex-col border border-line bg-paper no-underline shadow-soft transition-colors hover:border-gold-line md:flex-row"
    >
      <div className="h-56 w-full shrink-0 overflow-hidden border-b border-line bg-wash md:h-auto md:w-[270px] md:border-b-0 md:border-r">
        <img
          src={camp.image}
          alt={`${camp.host} campus, ${camp.city}`}
          loading="lazy"
          width={380}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-grow flex-col">
        <div className="border-b border-line p-4">
          <h3 className="font-serif text-[1.55rem] leading-[1.15] font-semibold tracking-tight text-ink transition-colors group-hover:text-crimson">
            {camp.name}
          </h3>

          <div className="mt-1.5 flex items-center justify-between gap-3">
            <span className="mono-label truncate text-gold-deep">{camp.host}</span>
            <span className="mono-label shrink-0 border border-line bg-[#fbfbf9] px-1.5 py-0.5 text-[0.55rem] text-ink-soft">
              {camp.season}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-line border-b border-line">
          <Cell label="Location" value={`${camp.city}, ${camp.country}`} />
          <Cell label="Duration" value={camp.durationLabel} />
        </div>
        <div className="grid grid-cols-2 divide-x divide-line border-b border-line">
          <Cell label="Schedule" value={datesLabel(camp)} accent={!dated} />
          <Cell label="Cohort" value={camp.gradeBand} />
        </div>

        <div className="flex flex-grow flex-col justify-between gap-3 bg-wash/40 p-4">
          <p className="text-[0.85rem] leading-snug text-ink-soft italic">{camp.promise}</p>
          <span className="mono-label inline-flex items-center gap-2 text-crimson transition-all group-hover:gap-3.5">
            Explore camp <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CampCardGrid({ camps }: { camps: Camp[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {camps.map((c) => (
        <CampCard key={c.slug} camp={c} />
      ))}
    </div>
  );
}
