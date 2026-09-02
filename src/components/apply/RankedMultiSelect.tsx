import { ArrowDown, ArrowUp, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RankedMultiSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  maxSelections?: number;
  minSelections?: number;
}

export function parseRankedValue(val: string): string[] {
  if (!val) return [];
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

/**
 * Ranked preference picker: click to add, reorder with the arrows.
 * Stored as a JSON array string so the order IS the ranking.
 */
export function RankedMultiSelect({
  options,
  value,
  onChange,
  maxSelections = 5,
  minSelections = 1,
}: RankedMultiSelectProps) {
  const selected = parseRankedValue(value);
  const commit = (next: string[]) => onChange(next.length ? JSON.stringify(next) : "");

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      commit(selected.filter((o) => o !== opt));
      return;
    }
    if (selected.length >= maxSelections) return;
    commit([...selected, opt]);
  };

  const move = (index: number, delta: number) => {
    const next = [...selected];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  };

  return (
    <div className="mt-1.5 space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const rank = selected.indexOf(opt);
          const active = rank >= 0;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {active ? `${rank + 1}. ` : ""}
              {opt}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <ol className="space-y-1.5">
          {selected.map((opt, i) => (
            <li
              key={opt}
              className="flex items-center gap-2 rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-sm"
            >
              <Badge variant="outline" className="shrink-0">
                {i + 1}
              </Badge>
              <span className="flex-1 truncate">{opt}</span>
              <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, -1)}>
                <ArrowUp className="h-3.5 w-3.5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, 1)}>
                <ArrowDown className="h-3.5 w-3.5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggle(opt)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ol>
      )}

      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Rank {minSelections > 0 ? `at least ${minSelections}` : "your"} preference
        {minSelections === 1 ? "" : "s"} — up to {maxSelections}
      </p>
    </div>
  );
}
