import ZoomBadge from "@/components/ZoomBadge";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { recommendProgrammes } from "@/lib/recommend.functions";
import {
  DEFAULT_FIT,
  GOAL_OPTIONS,
  GRADE_STEPS,
  HOURS_OPTIONS,
  INTEREST_OPTIONS,
  REGION_STEPS,
  fitComplete,
  interestList,
  type FitAnswers,
  type FitResult,
} from "@/lib/fit";
import { PROGRAMMES, TRACKS, TYPE_NAME, feeOf } from "@/lib/programmes";
import { DEFAULT_SEARCH } from "@/lib/finder";
import { slugOf } from "@/lib/programme-slug";
import { startLabel } from "@/lib/outcome";
import { SaveButton } from "@/components/SaveButton";

const STEP_TITLES = [
  "What grade is your child in?",
  "What are they drawn to?",
  "How much time can they give a week?",
  "What do you most want out of it?",
  "Where are you? (so sessions land at a civil hour)",
];

type Props = { answers: FitAnswers };

export function FitQuiz({ answers }: Props) {
  const navigate = useNavigate();
  const run = useServerFn(recommendProgrammes);
  const [state, setState] = useState<FitAnswers>(answers);
  const [step, setStep] = useState(() => firstUnanswered(answers));
  const [result, setResult] = useState<FitResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const picked = interestList(state);

  const set = (patch: Partial<FitAnswers>, advance = true) => {
    const next = { ...state, ...patch };
    setState(next);
    if (advance && step < 4) setStep(step + 1);
    if (advance && step === 4) void submit(next);
  };

  const submit = async (a: FitAnswers) => {
    setBusy(true);
    setError(null);
    void navigate({ to: "/fit", search: a, replace: true });
    try {
      const res = await run({ data: a });
      setResult(res);
    } catch {
      setError("We couldn't build your shortlist just now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return (
      <ResultView
        result={result}
        onRestart={() => {
          setResult(null);
          setState(DEFAULT_FIT);
          setStep(0);
          void navigate({ to: "/fit", search: DEFAULT_FIT, replace: true });
        }}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        {STEP_TITLES.map((t, i) => (
          <span
            key={t}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-gold" : "bg-line"
            }`}
          />
        ))}
      </div>

      <p className="mono-label mb-2 text-gold">
        Step {step + 1} of {STEP_TITLES.length}
      </p>
      <h2 className="mb-5 font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] leading-tight font-medium">
        {STEP_TITLES[step]}
      </h2>

      {busy ? (
        <p className="animate-pulse text-[0.95rem] text-ink-soft">
          Reading 35 programmes against your answers…
        </p>
      ) : null}

      {error ? <p className="mb-4 text-[0.9rem] font-bold text-crimson">{error}</p> : null}

      {!busy && step === 0 ? (
        <Options
          options={GRADE_STEPS.map((g) => ({ value: g.value, label: g.label }))}
          onPick={(v) => set({ grade: v })}
          active={[state.grade]}
        />
      ) : null}

      {!busy && step === 1 ? (
        <>
          <Options
            options={INTEREST_OPTIONS.map((o) => ({
              value: o.value,
              label: `${o.ic} ${o.label}`,
            }))}
            active={picked}
            onPick={(v) => {
              const next = picked.includes(v as never)
                ? picked.filter((x) => x !== v)
                : [...picked, v];
              set({ interests: next.join(",") }, false);
            }}
          />
          <StepNav
            disabled={!state.interests}
            hint="Pick as many as apply"
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        </>
      ) : null}

      {!busy && step === 2 ? (
        <Options
          options={HOURS_OPTIONS.map((h) => ({ value: h.value, label: h.label }))}
          active={[state.hours]}
          onPick={(v) => set({ hours: v })}
        />
      ) : null}

      {!busy && step === 3 ? (
        <Options
          options={GOAL_OPTIONS.map((g) => ({ value: g.value, label: g.label, sub: g.sub }))}
          active={[state.goal]}
          onPick={(v) => set({ goal: v })}
        />
      ) : null}

      {!busy && step === 4 ? (
        <Options
          options={REGION_STEPS.map((r) => ({ value: r.value, label: r.label, sub: r.note }))}
          active={[state.region]}
          onPick={(v) => set({ region: v })}
        />
      ) : null}

      {!busy && step > 1 && step !== 1 ? (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-6 text-[0.82rem] font-bold text-ink-faint underline-offset-4 hover:text-ink hover:underline"
        >
          Back
        </button>
      ) : null}

      {!busy && fitComplete(state) && step === 4 ? (
        <button
          type="button"
          onClick={() => void submit(state)}
          className="mt-6 rounded-full bg-ink px-6 py-3 text-[0.9rem] font-bold text-paper"
        >
          Show my three matches
        </button>
      ) : null}
    </div>
  );
}

function firstUnanswered(a: FitAnswers) {
  if (!a.grade) return 0;
  if (!a.interests) return 1;
  if (!a.hours) return 2;
  if (!a.goal) return 3;
  return 4;
}

function Options({
  options,
  onPick,
  active,
}: {
  options: { value: string; label: string; sub?: string }[];
  onPick: (v: string) => void;
  active: string[];
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map((o) => {
        const on = active.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onPick(o.value)}
            className={`rounded-xl border px-4 py-3.5 text-left transition-colors ${
              on
                ? "border-gold bg-gold/10"
                : "border-line bg-wash hover:border-ink-soft/40 hover:bg-paper"
            }`}
          >
            <b className="block text-[0.95rem] font-bold text-ink">{o.label}</b>
            {o.sub ? <small className="block text-[0.78rem] text-ink-faint">{o.sub}</small> : null}
          </button>
        );
      })}
    </div>
  );
}

function StepNav({
  onNext,
  onBack,
  disabled,
  hint,
}: {
  onNext: () => void;
  onBack: () => void;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <button
        type="button"
        disabled={disabled}
        onClick={onNext}
        className="rounded-full bg-ink px-6 py-3 text-[0.9rem] font-bold text-paper disabled:opacity-40"
      >
        Continue
      </button>
      <button
        type="button"
        onClick={onBack}
        className="text-[0.82rem] font-bold text-ink-faint hover:text-ink"
      >
        Back
      </button>
      {hint ? <small className="text-[0.78rem] text-ink-faint">{hint}</small> : null}
    </div>
  );
}

function ResultView({ result, onRestart }: { result: FitResult; onRestart: () => void }) {
  if (!result.picks.length) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-8 text-center shadow-soft">
        <h2 className="font-serif text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium">No civil-hour match yet</h2>
        <p className="mt-2 text-[0.92rem] text-ink-soft">
          Nothing lands well for that grade and timezone combination. Browse the full calendar or
          speak to a counsellor.
        </p>
        <Link
          to="/finder"
          search={DEFAULT_SEARCH}
          className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-[0.9rem] font-bold text-paper no-underline"
        >
          Browse all programmes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft">
        <p className="mono-label mb-2 text-gold">Your three matches</p>
        <p className="font-serif text-[clamp(1.15rem,2.6vw,1.55rem)] leading-snug">
          {result.intro}
        </p>
      </div>

      {result.picks.map((pick, i) => {
        const p = PROGRAMMES.find((x) => x.id === pick.id);
        if (!p) return null;
        const next = [...p.cohorts].sort((a, b) => a.d.localeCompare(b.d))[0];
        const track = TRACKS[p.tracks[0]!];
        return (
          <article
            key={pick.id}
            className="rounded-2xl border border-line bg-paper p-6 shadow-soft"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <span
                className="mono-label inline-flex items-center gap-2"
                style={{ color: track.color }}
              >
                <span>{track.ic}</span>
                {i === 0 ? "Best fit" : `Option ${i + 1}`} · {TYPE_NAME[p.type]}
              </span>
              {next ? <SaveButton p={p} c={next} /> : null}
            </div>
            <h3 className="font-serif text-[1.3rem] font-semibold">{p.name}</h3>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{pick.why}</p>
            <ul className="mt-3 space-y-1.5 text-[0.88rem]">
              <li>
                <b className="text-ink">Finishes with</b>{" "}
                <span className="text-ink-soft">{pick.outcome}</span>
              </li>
              <li>
                <b className="text-ink">Commitment</b>{" "}
                <span className="text-ink-soft">{pick.commitment}</span>{" "}
                <ZoomBadge className="align-middle" />
              </li>

              {next ? (
                <li>
                  <b className="text-ink">Next cohort</b>{" "}
                  <span className="text-ink-soft">
                    {startLabel(next.d)} · {feeOf(p, next).e}
                  </span>
                </li>
              ) : null}
            </ul>
            {pick.instead ? (
              <p className="mt-3 rounded-xl bg-wash px-4 py-2.5 text-[0.84rem] text-ink-soft">
                {pick.instead}
              </p>
            ) : null}
            <Link
              to="/programmes/$slug"
              params={{ slug: slugOf(p) }}
              className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-[0.86rem] font-bold text-paper no-underline"
            >
              See the full programme
            </Link>
          </article>
        );
      })}

      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/shortlist"
          className="rounded-full border border-line bg-paper px-5 py-2.5 text-[0.86rem] font-bold no-underline"
        >
          View saved shortlist
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="text-[0.84rem] font-bold text-ink-faint hover:text-ink"
        >
          Start again
        </button>
      </div>
    </div>
  );
}
