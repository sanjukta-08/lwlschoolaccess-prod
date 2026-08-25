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
        d="M12 3.2c2.6 3.4 5.5 5.2 8.8 5.6-2 3.6-5 5.9-8.8 7.1-3.8-1.2-6.8-3.5-8.8-7.1C6.5 8.4 9.4 6.6 12 3.2Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M12 3.2c2.6 3.4 5.5 5.2 8.8 5.6-2 3.6-5 5.9-8.8 7.1-3.8-1.2-6.8-3.5-8.8-7.1C6.5 8.4 9.4 6.6 12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M12 16v4.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
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
