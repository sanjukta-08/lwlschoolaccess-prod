import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { AddToCalendar } from "@/components/AddToCalendar";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { slugOf } from "@/lib/programme-slug";
import {
  TRACKS,
  TYPE_NAME,
  cohortGrades,
  dualTime,
  feeOf,
  fmtLong,
  PROGRAMMES,
} from "@/lib/programmes";
import { TRENDING } from "@/lib/programmes";
import { downloadIcs } from "@/lib/ics";
import {
  countdownLabel,
  decodeShortlist,
  decideLabel,
  encodeShortlist,
  resolveSaved,
  useShortlist,
} from "@/lib/shortlist";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/shortlist")({
  validateSearch: (search: Record<string, unknown>): { ids?: string } => {
    const raw = search["ids"];
    return typeof raw === "string" && raw ? { ids: raw } : {};
  },
  head: () => ({
    meta: [
      { title: "My saved programmes | Learn with Leaders" },
      {
        name: "description",
        content:
          "The programmes you saved, with start dates, fees and calendar reminders you can share with a parent.",
      },
      { property: "og:title", content: "My saved programmes | Learn with Leaders" },
      {
        property: "og:description",
        content: "Your shortlist of Learn with Leaders cohorts, with dates and reminders.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShortlistPage,
});

function ShortlistPage() {
  const { ids } = Route.useSearch();
  const { items, remove, add, clear, ready } = useShortlist();
  const [copied, setCopied] = useState(false);

  // A shared link ("?ids=...") merges into the reader's own saved list.
  useEffect(() => {
    if (!ready || !ids) return;
    const incoming = decodeShortlist(ids);
    if (incoming.length) add(incoming);
  }, [ready, ids, add]);

  const rows = useMemo(() => resolveSaved(items), [items]);

  const totalFee = useMemo(() => {
    let sum = 0;
    let allUsd = true;
    rows.forEach(({ p, c }) => {
      const raw = feeOf(p, c).e;
      const n = Number(raw.replace(/[^0-9.]/g, ""));
      if (!raw.startsWith("USD") || !Number.isFinite(n) || n === 0) allUsd = false;
      else sum += n;
    });
    return allUsd && rows.length ? `USD ${sum.toLocaleString("en-US")}` : null;
  }, [rows]);

  const share = () => {
    const url = `${window.location.origin}/shortlist?ids=${encodeURIComponent(
      encodeShortlist(items),
    )}`;
    void navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />

      <main className="mx-auto max-w-[1000px] px-5 pb-20">
        <header className="border-b border-line pb-6">
          <p className="mono-label text-crimson">Your list · saved on this device</p>
          <h1 className="mt-2 font-serif text-[2.1rem] leading-tight font-semibold">
            {rows.length
              ? `${rows.length} programme${rows.length === 1 ? "" : "s"} on your shortlist`
              : "Your shortlist is empty"}
          </h1>
          <p className="mt-2 max-w-[62ch] text-[0.95rem] text-ink-soft">
            Save anything you're considering, put the dates in your family calendar, and send
            the list to a parent to decide together. No account needed.
          </p>

          {rows.length ? (
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => downloadIcs(rows, "lwl-my-dates.ics")}
                className="rounded-xl bg-crimson px-4 py-2 text-[0.85rem] font-bold text-paper transition-[filter] hover:brightness-110"
              >
                🗓 Download all my dates (.ics)
              </button>
              <button
                type="button"
                onClick={share}
                className="rounded-xl border-[1.5px] border-line bg-paper px-4 py-2 text-[0.85rem] font-bold text-ink-soft transition-colors hover:border-ink-soft/50 hover:text-ink"
              >
                {copied ? "Link copied ✓" : "Share with a parent"}
              </button>
              <button
                type="button"
                onClick={clear}
                className="rounded-xl px-3 py-2 text-[0.8rem] font-semibold text-ink-faint hover:text-ink"
              >
                Clear list
              </button>
              {totalFee ? (
                <span className="ml-auto rounded-xl bg-wash px-3 py-2 font-mono text-[0.76rem] text-ink-soft">
                  Total if you enrol in all: <b className="text-ink">{totalFee}</b>
                </span>
              ) : null}
            </div>
          ) : null}
        </header>

        {rows.length ? (
          <ul className="mt-6 flex flex-col gap-3">
            {rows.map(({ p, c }) => {
              const track = TRACKS[p.tracks[0]!];
              const [lo, hi] = cohortGrades(p, c);
              const fee = feeOf(p, c);
              const soon = countdownLabel(c.d);
              const decide = decideLabel(c.d);
              return (
                <li
                  key={p.id + c.d}
                  style={{ borderLeftColor: track.color }}
                  className="rounded-2xl border border-line border-l-[4px] bg-paper p-4 shadow-soft"
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="mono-label text-[0.66rem]" style={{ color: track.color }}>
                        {track.ic} {track.label} · {TYPE_NAME[p.type]}
                      </p>
                      <h2 className="mt-1 font-serif text-[1.2rem] leading-tight font-semibold">
                        <Link
                          to="/programmes/$slug"
                          params={{ slug: slugOf(p) }}
                          className="text-ink no-underline hover:text-crimson"
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-[0.82rem] text-ink-soft">
                        Grades {lo}–{hi} · {p.dur} · {dualTime(p.time)}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.78rem]">
                        <span className="rounded-lg bg-wash px-2 py-1 font-mono text-ink-soft">
                          Starts {fmtLong(c.d)}
                        </span>
                        {soon ? (
                          <span className="rounded-lg bg-gold/12 px-2 py-1 font-bold text-gold">
                            {soon}
                          </span>
                        ) : null}
                        {decide ? (
                          <span className="rounded-lg bg-crimson/8 px-2 py-1 font-bold text-crimson">
                            {decide}
                          </span>
                        ) : null}
                      </p>
                    </div>

                    <div className="flex flex-none flex-col items-end gap-2">
                      <span className="font-serif text-[1.15rem] font-semibold">{fee.e}</span>
                      <AddToCalendar p={p} c={c} />
                      <a
                        href={p.apply}
                        target="_blank"
                        rel="noopener"
                        className="rounded-xl px-3.5 py-1.5 text-[0.78rem] font-bold text-paper no-underline transition-[filter] hover:brightness-110"
                        style={{ background: track.color }}
                      >
                        Apply
                      </a>
                      <button
                        type="button"
                        onClick={() => remove(p.id, c.d)}
                        className="text-[0.74rem] font-semibold text-ink-faint hover:text-crimson"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <section className="mt-8">
            <h2 className="font-serif text-[1.3rem] font-semibold">Start with a top pick</h2>
            <p className="mt-1 text-[0.9rem] text-ink-soft">
              Tap the heart on any programme to save it here.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {TRENDING.slice(0, 3).map(({ id, why }) => {
                const p = PROGRAMMES.find((x) => x.id === id);
                if (!p) return null;
                const track = TRACKS[p.tracks[0]!];
                return (
                  <Link
                    key={id}
                    to="/programmes/$slug"
                    params={{ slug: slugOf(p) }}
                    className="rounded-2xl border border-line bg-paper p-4 text-ink no-underline shadow-soft transition-transform hover:-translate-y-px"
                  >
                    <p className="mono-label text-[0.64rem]" style={{ color: track.color }}>
                      {track.ic} {track.label}
                    </p>
                    <b className="mt-1.5 block text-[0.95rem]">{p.name}</b>
                    <small className="mt-1 block text-[0.78rem] text-ink-soft">{why}</small>
                  </Link>
                );
              })}
            </div>
            <Link
              to="/finder"
              search={DEFAULT_SEARCH}
              className="mt-5 inline-block rounded-xl bg-crimson px-4 py-2 text-[0.85rem] font-bold text-paper no-underline"
            >
              Browse all programmes
            </Link>
          </section>
        )}
      <SiteFooter />
      </main>
    </div>
  );
}
