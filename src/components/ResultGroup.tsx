import { ProgrammeCard } from "@/components/ProgrammeCard";
import type { Match, MatchGroup } from "@/lib/finder";

type Props = {
  group: MatchGroup;
  compact: boolean;
  showType: boolean;
  labelTop?: boolean;
  hideHeader?: boolean;
  rows?: Match[];
  onOpen: (id: string) => void;
};

export function ResultGroup({
  group,
  compact,
  showType,
  labelTop = false,
  hideHeader = false,
  rows,
  onOpen,
}: Props) {
  const list = rows ?? group.rows;

  return (
    <section id={`group-${group.key}`} className="scroll-mt-24">
      {hideHeader ? null : (
        <header className="mt-9 mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-2.5">
          <h3 className="font-serif text-[1.35rem] font-semibold">{group.label}</h3>
          <small className="mono-label text-ink-faint">
            {group.rows.length} option{group.rows.length === 1 ? "" : "s"}
          </small>
          <small className="w-full text-[0.8rem] text-ink-soft sm:w-auto sm:flex-1 sm:text-right">
            {group.sub}
          </small>
        </header>
      )}

      {compact ? (
        <div className="flex flex-col gap-2">
          {list.map((m) => (
            <ProgrammeCard
              key={m.p.id}
              match={m}
              compact
              showType={showType}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((m, i) => (
            <ProgrammeCard
              key={m.p.id}
              match={m}
              index={i}
              showType={showType}
              label={labelTop && i < 2 ? (i === 0 ? "Best match" : "Great fit") : null}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </section>
  );
}
