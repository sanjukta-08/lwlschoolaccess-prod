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
    <div className={`group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-lg transition-all duration-300 ${disabled ? "cursor-default" : "hover:-translate-y-1 hover:border-[#f1b537]/50"}`}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={conferenceImage(conference)}
          alt={`${conference.name} conference`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Location badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <MapPin className="h-3 w-3 text-[#f1b537]" />
            {location}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white transition-colors group-hover:text-[#f1b537]">
          {conference.name}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-white/60">
          {conference.tag || conference.about}
        </p>

        {/* Starts on & Duration */}
        <div className="flex items-start gap-6 border-t border-white/10 pt-3">
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#f1b537]">Starts on</p>
            <p className="whitespace-nowrap text-sm font-medium text-white">
              {startsOn ?? "Dates to be announced"}
            </p>
          </div>
          {duration && (
            <div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#f1b537]">Duration</p>
              <p className="whitespace-nowrap text-sm font-medium text-white">{duration}</p>
            </div>
          )}
        </div>

        {/* Arrow */}
        {!disabled && (
          <div className="flex items-center pt-1">
            <ArrowRight className="h-4 w-4 text-white/50 transition-all group-hover:translate-x-1 group-hover:text-[#f1b537]" />
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
