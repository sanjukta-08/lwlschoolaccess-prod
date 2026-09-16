import { schedule } from "./scheduleData";

interface Props {
  active: number;
  setActive: (i: number) => void;
}

export const DaySelector = ({ active, setActive }: Props) => (
  <div className="flex flex-wrap gap-2 lg:justify-end">
    {schedule.map((d, i) => (
      <button
        key={i}
        onClick={() => setActive(i)}
        className={`px-5 py-2.5 rounded-sm font-body text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200 ${
          active === i
            ? "bg-cambridge-rust text-white shadow-lg"
            : "bg-card text-muted-foreground hover:text-foreground shadow-prestigious"
        }`}
      >
        Day {i + 1}
      </button>
    ))}
  </div>
);

// Inline compact day header — no image, minimal vertical space
export const DayHeader = ({ active }: { active: number }) => {
  const d = schedule[active];
  if (!d) return null;
  return (
    <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-foreground/15">
      <div className="flex items-baseline gap-3">
        <p className="text-[10px] uppercase tracking-[0.3em] font-body font-bold text-cambridge-rust">
          Day {active + 1}
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-none">
          {d.theme}
        </h3>
      </div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 font-body hidden md:block">
        {d.items.length} sessions
      </p>
    </div>
  );
};
