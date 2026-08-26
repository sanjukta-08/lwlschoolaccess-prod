export function PageJump({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-[64px] z-40 border-b border-line bg-paper/95 backdrop-blur"
    >
      <div className="page-shell flex justify-center gap-1 overflow-x-auto py-2.5">
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            className="flex-none rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-ink-soft no-underline transition-colors hover:bg-wash hover:text-ink"
          >
            {i.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
