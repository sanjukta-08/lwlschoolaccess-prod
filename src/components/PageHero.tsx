import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import birdAsset from "@/assets/lwl-bird-black.webp.asset.json";

type Pill = { top: ReactNode; sub: ReactNode };

/**
 * Shared premium hero used across finder / calendar / about / stories /
 * profile-building so every page opens with the same visual language.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  pills,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  pills?: Pill[];
  children?: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#fbfcfe_0%,#f7f2e8_60%,var(--wash)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_88%_20%,rgba(185,138,31,0.14),transparent_60%),radial-gradient(700px_420px_at_12%_10%,rgba(163,29,51,0.08),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(185,138,31,0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden w-[min(420px,32vw)] -translate-y-1/2 opacity-[0.42] sm:block lg:w-[min(480px,30vw)]">
        <img
          src={birdAsset.url}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain object-right [mask-image:linear-gradient(to_left,black_55%,transparent_95%)]"
        />
      </div>
      <div className="pointer-events-none absolute top-[-10%] left-[-5%] -z-10 h-[60%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(185,138,31,0.10),transparent_70%)] blur-3xl" />

      <div className="relative">
        <SiteHeader />
        <section className="page-shell flex flex-col items-center gap-4 pt-8 pb-10 text-center">
          <div>
            {eyebrow ? (
              <span className="mono-label mb-2 inline-flex items-center justify-center gap-2 text-crimson">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                {eyebrow}
              </span>
            ) : null}
            <h1 className="font-serif text-[clamp(1.8rem,4.4vw,2.7rem)] leading-[1.1] font-medium tracking-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-3 max-w-[58em] text-[0.98rem] leading-relaxed text-ink-soft">
                {subtitle}
              </p>
            ) : null}
          </div>

          {pills?.length ? (
            <ul className="flex flex-wrap justify-center gap-2">
              {pills.map((p, i) => (
                <li
                  key={i}
                  className="rounded-full border border-line bg-paper/90 px-3.5 py-1.5 text-center shadow-soft backdrop-blur-sm"
                >
                  <b className="flex items-center justify-center gap-1.5 text-[0.78rem] font-bold text-ink">
                    {p.top}
                  </b>
                  <small className="mono-label block text-ink-faint">{p.sub}</small>
                </li>
              ))}
            </ul>
          ) : null}

          {children ? <div className="flex flex-wrap justify-center gap-3">{children}</div> : null}
        </section>
      </div>
    </div>
  );
}
