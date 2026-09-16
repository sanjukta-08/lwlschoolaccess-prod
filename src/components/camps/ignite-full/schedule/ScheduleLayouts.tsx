import { motion } from "framer-motion";
import { schedule } from "./scheduleData";

type Props = { active: number; setActive?: (index: number) => void };

export function Layout14Duotone({ active, setActive }: Props) {
  const day = schedule[active];
  if (!day) return null;

  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-sm bg-foreground">
      <img src={day.image} alt={day.theme} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: day.imagePosition }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative grid min-h-[560px] gap-6 p-6 md:p-10 lg:grid-cols-[1fr_420px]">
        <div className="self-end">
          <p className="mb-4 text-sm font-bold uppercase text-white md:text-base">Day {active + 1} · {day.label}</p>
          <h3 className="mb-5 font-display text-4xl font-bold leading-none text-white md:text-6xl">{day.theme.split(" – ")[0]}</h3>
          {setActive ? (
            <div className="flex flex-wrap gap-1.5">
              {schedule.map((_, index) => (
                <button key={index} type="button" onClick={() => setActive(index)} className={`rounded-sm px-3.5 py-2 text-xs font-bold uppercase transition ${active === index ? "bg-white text-foreground" : "bg-white/15 text-white hover:bg-white/25"}`}>
                  Day {index + 1}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="self-end rounded-sm bg-background/95 p-5 backdrop-blur">
          <div className="grid gap-2">
            {day.items.map((item, index) => (
              <motion.div key={`${item.time}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }} className="border-b border-foreground/10 py-2 last:border-0">
                <span className="text-xs font-bold text-[#c23b22]">{item.time}</span>
                <p className="mt-1 font-display text-sm leading-snug text-foreground">{item.activity}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
