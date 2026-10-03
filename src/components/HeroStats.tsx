import { PROGRAMMES, upcomingProgrammes, totalCohorts } from "@/lib/programmes";

const stats = (): { value: string; label: string }[] => [
  { value: String(upcomingProgrammes().length), label: "Programmes" },
  { value: String(totalCohorts()), label: "Upcoming cohorts" },
  { value: "10", label: "Months ahead" },
  { value: "Harvard · Yale", label: "Mentors from" },
];

export function HeroStats() {
  const STATS = stats();
  return (
    <div className="mt-7 flex flex-wrap justify-center gap-x-9 gap-y-4">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col items-center">
          <b className="font-serif text-[1.25rem] font-semibold text-ink">{s.value}</b>
          <small className="mono-label text-ink-faint">{s.label}</small>
        </div>
      ))}
    </div>
  );
}
