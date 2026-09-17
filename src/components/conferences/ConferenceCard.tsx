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
    <article className="group overflow-hidden border border-white/10 bg-[#10141b] transition-transform duration-300 hover:-translate-y-1">
      <Link
        to="/conferences/$slug"
        params={{ slug: conferenceSlugOf(conference) }}
        className="block h-full text-white no-underline"
      >
        <div className="aspect-[4/3] overflow-hidden bg-black">
          <img
            src={conferenceImage(conference)}
            alt={`${conference.name} conference`}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#d2a84a]">Harvard WorldMUN</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h2 className="text-[1.35rem] leading-tight font-semibold text-white">
              {conference.name}
            </h2>
            <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-[#d2a84a]" aria-hidden />
          </div>
          <p className="mt-3 line-clamp-2 text-[0.86rem] leading-relaxed text-white/55">
            {conference.tag || conference.about}
          </p>
          <div className="mt-5 grid gap-2 border-t border-white/10 pt-4 text-[0.78rem] text-white/60">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#d2a84a]" aria-hidden />
              {conferenceDateLabel(conference)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#d2a84a]" aria-hidden />
              {conferenceLocation(conference)} · {conferenceGrades(conference)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}