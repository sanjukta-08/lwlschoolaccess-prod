// Client-side shortlist ("Saved") state. No account needed: the list lives in
// localStorage and can be shared with a parent through an encoded URL.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PROGRAMMES, parseISO, startOfToday, type Cohort, type Programme } from "./programmes";

export type SavedItem = { id: string; d: string };

const KEY = "lwl:shortlist:v1";

export const itemKey = (it: SavedItem) => `${it.id}@${it.d}`;

export function encodeShortlist(items: SavedItem[]): string {
  return items.map(itemKey).join(",");
}

export function decodeShortlist(raw: string | undefined | null): SavedItem[] {
  if (!raw) return [];
  const out: SavedItem[] = [];
  raw.split(",").forEach((chunk) => {
    const [id, d] = chunk.split("@");
    if (!id || !d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return;
    if (!PROGRAMMES.some((p) => p.id === id)) return;
    if (out.some((o) => o.id === id && o.d === d)) return;
    out.push({ id, d });
  });
  return out;
}

function read(): SavedItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return decodeShortlist(
      parsed
        .map((x) =>
          x && typeof x === "object" && "id" in x && "d" in x
            ? `${String((x as SavedItem).id)}@${String((x as SavedItem).d)}`
            : "",
        )
        .filter(Boolean)
        .join(","),
    );
  } catch {
    return [];
  }
}

function write(items: SavedItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage full or blocked — shortlist stays in memory for this session */
  }
}

export type ShortlistApi = {
  ready: boolean;
  items: SavedItem[];
  has: (id: string, d: string) => boolean;
  toggle: (id: string, d: string) => void;
  remove: (id: string, d: string) => void;
  add: (items: SavedItem[]) => void;
  clear: () => void;
};

const EMPTY: ShortlistApi = {
  ready: false,
  items: [],
  has: () => false,
  toggle: () => {},
  remove: () => {},
  add: () => {},
  clear: () => {},
};

export const ShortlistContext = createContext<ShortlistApi>(EMPTY);

export function useShortlistState(): ShortlistApi {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [ready, setReady] = useState(false);

  // Read after hydration so SSR markup and the first client render match.
  useEffect(() => {
    setItems(read());
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setItems(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const commit = useCallback((next: SavedItem[]) => {
    setItems(next);
    write(next);
  }, []);

  const has = useCallback(
    (id: string, d: string) => items.some((i) => i.id === id && i.d === d),
    [items],
  );

  const toggle = useCallback(
    (id: string, d: string) => {
      setItems((prev) => {
        const exists = prev.some((i) => i.id === id && i.d === d);
        const next = exists
          ? prev.filter((i) => !(i.id === id && i.d === d))
          : [...prev, { id, d }];
        write(next);
        return next;
      });
    },
    [],
  );

  const remove = useCallback((id: string, d: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => !(i.id === id && i.d === d));
      write(next);
      return next;
    });
  }, []);

  const add = useCallback((incoming: SavedItem[]) => {
    setItems((prev) => {
      const next = [...prev];
      incoming.forEach((it) => {
        if (!next.some((i) => i.id === it.id && i.d === it.d)) next.push(it);
      });
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => commit([]), [commit]);

  return useMemo(
    () => ({ ready, items, has, toggle, remove, add, clear }),
    [ready, items, has, toggle, remove, add, clear],
  );
}

export function useShortlist(): ShortlistApi {
  return useContext(ShortlistContext);
}

export type SavedEntry = { p: Programme; c: Cohort };

export function resolveSaved(items: SavedItem[]): SavedEntry[] {
  const rows: SavedEntry[] = [];
  items.forEach(({ id, d }) => {
    const p = PROGRAMMES.find((x) => x.id === id);
    if (!p) return;
    const c = p.cohorts.find((x) => x.d === d) ?? { d };
    rows.push({ p, c });
  });
  return rows.sort((a, b) => a.c.d.localeCompare(b.c.d));
}

/** Days until a cohort starts (negative once it has begun). */
export function daysUntil(iso: string): number {
  const ms = parseISO(iso).getTime() - startOfToday().getTime();
  return Math.round(ms / 86400000);
}

/** "Starts in 12 days" / "Starts Friday" style urgency copy. */
export function countdownLabel(iso: string): string | null {
  const n = daysUntil(iso);
  if (n < 0) return null;
  if (n === 0) return "Starts today";
  if (n === 1) return "Starts tomorrow";
  if (n <= 21) return `Starts in ${n} days`;
  return null;
}

/** Families should decide ~10 days before the cohort starts. */
export const DECIDE_LEAD_DAYS = 10;

export function decideByISO(iso: string): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() - DECIDE_LEAD_DAYS);
  return d.toISOString().slice(0, 10);
}

export function decideLabel(iso: string): string | null {
  const decide = decideByISO(iso);
  const n = daysUntil(decide);
  if (n < 0 || n > 30) return null;
  if (n === 0) return "Decide by today";
  if (n === 1) return "Decide by tomorrow";
  return `Decide by ${parseISO(decide).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  })}`;
}
