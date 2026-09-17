import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import type { Programme } from "@/lib/programmes";
import {
  conferenceDateLabel,
  conferenceGrades,
  conferenceImage,
  conferenceLocation,
} from "@/lib/conferences";
import { conferenceSlugOf } from "@/lib/programme-slug";

export function ConferenceCard({ conference }: { conference: Programme }) {
  return (
    <article className="group overflow-hidden rounded-md border border-line bg-paper shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/conferences/$slug"
        params={{ slug: conferenceSlugOf(conference) }}
        className="block h-full text-ink no-underline"
      >
        <div className="aspect-[4/3] overflow-hidden bg-wash">
          <img
            src={conferenceImage(conference)}
            alt={`${conference.name} conference`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>
        <div className="p-5">
          <p className="mono-label text-crimson">Harvard WorldMUN</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h2 className="font-serif text-[1.35rem] leading-tight font-semibold text-ink">
              {conference.name}
            </h2>
            <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-gold" aria-hidden />
          </div>
          <p className="mt-3 line-clamp-2 text-[0.86rem] leading-relaxed text-ink-soft">
            {conference.tag || conference.about}
          </p>
          <div className="mt-5 grid gap-2 border-t border-line pt-4 text-[0.78rem] text-ink-soft">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold" aria-hidden />
              {conferenceDateLabel(conference)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" aria-hidden />
              {conferenceLocation(conference)} · {conferenceGrades(conference)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}