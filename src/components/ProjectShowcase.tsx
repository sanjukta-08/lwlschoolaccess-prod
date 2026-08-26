import { detailFor } from "@/lib/programme-detail";
import { projectsFor } from "@/lib/programme-proof";
import type { Programme } from "@/lib/programmes";

export function ProjectShowcase({
  programme: p,
  color,
}: {
  programme: Programme;
  color: string;
}) {
  const projects = projectsFor(p);
  const d = detailFor(p);

  return (
    <>
      <div className="mt-6 grid gap-3.5 lg:grid-cols-3">
        {projects.map((pr, i) => (
          <article
            key={pr.title}
            className="flex flex-col rounded-2xl border-[1.5px] border-line bg-paper p-5 shadow-soft"
          >
            <span className="mono-label text-ink-faint">Project {i + 1}</span>
            <h3 className="mt-1.5 font-serif text-[1.08rem] leading-snug font-semibold">
              {pr.title}
            </h3>
            <p className="mt-2.5 text-[0.85rem] italic text-ink-soft">“{pr.question}”</p>
            <p className="mt-3 text-[0.85rem]">
              <b className="mono-label block text-ink-faint">What they hand in</b>
              {pr.output}
            </p>
            <span
              className="mt-auto pt-4 text-[0.76rem] font-bold"
              style={{ color }}
            >
              {pr.timeline}
            </span>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 rounded-[20px] border-[1.5px] border-line bg-wash px-6 py-6 sm:grid-cols-[1.1fr_1fr]">
        <div>
          <b className="block font-serif text-[1.15rem] font-semibold">{d.project.title}</b>
          <p className="mt-2 text-[0.88rem] text-ink-soft">{d.project.body}</p>
        </div>
        <div>
          <span className="mono-label block text-ink-faint">
            What you end up holding
          </span>
          <ul className="mt-2.5 flex list-none flex-col gap-2 p-0">
            {d.project.proof.map((x) => (
              <li key={x} className="flex items-start gap-2 text-[0.85rem]">
                <span className="font-bold" style={{ color }} aria-hidden>
                  ✓
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
