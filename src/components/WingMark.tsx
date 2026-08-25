type Tone = "gold" | "crimson" | "ink" | "paper";

const TONE: Record<Tone, string> = {
  gold: "text-gold",
  crimson: "text-crimson",
  ink: "text-ink",
  paper: "text-paper",
};

/** Small wing glyph lifted from the LWL mark — the shared brand signature. */
export function WingMark({
  size = 16,
  tone = "gold",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`${TONE[tone]} ${className}`}
    >
      <path
        d="M2.6 15.6C6.2 14.2 9 12 11 9.1c2-2.9 4.6-5 7.9-6.1-.5 4.6-2.4 8.2-5.6 10.8-3.2 2.6-6.8 3.9-10.7 3.9Z"
        fill="currentColor"
      />
      <path
        d="M8.4 20.8c2.9-.6 5.4-1.9 7.4-3.9 2-2 3.4-4.4 4-7.2.9 3.5.4 6.5-1.6 9-2 2.5-4.7 3.6-9.8 2.1Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

/** Wing centred in a hairline rule — the headline / section signature. */
export function WingRule({
  className = "",
  tone = "gold",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden
    >
      <span className="gold-rule h-px w-14" />
      <WingMark size={18} tone={tone} />
      <span className="gold-rule h-px w-14" />
    </div>
  );
}
