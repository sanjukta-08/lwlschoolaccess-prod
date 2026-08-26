import { SKILL_FAMILY, groupedSkills, type SkillFamily } from "@/lib/programme-proof";
import type { Programme } from "@/lib/programmes";

const ORDER: SkillFamily[] = ["think", "communicate", "build", "people"];

export function SkillMatrix({
  programme: p,
  color,
}: {
  programme: Programme;
  color: string;
}) {
  const skills = groupedSkills(p);
  const groups = ORDER.map((f) => ({
    family: f,
    items: skills.filter((s) => s.family === f),
  })).filter((g) => g.items.length > 0);

  const gridCols =
    groups.length === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : groups.length === 1
        ? "grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={["mt-6 grid gap-3.5", gridCols].join(" ")}>
      {groups.map((g) => {
        const meta = SKILL_FAMILY[g.family];
        return (
          <div
            key={g.family}
            className="rounded-2xl border-2 border-ink/12 bg-paper p-5 shadow-soft"
          >
            <div className="flex items-start gap-3">
              <span className="text-[1.35rem] leading-none" aria-hidden>
                {meta.ic}
              </span>
              <div>
                <h3 className="font-serif text-[1.05rem] font-semibold">{meta.label}</h3>
                <p className="mt-1 text-[0.82rem] text-ink-soft">{meta.blurb}</p>
              </div>
            </div>
            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
              {g.items.map((s) => (
                <li key={s.skill} className="border-t border-line pt-2.5 first:border-0 first:pt-0">
                  <b className="block text-[0.88rem]">
                    <span className="mr-1.5 font-bold" style={{ color }} aria-hidden>
                      ▸
                    </span>
                    {s.skill}
                  </b>
                  <p className="mt-0.5 pl-4 text-[0.79rem] text-ink-faint">{s.how}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
