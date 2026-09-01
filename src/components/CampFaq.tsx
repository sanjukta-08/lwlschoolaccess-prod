export function CampFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-[820px]">
      {items.map((f) => (
        <details
          key={f.q}
          className="group mb-2.5 overflow-hidden rounded-sm border border-line bg-paper"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[0.95rem] font-semibold group-open:border-b group-open:border-line [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="shrink-0 font-serif text-[1.3rem] leading-none text-crimson">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">–</span>
            </span>
          </summary>
          <p className="px-5 pt-3.5 pb-4.5 text-[0.88rem] leading-relaxed text-ink-soft">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
