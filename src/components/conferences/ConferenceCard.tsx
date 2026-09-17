import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import type { Programme } from "@/lib/programmes";
import {
  conferenceDateLabel,
  conferenceImage,
  conferenceLocation,
} from "@/lib/conferences";
import { conferenceSlugOf } from "@/lib/programme-slug";

/** Duration label derived from the live cohort start/end dates. */
function conferenceDuration(conference: Programme): string | null {
  const cohort = conference.cohorts[0];
  if (!cohort?.end || cohort.end === cohort.d) return null;
  const start = new Date(`${cohort.d}T00:00:00`).getTime();
  const end = new Date(`${cohort.end}T00:00:00`).getTime();
  const days = Math.round((end - start) / 86400000) + 1;
  if (!Number.isFinite(days) || days < 2) return null;
  return `${days} Days`;
}

export function ConferenceCard({
  conference,
  disabled,
}: {
  conference: Programme;
  disabled?: boolean;
}) {
  const location = conferenceLocation(conference);
  const startsOn = conference.cohorts[0] ? conferenceDateLabel(conference) : null;
  const duration = conferenceDuration(conference);

  const cardContent = (
    <div className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-soft transition-all duration-300 ${disabled ? "cursor-default" : "hover:-translate-y-0.5 hover:border-gold-line hover:shadow-lift"}`}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={conferenceImage(conference)}
          alt={`${conference.name} conference`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Location badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/92 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft backdrop-blur-sm">
            <MapPin className="h-3 w-3 text-gold-deep" aria-hidden />
            {location}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 font-serif text-[1.2rem] font-medium leading-tight text-ink transition-colors group-hover:text-crimson">
          {conference.name}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {conference.tag || conference.about}
        </p>

        {/* Starts on & Duration */}
        <div className="mt-auto flex items-start gap-6 border-t border-line pt-3">
          <div>
            <p className="mono-label mb-0.5 text-gold-deep">Starts on</p>
            <p className="whitespace-nowrap text-sm font-semibold text-ink">
              {startsOn ?? "Dates to be announced"}
            </p>
          </div>
          {duration && (
            <div>
              <p className="mono-label mb-0.5 text-gold-deep">Duration</p>
              <p className="whitespace-nowrap text-sm font-semibold text-ink">{duration}</p>
            </div>
          )}
        </div>

        {/* Arrow */}
        {!disabled && (
          <div className="flex items-center gap-1.5 pt-1">
            <span className="mono-label text-crimson">View conference</span>
            <ArrowRight className="h-4 w-4 text-crimson transition-transform group-hover:translate-x-1" aria-hidden />
          </div>
        )}
      </div>
    </div>
  );

  if (disabled) return <div>{cardContent}</div>;

  return (
    <Link to="/conferences/$slug" params={{ slug: conferenceSlugOf(conference) }}>
      {cardContent}
    </Link>
  );
}
