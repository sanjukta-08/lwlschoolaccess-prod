import birdAsset from "@/assets/lwl-bird.webp.asset.json";

type Tone = "gold" | "crimson" | "ink" | "paper";

/** The LWL bird brand symbol - the shared signature mark. */
export function WingMark({
  size = 16,
  tone,
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  void tone;
  return (
    <img
      src={birdAsset.url}
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size }}
      className={`inline-block flex-none object-contain ${className}`}
    />
  );
}

/** Wing centred in a hairline rule - the headline / section signature. */
export function WingRule({ className = "", tone = "gold" }: { className?: string; tone?: Tone }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="gold-rule h-px w-14" />
      <WingMark size={18} tone={tone} />
      <span className="gold-rule h-px w-14" />
    </div>
  );
}
