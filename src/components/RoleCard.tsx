import { Link } from "@tanstack/react-router";
import { Briefcase, Check, Clock, MapPin, User } from "lucide-react";
import type { Role } from "@/lib/internships";

export function RoleCard({ role }: { role: Role }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper shadow-soft">
      <div className="border-b border-line bg-gradient-to-r from-wash-deep to-paper px-6 py-5 sm:px-8 sm:py-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mono-label rounded-full bg-crimson/10 px-2.5 py-1 text-crimson">
            {role.team}
          </span>
          <span className="mono-label rounded-full bg-gold/12 px-2.5 py-1 text-gold">
            {role.type}
          </span>
        </div>
        <h2 className="font-serif text-[clamp(1.15rem,2.4vw,1.5rem)] font-semibold leading-tight">
          {role.title}
        </h2>
        <div className="mt-3 flex flex-wrap gap-3 text-[0.82rem] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            {role.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-gold" />
            Reports to {role.reportsTo}
          </span>
          {role.duration ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold" />
              {role.duration}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-gold" />
              Full Time
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-6 py-6 sm:px-8 sm:py-7 md:flex-row md:gap-10">
        <div className="flex-1">
          <h3 className="mono-label mb-3 text-ink-faint">About the role</h3>
          <p className="text-[0.92rem] leading-relaxed text-ink-soft">{role.about}</p>
        </div>
        <div className="flex-1">
          <h3 className="mono-label mb-3 text-ink-faint">What you&apos;ll do</h3>
          <ul className="space-y-2">
            {role.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[0.9rem] text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 flex-none text-crimson" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-t border-line px-6 py-6 sm:px-8 sm:py-7 md:flex-row md:items-start md:gap-10">
        <div className="flex-1">
          <h3 className="mono-label mb-3 text-ink-faint">What we&apos;re looking for</h3>
          <ul className="space-y-2">
            {role.requirements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[0.9rem] text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 flex-none text-crimson" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-5 rounded-2xl border border-gold-line bg-gold-soft/40 p-5">
          <div>
            <h3 className="mono-label mb-1 text-gold-deep">Compensation</h3>
            <p className="text-[0.95rem] font-medium text-ink">{role.compensation}</p>
          </div>
          <Link
            to="/internships/apply"
            search={{ role: role.id }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 text-[0.92rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
          >
            Apply for this role
          </Link>
        </div>
      </div>
    </article>
  );
}
