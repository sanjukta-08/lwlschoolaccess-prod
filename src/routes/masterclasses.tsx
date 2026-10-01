import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { WingMark } from "@/components/WingMark";
import { listPublicMasterclasses, type PublicMasterclass } from "@/lib/masterclasses.functions";
import {
  audienceLabel,
  dayMonth,
  dayNumber,
  dayLabel,
  dualTime,
  durationLabel,
  isSoon,
  monthKey,
  monthLabel,
} from "@/lib/masterclass-format";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import futureDoctorsLogo from "@/assets/logo-future-doctors.png.asset.json";
import futureLawyersLogo from "@/assets/logo-future-lawyers.png.asset.json";
import finlitLogo from "@/assets/logo-finlit.png.asset.json";
import onwardLogo from "@/assets/logo-onward-word.png.asset.json";
import sirLutherLogo from "@/assets/logo-sir-luther.png.asset.json";
import lwlLogo from "@/assets/lwl-logo.png.asset.json";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";

const TITLE = "Free Live Masterclasses - Learn with Leaders";
const DESC =
  "Every upcoming free masterclass from Learn with Leaders and its partner platforms - live on Zoom with Harvard, Yale and Ivy League student mentors. Reserve a seat in one click.";

const masterclassQuery = queryOptions({
  queryKey: ["masterclasses", "public"],
  queryFn: () => listPublicMasterclasses(),
  staleTime: 15 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});


export const Route = createFileRoute("/masterclasses")({
  staticData: { sitemap: true },
  loader: ({ context }) => context.queryClient.ensureQueryData(masterclassQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MasterclassesPage,
  errorComponent: () => (
    <Shell>
      <p className="text-center text-ink-soft">
        We could not load the masterclass schedule just now. Please refresh in a moment.
      </p>
    </Shell>
  ),
  notFoundComponent: () => (
    <Shell>
      <p className="text-center text-ink-soft">Nothing here.</p>
    </Shell>
  ),
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="relative isolate flex min-h-[19rem] items-center justify-center overflow-hidden border-b border-line bg-paper px-5 pb-10 pt-8 sm:min-h-[21rem] sm:px-8 lg:pb-12 lg:pt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[68%] select-none items-center overflow-hidden pl-8 sm:flex" aria-hidden>
          <span className="whitespace-nowrap font-display text-[clamp(4.25rem,11vw,10rem)] font-black uppercase leading-none text-crimson/[0.06]">
            Masterclasses
          </span>
        </div>
        <div className="pointer-events-none absolute right-10 top-1/2 z-[1] hidden w-[min(320px,21vw)] -translate-y-1/2 opacity-20 xl:block" aria-hidden>
          <img src={birdAsset.url} alt="" className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-black leading-[0.98] text-ink sm:text-6xl xl:text-7xl">
            Explore Our <span className="text-crimson">Masterclasses</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Free live sessions with Ivy League student mentors across the Learn with Leaders family of programmes. Choose a session and join from anywhere.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#masterclass-schedule"
              className="mono-label bg-crimson px-8 py-4 text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
            >
              View all masterclasses
            </a>
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mono-label border border-line bg-paper px-8 py-4 text-ink no-underline shadow-soft transition-colors hover:border-gold-line hover:text-crimson"
            >
              Book a meeting
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute left-8 top-1/2 hidden h-32 w-1 -translate-y-1/2 bg-crimson/20 lg:block" aria-hidden />
        <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden>
          <span className="mono-label text-crimson/35 [writing-mode:vertical-rl]">Learn with Leaders</span>
        </div>
      </section>
      <div id="masterclass-schedule" className="page-shell scroll-mt-20 py-10">{children}</div>
      <SiteFooter />
    </div>
  );
}

function MasterclassesPage() {
  const { data } = useSuspenseQuery(masterclassQuery);
  const [audience, setAudience] = useState<string>("all");
  const [partner, setPartner] = useState<string>("all");

  const audiences = useMemo(
    () => Array.from(new Set(data.map((m) => m.audience).filter(Boolean) as string[])).sort(),
    [data],
  );
  const partners = useMemo(
    () => Array.from(new Set(data.map((m) => m.partner_name).filter(Boolean) as string[])).sort(),
    [data],
  );

  const rows = data.filter(
    (m) =>
      (audience === "all" || m.audience === audience) &&
      (partner === "all" || m.partner_name === partner),
  );

  const groups = useMemo(() => {
    const map = new Map<string, PublicMasterclass[]>();
    for (const m of rows) {
      if (!m.scheduled_at) continue;
      const k = monthKey(m.scheduled_at);
      const list = map.get(k);
      if (list) list.push(m);
      else map.set(k, [m]);
    }
    return Array.from(map.entries());
  }, [rows]);

  return (
    <Shell>
      <SectionHeading
        eyebrow={`${rows.length} session${rows.length === 1 ? "" : "s"} open`}
        sub="Sessions run for about an hour, are completely free, and every one ends with a live Q&A with the mentor."
      >
        The live <em className="text-crimson-deep">schedule</em>
      </SectionHeading>

      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-gold-line bg-wash/60 p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <Chips
          label="Who it's for"
          value={audience}
          onChange={setAudience}
          options={audiences.map((a) => ({ value: a, label: audienceLabel(a) }))}
        />
        <Chips
          label="Platform"
          value={partner}
          onChange={setPartner}
          options={partners.map((p) => ({ value: p, label: p }))}
        />
      </div>

      {groups.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-paper p-8 text-center shadow-soft">
          <p className="font-serif text-[1.2rem]">No sessions match that filter yet.</p>
          <p className="mt-2 text-[0.9rem] text-ink-soft">
            New masterclasses are added every few weeks -{" "}
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="font-bold text-crimson-deep underline decoration-gold decoration-2 underline-offset-4"
            >
              talk to an advisor
            </a>{" "}
            in the meantime.
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-8">
          {groups.map(([key, list]) => (
            <section key={key}>
              <h3 className="mono-label !text-left flex items-center gap-2 border-b border-gold-line pb-2 text-gold-deep">
                <WingMark size={13} />
                {monthLabel(list[0]!.scheduled_at!)}
                <span className="text-ink-faint">
                  · {list.length} session{list.length === 1 ? "" : "s"}
                </span>
              </h3>
              <ul className="mt-3.5 grid gap-3 lg:grid-cols-2">
                {list.map((m) => (
                  <MasterclassCard key={m.id} m={m} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Shell>
  );
}

function Chips({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  if (!options.length) return null;
  const all = [{ value: "all", label: "All" }, ...options];
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
      <span className="mono-label mr-1 text-ink-faint">{label}</span>
      {all.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold transition-colors ${
            value === o.value
              ? "border-crimson bg-crimson text-paper"
              : "border-line bg-paper text-ink-soft hover:border-gold-line hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function MasterclassCard({ m }: { m: PublicMasterclass }) {
  const when = m.scheduled_at;
  const soon = when ? isSoon(when) : false;
  const brandName = `${m.partner_name ?? ""} ${m.program_name ?? ""}`.toLowerCase();
  const fallbackLogo = brandName.includes("future doctor")
    ? futureDoctorsLogo.url
    : brandName.includes("future lawyer")
      ? futureLawyersLogo.url
      : brandName.includes("finlit")
        ? finlitLogo.url
      : brandName.includes("onward")
        ? onwardLogo.url
        : brandName.includes("sir luther")
          ? sirLutherLogo.url
          : m.partner_logo_url ?? lwlLogo.url;
  return (
    <li className="flex flex-col gap-3 rounded-[16px] border border-line bg-paper p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-deep hover:shadow-lift">
      <div className="flex items-start gap-3.5">
        {when ? (
          <div className="flex w-14 flex-none flex-col items-center rounded-xl border border-gold-line bg-wash py-2">
            <span className="font-serif text-[1.35rem] leading-none font-semibold">
              {dayNumber(when)}
            </span>
            <span className="mono-label mt-1 text-ink-faint">{dayMonth(when)}</span>
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {m.partner_name ? (
              <span className="mono-label rounded-full border border-gold-line bg-gold-soft px-2 py-0.5 text-gold-deep">
                {m.partner_name}
              </span>
            ) : null}
            {soon ? (
              <span className="mono-label rounded-md border border-dashed border-gold px-2 py-0.5 text-crimson-deep">
                ✦ Starting soon
              </span>
            ) : null}
          </div>
          <h4 className="!text-left mt-1.5 font-serif text-[1.05rem] leading-snug font-semibold">
            {m.title}
          </h4>
          {m.series ? (
            <p className="mt-0.5 text-[0.78rem] text-ink-faint">
              {m.series}
              {m.session_number ? ` · Session ${m.session_number}` : ""}
            </p>
          ) : null}
        </div>
        <div className="flex h-11 w-24 flex-none items-start justify-end sm:w-28">
          <img
            src={fallbackLogo}
            alt={`${m.partner_name ?? m.program_name ?? "Learn with Leaders"} logo`}
            loading="lazy"
            width={112}
            height={44}
            className="max-h-11 max-w-full object-contain object-right-top"
          />
        </div>
      </div>

      {m.description ? (
        <p className="line-clamp-3 text-[0.88rem] leading-relaxed text-ink-soft">
          {m.description}
        </p>
      ) : null}

      {m.learning_outcomes.length ? (
        <ul className="flex flex-col gap-1 text-[0.84rem] text-ink-soft">
          {m.learning_outcomes.slice(0, 3).map((o) => (
            <li key={o} className="flex gap-2">
              <span className="mt-[0.45em] h-1.5 w-1.5 flex-none rounded-full bg-gold" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-line pt-3 text-[0.82rem]">
        {when ? (
          <div>
            <dt className="mono-label text-ink-faint">When</dt>
            <dd className="font-semibold">
              {dayLabel(when)} · {dualTime(when, m.display_timezone)}
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="mono-label text-ink-faint">Format</dt>
          <dd className="font-semibold">
            Live on Zoom{m.duration_minutes ? ` · ${durationLabel(m.duration_minutes)}` : ""}
          </dd>
        </div>
        <div>
          <dt className="mono-label text-ink-faint">Who it's for</dt>
          <dd className="font-semibold">{audienceLabel(m.audience)}</dd>
        </div>
        {m.host_name ? (
          <div>
            <dt className="mono-label text-ink-faint">Mentor</dt>
            <dd className="font-semibold">
              {m.host_name}
              {m.host_university ? `, ${m.host_university}` : ""}
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-1">
        {m.apply_url ? (
          <a
            href={m.apply_url}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-crimson px-4 py-2 text-[0.85rem] font-bold text-paper no-underline shadow-soft transition-colors hover:bg-crimson-deep"
          >
            Reserve a free seat →
          </a>
        ) : (
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="rounded-full border-[1.5px] border-ink-soft px-4 py-2 text-[0.85rem] font-bold text-ink no-underline transition-colors hover:bg-wash"
          >
            Ask for the invite
          </a>
        )}
        {m.program_name ? (
          <span className="text-[0.78rem] text-ink-faint">Part of {m.program_name}</span>
        ) : null}
      </div>
    </li>
  );
}
