import { internshipApplyUrl } from "@/lib/internship-apply";
import { ArrowRight, Briefcase, Clock, MapPin, User } from "lucide-react";
import type { Role } from "@/lib/internships";

function Meta({
  icon: Icon,
  label,
}: {
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[0.78rem] font-medium text-ink-soft">
      <Icon className="h-3.5 w-3.5 text-gold" />
      {label}
    </span>
  );
}

function NumberedList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h3 className="mono-label mb-4 text-ink-faint">{title}</h3>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-crimson/8 text-[0.68rem] font-bold text-crimson">
              {i + 1}
            </span>
            <span className="text-[0.9rem] leading-relaxed text-ink-soft">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RoleCard({ role }: { role: Role }) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-line bg-paper shadow-soft">
      {/* Header */}
      <header className="border-b border-line bg-gradient-to-br from-wash-deep via-paper to-gold-soft/30 px-6 py-7 sm:px-9 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3.5 flex flex-wrap items-center gap-2">
              <span className="mono-label rounded-full bg-crimson/10 px-2.5 py-1 text-crimson">
                {role.team}
              </span>
              <span className="mono-label rounded-full bg-gold/12 px-2.5 py-1 text-gold-deep">
                {role.type}
              </span>
            </div>
            <h2 className="font-serif text-[clamp(1.3rem,2.8vw,1.75rem)] font-semibold leading-tight tracking-tight">
              {role.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Meta icon={MapPin} label={role.location} />
              <Meta icon={User} label={`Reports to ${role.reportsTo}`} />
              {role.duration ? (
                <Meta icon={Clock} label={role.duration} />
              ) : (
                <Meta icon={Briefcase} label="Full Time" />
              )}
            </div>
          </div>

          <a
            href={internshipApplyUrl(role.id)}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex flex-none items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-[0.92rem] font-bold text-paper no-underline shadow-lift transition-colors hover:bg-crimson-deep"
          >
            Apply for this role
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* Body */}
      <div className="grid gap-0 lg:grid-cols-[1.55fr_1fr]">
        <div className="space-y-8 px-6 py-8 sm:px-9 lg:border-r lg:border-line">
          <div>
            <h3 className="mono-label mb-4 text-ink-faint">About the role</h3>
            <p className="max-w-[46em] text-[0.95rem] leading-relaxed text-ink-soft">{role.about}</p>
          </div>
          <div className="h-px bg-line" />
          <NumberedList title="What you'll do" items={role.responsibilities} />
        </div>

        <aside className="space-y-8 bg-wash/40 px-6 py-8 sm:px-9">
          <div>
            <h3 className="mono-label mb-4 text-ink-faint">What we&apos;re looking for</h3>
            <ul className="space-y-3">
              {role.requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[0.5rem] h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                  <span className="text-[0.9rem] leading-relaxed text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gold-line bg-gold-soft/50 p-5">
            <h3 className="mono-label mb-1.5 text-gold-deep">Compensation</h3>
            <p className="text-[0.95rem] font-medium leading-relaxed text-ink">
              {role.compensation}
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
