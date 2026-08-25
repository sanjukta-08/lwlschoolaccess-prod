type Size = "inline" | "pill";

function ZoomGlyph({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <circle cx="12" cy="12" r="12" fill="var(--zoom)" />
      <path
        d="M5.6 8.9c0-.6.5-1.1 1.1-1.1h6.1c.9 0 1.6.7 1.6 1.6v5.7c0 .6-.5 1.1-1.1 1.1H7.2c-.9 0-1.6-.7-1.6-1.6V8.9Zm9.9 2.3 2.4-1.8c.4-.3 1 0 1 .5v4.2c0 .5-.6.8-1 .5l-2.4-1.8v-1.6Z"
        fill="#fff"
      />
    </svg>
  );
}

export default function ZoomBadge({
  size = "inline",
  label = "Live on Zoom",
  className = "",
}: {
  size?: Size;
  label?: string;
  className?: string;
}) {
  if (size === "pill") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-[0.74rem] font-bold tracking-wide text-ink uppercase ${className}`}
      >
        <ZoomGlyph className="h-3.5 w-3.5" />
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-sans text-[0.7rem] font-semibold whitespace-nowrap text-ink-soft ${className}`}
    >
      <ZoomGlyph />
      {label}
    </span>
  );
}
