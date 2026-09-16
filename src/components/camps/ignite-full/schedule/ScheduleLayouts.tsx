import { motion } from "framer-motion";
import { schedule } from "./scheduleData";
import { DayHeader } from "./scheduleShared";

interface LayoutProps { active: number }
const useDay = (a: number) => schedule[a];
const fadeUp = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

/* ------- shared bits ------- */
const TimeChip = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span className={`font-body text-[10px] uppercase tracking-[0.12em] font-bold tabular-nums whitespace-nowrap ${
    dark ? "text-cambridge-cream" : "text-cambridge-rust"
  }`}>{children}</span>
);

const ItemList = ({ active }: { active: number; compact?: boolean }) => {
  const d = useDay(active);
  return (
    <ol className="space-y-0">
      {d.items.map((it, i) => (
        <motion.li key={i} {...fadeUp} transition={{ duration: 0.3, delay: i * 0.02 }}
          className="flex items-baseline gap-3 py-1 border-b border-foreground/10 last:border-b-0">
          <span className="font-body text-[10px] uppercase tracking-[0.12em] font-bold tabular-nums whitespace-nowrap text-cambridge-rust w-[105px] shrink-0">
            {it.time}
          </span>
          <span className="font-display text-[13px] text-foreground leading-snug">{it.activity}</span>
        </motion.li>
      ))}
    </ol>
  );
};

/* ============================================================ */
/* 1. COVER STORY — full-bleed image left, list right          */
/* ============================================================ */
export const Layout1Cover = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="grid lg:grid-cols-[42%_1fr] gap-6 items-stretch">
      <div className="relative rounded-sm overflow-hidden min-h-[380px]">
        <img src={d.image} alt={d.theme} className="absolute inset-0 w-full h-full object-cover"
             style={{ objectPosition: d.imagePosition }} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-cambridge-cream mb-2">Day {active + 1} · {d.label}</p>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-[0.95]">{d.theme.split(" – ")[0]}</h3>
          <p className="font-display italic text-white/80 mt-1">{d.items.length} sessions</p>
        </div>
      </div>
      <div><ItemList active={active} /></div>
    </div>
  );
};

/* ============================================================ */
/* 2. MAGAZINE COVER — full-bleed image + overlay TOC          */
/* ============================================================ */
export const Layout2MagCover = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="relative rounded-sm overflow-hidden min-h-[600px]">
      <img src={d.image} alt={d.theme} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
      <div className="absolute inset-0 bg-foreground/55" />
      <div className="relative grid lg:grid-cols-[1fr_400px] gap-8 p-6 md:p-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-cambridge-cream mb-3">Issue Nº {active + 1}</p>
          <h3 className="font-display font-bold text-white leading-[0.85] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}>
            {d.label}
          </h3>
          <p className="font-display italic text-cambridge-cream text-xl mt-2">{d.theme}</p>
        </div>
        <div className="bg-card/95 backdrop-blur p-5 rounded-sm self-end">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-cambridge-rust mb-3 pb-2 border-b border-foreground/15">Inside this issue</p>
          <ItemList active={active} />
        </div>
      </div>
    </div>
  );
};

/* ============================================================ */
/* 3. POLAROID + INDEX                                          */
/* ============================================================ */
export const Layout3Polaroid = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      <div className="flex justify-center lg:pt-6">
        <motion.div initial={{ rotate: -3, opacity: 0 }} animate={{ rotate: -3, opacity: 1 }}
          className="bg-card p-3 pb-6 shadow-prestigious max-w-[420px] w-full">
          <img src={d.image} alt={d.theme} className="w-full aspect-[4/5] object-cover" style={{ objectPosition: d.imagePosition }} />
          <p className="font-display italic text-center mt-3 text-foreground/75">{d.theme}</p>
        </motion.div>
      </div>
      <div>
        <DayHeader active={active} />
        <ItemList active={active} />
      </div>
    </div>
  );
};

/* ============================================================ */
/* 4. SPLIT DIAGONAL                                            */
/* ============================================================ */
export const Layout4Diagonal = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="relative rounded-sm overflow-hidden bg-cambridge-cream/70 min-h-[520px]">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)" }}>
          <img src={d.image} alt={d.theme} className="w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        </div>
      </div>
      <div className="relative grid grid-cols-2 gap-6 p-6 md:p-10 min-h-[520px]">
        <div className="self-end">
          <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-cambridge-cream mb-2">Day {active + 1}</p>
          <h3 className="font-display text-4xl font-bold text-white leading-[0.95]">{d.label}</h3>
        </div>
        <div className="bg-card/95 p-5 rounded-sm">
          <ItemList active={active} />
        </div>
      </div>
    </div>
  );
};

/* ============================================================ */
/* 5. FILMSTRIP BANNER + TABLE                                  */
/* ============================================================ */
export const Layout5Filmstrip = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div>
      <div className="relative h-[140px] rounded-sm overflow-hidden mb-5">
        <img src={d.image} alt={d.theme} className="w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-foreground/70 via-transparent to-foreground/70" />
        <div className="absolute inset-y-0 left-0 flex items-center px-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-cambridge-cream">Day {active + 1}</p>
            <h3 className="font-display text-3xl font-bold text-white leading-none">{d.theme}</h3>
          </div>
        </div>
        {/* sprocket holes */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-foreground flex">
          {Array.from({ length: 30 }).map((_, i) => <div key={i} className="flex-1 border-r border-background" />)}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-foreground flex">
          {Array.from({ length: 30 }).map((_, i) => <div key={i} className="flex-1 border-r border-background" />)}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-10">
        <ItemList active={active} />
        <div className="hidden md:block" />
      </div>
    </div>
  );
};

/* ============================================================ */
/* 6. WINDOW PANE — image cropped 4 panes + items              */
/* ============================================================ */
export const Layout6Pane = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="grid lg:grid-cols-[40%_1fr] gap-6 items-start">
      <div className="grid grid-cols-2 grid-rows-2 gap-1.5 aspect-square">
        {[
          "0% 0%", "100% 0%", "0% 100%", "100% 100%",
        ].map((pos, i) => (
          <div key={i} className="overflow-hidden bg-cambridge-cream">
            <img src={d.image} alt="" className="w-[200%] h-[200%] object-cover" style={{ objectPosition: pos }} />
          </div>
        ))}
      </div>
      <div>
        <DayHeader active={active} />
        <ItemList active={active} />
      </div>
    </div>
  );
};

/* ============================================================ */
/* 7. EDITORIAL DROP — pull-out image + drop-cap headline      */
/* ============================================================ */
export const Layout7Drop = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-5">
        <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-cambridge-rust mb-3">Day {active + 1} · {d.label}</p>
        <p className="font-display font-bold text-foreground leading-[0.85] tracking-[-0.03em]"
           style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}>
          {String(active + 1).padStart(2, "0")}
        </p>
        <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-sm">
          <img src={d.image} alt={d.theme} className="w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        </div>
        <p className="font-display italic text-foreground/65 text-base mt-3">{d.theme}</p>
      </div>
      <div className="lg:col-span-7"><ItemList active={active} /></div>
    </div>
  );
};

/* ============================================================ */
/* 8. POSTCARD                                                  */
/* ============================================================ */
export const Layout8Postcard = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="bg-cambridge-cream/60 p-5 md:p-8 rounded-sm">
      <div className="grid md:grid-cols-2 gap-0 bg-card shadow-prestigious">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <img src={d.image} alt={d.theme} className="w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        </div>
        <div className="p-5 md:p-7 relative">
          <div className="absolute top-4 right-4 border-2 border-cambridge-rust px-2 py-1 text-cambridge-rust font-display font-bold text-xs uppercase tracking-[0.2em] -rotate-6">
            Cambridge · 2026
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-cambridge-rust mb-2">Postmarked Day {active + 1}</p>
          <h3 className="font-display text-2xl font-bold text-foreground leading-tight mb-3">{d.theme}</h3>
          <ItemList active={active} />
        </div>
      </div>
    </div>
  );
};

/* ============================================================ */
/* 9. VERTICAL BANNER — left full-height image rail            */
/* ============================================================ */
export const Layout9Vertical = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="grid lg:grid-cols-[180px_1fr] gap-6 items-stretch">
      <div className="relative rounded-sm overflow-hidden min-h-[400px] hidden lg:block">
        <img src={d.image} alt={d.theme} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        <div className="absolute inset-0 bg-gradient-to-b from-cambridge-rust/70 to-foreground/70" />
        <div className="absolute inset-0 flex items-end p-4">
          <p className="font-display font-bold text-white text-2xl leading-[0.9]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Day {active + 1} · {d.label}
          </p>
        </div>
      </div>
      <div>
        <DayHeader active={active} />
        <div className="grid md:grid-cols-2 gap-x-10">
          {d.items.map((it, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.3, delay: i * 0.02 }}
              className="py-2 border-b border-foreground/10">
              <TimeChip>{it.time}</TimeChip>
              <p className="font-display text-[14px] text-foreground leading-snug">{it.activity}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================ */
/* 10. JOURNAL PAGE — ruled paper + photo taped in             */
/* ============================================================ */
export const Layout10Journal = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="bg-cambridge-cream/50 rounded-sm p-6 md:p-10 relative"
         style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, hsl(var(--foreground)/0.08) 32px)" }}>
      <div className="absolute left-12 top-0 bottom-0 w-px bg-cambridge-rust/40" />
      <div className="grid md:grid-cols-[1fr_240px] gap-6">
        <div className="pl-6">
          <p className="font-display italic text-cambridge-rust text-xl mb-1">{d.label}, {d.theme.split(" – ")[0]}</p>
          <h3 className="font-display font-bold text-foreground text-3xl leading-tight mb-4">Today's plan</h3>
          <ItemList active={active} />
        </div>
        <div className="relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-cambridge-cream/80 border-y border-foreground/15 z-10" />
          <motion.img initial={{ rotate: 2 }} animate={{ rotate: 2 }}
            src={d.image} alt={d.theme}
            className="w-full aspect-[3/4] object-cover shadow-prestigious"
            style={{ objectPosition: d.imagePosition }} />
        </div>
      </div>
    </div>
  );
};

/* ============================================================ */
/* 11. SPLIT TWO-UP — image top half, items bottom            */
/* ============================================================ */
export const Layout11TwoUp = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div>
      <div className="relative aspect-[21/8] rounded-sm overflow-hidden mb-6">
        <img src={d.image} alt={d.theme} className="w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-cambridge-cream mb-2">Day {active + 1}</p>
          <h3 className="font-display font-bold text-white leading-[0.9]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            {d.theme}
          </h3>
        </div>
      </div>
      <div className="md:columns-2 gap-10">
        {d.items.map((it, i) => (
          <div key={i} className="break-inside-avoid mb-2 pb-2 border-b border-foreground/10">
            <TimeChip>{it.time}</TimeChip>
            <p className="font-display text-[14px] text-foreground leading-snug">{it.activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================ */
/* 12. CIRCLE MASKED — image as circle + arc layout            */
/* ============================================================ */
export const Layout12Circle = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-center">
      <div className="relative aspect-square max-w-md mx-auto w-full">
        <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-cambridge-cream shadow-prestigious">
          <img src={d.image} alt={d.theme} className="w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        </div>
        <div className="absolute -top-4 -right-4 bg-cambridge-rust text-white px-4 py-3 rounded-full">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold">Day</p>
          <p className="font-display font-bold text-3xl leading-none">{active + 1}</p>
        </div>
      </div>
      <div>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-1">{d.label}</h3>
        <p className="font-display italic text-cambridge-rust mb-4">{d.theme}</p>
        <ItemList active={active} />
      </div>
    </div>
  );
};

/* ============================================================ */
/* 13. STICKY NOTICE — image + pinned cards                    */
/* ============================================================ */
export const Layout13Notice = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div className="grid lg:grid-cols-[44%_1fr] gap-6">
      <div className="relative rounded-sm overflow-hidden min-h-[420px]">
        <img src={d.image} alt={d.theme} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
        <div className="absolute inset-0 bg-cambridge-rust/30 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <p className="text-[10px] uppercase tracking-[0.35em] font-bold mb-2">Day {active + 1}</p>
          <h3 className="font-display font-bold leading-[0.9]" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>{d.label}</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {d.items.map((it, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.3, delay: i * 0.02 }}
            className="bg-card border border-foreground/10 p-3 rounded-sm hover:border-cambridge-rust/40 transition">
            <TimeChip>{it.time}</TimeChip>
            <p className="font-display text-[13px] text-foreground leading-snug mt-0.5">{it.activity}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================ */
/* 14. DUOTONE COVER — rust duotone + huge type                */
/* ============================================================ */
export const Layout14Duotone = ({ active, setActive }: LayoutProps & { setActive?: (i: number) => void }) => {
  const d = useDay(active);
  return (
    <div className="relative rounded-sm overflow-hidden min-h-[560px] bg-foreground">
      <img src={d.image} alt={d.theme}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: d.imagePosition }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative grid lg:grid-cols-[1fr_420px] gap-6 p-6 md:p-10 min-h-[560px]">
        <div className="self-end">
          <p className="text-sm md:text-base uppercase tracking-[0.4em] font-body font-bold text-cambridge-cream mb-4">Day {active + 1} · {d.label}</p>
          <h3 className="font-display font-bold text-white leading-[0.9] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
            {d.theme.split(" – ")[0]}
          </h3>
          {setActive && (
            <div className="flex flex-wrap gap-1.5">
              {schedule.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`px-3.5 py-2 rounded-sm font-body text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200 ${
                    active === i
                      ? "bg-white text-cambridge-rust shadow-lg"
                      : "bg-white/15 text-white hover:bg-white/25 backdrop-blur"
                  }`}
                >
                  Day {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="self-end bg-background/95 backdrop-blur p-5 rounded-sm">
          <ItemList active={active} />
        </div>
      </div>
    </div>
  );
};

/* ============================================================ */
/* 15. GALLERY GRID — image hero + thumb strip + items          */
/* ============================================================ */
export const Layout15Gallery = ({ active }: LayoutProps) => {
  const d = useDay(active);
  return (
    <div>
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-4 mb-6">
        <div className="relative aspect-[16/10] lg:aspect-auto rounded-sm overflow-hidden">
          <img src={d.image} alt={d.theme} className="w-full h-full object-cover" style={{ objectPosition: d.imagePosition }} />
          <div className="absolute inset-0 bg-gradient-to-tr from-foreground/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-cambridge-cream">Day {active + 1}</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">{d.theme}</h3>
          </div>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
          {schedule.slice(0, 6).map((s, i) => (
            <div key={i} className={`relative aspect-square overflow-hidden rounded-sm ${i === active ? "ring-2 ring-cambridge-rust" : "opacity-60"}`}>
              <img src={s.image} alt="" className="w-full h-full object-cover" style={{ objectPosition: s.imagePosition }} />
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-10">
        {d.items.map((it, i) => (
          <div key={i} className="flex items-baseline gap-3 py-1.5 border-b border-foreground/10">
            <TimeChip>{it.time}</TimeChip>
            <span className="font-display text-[14px] text-foreground leading-snug ml-auto text-right">{it.activity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
