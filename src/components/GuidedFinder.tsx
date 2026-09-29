import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PROGRAMMES,
  TRACKS,
  TYPES,
  TYPE_BLURB,
  TYPE_ORDER,
  cohortGrades,
  feeOf,
  isPast,
  type TrackKey,
  type TypeKey,
} from "@/lib/programmes";
import { BANDS, BAND_LABEL, DEFAULT_SEARCH, getMatches } from "@/lib/finder";
import { TrackIcon } from "@/lib/track-icons";
import { slugOf } from "@/lib/programme-slug";
import { startLabel } from "@/lib/outcome";

const STEPS = ["Type of programme", "Grade", "Subject", "Matches"] as const;

type State = {
  type: TypeKey | null;
  grade: string;
  interest: string;
};

const INITIAL: State = { type: null, grade: "all", interest: "all" };

export function GuidedFinder() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>(INITIAL);

  const typeCounts = useMemo(() => {
    const out = {} as Record<TypeKey, number>;
    TYPE_ORDER.forEach((t) => {
      out[t] = PROGRAMMES.filter(
        (p) => p.type === t && p.cohorts.some((c) => !isPast(c.d)),
      ).length;
    });
    return out;
  }, []);

  const matches = useMemo(() => {
    if (!state.type) return [];
    return getMatches(
      {
        ...DEFAULT_SEARCH,
        type: state.type,
        grade: state.grade,
        interest: state.interest,
      },
      {},
    );
  }, [state]);

  const restart = () => {
    setState(INITIAL);
    setStep(0);
  };

  return (
    <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        {STEPS.map((t, i) => (
          <span
            key={t}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-gold" : "bg-line"
            }`}
          />
        ))}
      </div>

      <p className="mono-label mb-2 text-gold">
        Step {Math.min(step + 1, 3)} of 3 · {STEPS[step]}
      </p>

      {step === 0 ? (
        <>
          <h2 className="mb-1.5 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] leading-tight font-medium">
            What kind of experience are you looking for?
          </h2>
          <p className="mb-5 text-[0.9rem] text-ink-soft">
            Start with the type of programme - we&apos;ll narrow it down from there.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {TYPE_ORDER.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setState({ ...state, type: t });
                  setStep(1);
                }}
                className="group rounded-xl border border-line bg-wash px-4 py-4 text-left transition-colors hover:border-ink-soft/40 hover:bg-paper"
              >
                <span className="flex items-center justify-between gap-2">
                  <b className="text-[0.98rem] font-bold text-ink">{TYPES[t].label}</b>
                  <small className="font-mono text-[0.7rem] font-medium text-ink-faint">
                    {typeCounts[t]} live
                  </small>
                </span>
                <small className="mt-1 block text-[0.8rem] leading-snug text-ink-soft">
                  {TYPE_BLURB[t]}
                </small>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.78rem] font-bold text-crimson">
                  Choose <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {step === 1 ? (
        <>
          <h2 className="mb-1.5 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] leading-tight font-medium">
            Which grade is the student in?
          </h2>
          <p className="mb-5 text-[0.9rem] text-ink-soft">
            We&apos;ll only show {TYPES[state.type!].label.toLowerCase()} open to that grade.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[{ value: "all", label: "Any grade" }, ...Object.keys(BANDS).map((b) => ({ value: b, label: BAND_LABEL[b]! }))].map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  setState({ ...state, grade: o.value });
                  setStep(2);
                }}
                className="rounded-xl border border-line bg-wash px-4 py-3.5 text-left transition-colors hover:border-ink-soft/40 hover:bg-paper"
              >
                <b className="block text-[0.95rem] font-bold text-ink">{o.label}</b>
              </button>
            ))}
          </div>
          <BackButton onClick={() => setStep(0)} />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <h2 className="mb-1.5 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] leading-tight font-medium">
            Any subject in mind?
          </h2>
          <p className="mb-5 text-[0.9rem] text-ink-soft">
            Optional - pick one, or see everything.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setState({ ...state, interest: "all" });
                setStep(3);
              }}
              className="rounded-xl border border-line bg-wash px-4 py-3.5 text-left transition-colors hover:border-ink-soft/40 hover:bg-paper"
            >
              <b className="block text-[0.95rem] font-bold text-ink">All subjects</b>
            </button>
            {Object.entries(TRACKS).map(([key, t]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setState({ ...state, interest: key });
                  setStep(3);
                }}
                className="rounded-xl border border-line bg-wash px-4 py-3.5 text-left transition-colors hover:border-ink-soft/40 hover:bg-paper"
              >
                <b className="flex items-center gap-2 text-[0.95rem] font-bold text-ink">
                  <span style={{ color: t.color }}>
                    <TrackIcon track={key as TrackKey} className="h-4 w-4" />
                  </span>
                  {t.label}
                </b>
              </button>
            ))}
          </div>
          <BackButton onClick={() => setStep(1)} />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <h2 className="mb-1.5 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] leading-tight font-medium">
            {matches.length
              ? `${matches.length} ${TYPES[state.type!].label.toLowerCase()} for you`
              : "Nothing matches that combination yet"}
          </h2>
          <p className="mb-5 text-[0.9rem] text-ink-soft">
            {TYPES[state.type!].label}
            {state.grade !== "all" ? ` · ${BAND_LABEL[state.grade] ?? `Grade ${state.grade}`}` : ""}
            {state.interest !== "all" ? ` · ${TRACKS[state.interest as TrackKey].label}` : ""}
          </p>

          {matches.length ? (
            <div className="space-y-3">
              {matches.map(({ p, next }) => {
                const [lo, hi] = cohortGrades(p, next);
                return (
                  <article
                    key={p.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-wash px-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[0.98rem] font-bold text-ink">{p.name}</h3>
                      <p className="mt-0.5 text-[0.8rem] text-ink-soft">
                        Grades {lo}–{hi} · starts {startLabel(next.d)} · {feeOf(p, next).e}
                      </p>
                    </div>
                    <Link
                      to="/programmes/$slug"
                      params={{ slug: slugOf(p) }}
                      className="rounded-full bg-ink px-4 py-2 text-[0.82rem] font-bold text-paper no-underline"
                    >
                      View programme
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="rounded-xl bg-wash px-4 py-3 text-[0.88rem] text-ink-soft">
              Try a wider grade band or &quot;All subjects&quot; - or browse the full catalogue.
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={restart}
              className="rounded-full border border-line bg-paper px-5 py-2.5 text-[0.86rem] font-bold"
            >
              Start again
            </button>
            <BackButton onClick={() => setStep(2)} inline />
          </div>
        </>
      ) : null}
    </div>
  );
}

function BackButton({ onClick, inline }: { onClick: () => void; inline?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-ink-faint underline-offset-4 hover:text-ink hover:underline ${inline ? "" : "mt-6"}`}
    >
      <ArrowLeft className="h-3.5 w-3.5" /> Back
    </button>
  );
}
