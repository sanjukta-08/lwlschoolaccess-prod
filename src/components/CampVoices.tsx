import { CAMP_VOICES, type CampVoice } from "@/lib/camps";

function VoiceCard({ v }: { v: CampVoice }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-5 rounded-sm border border-line bg-paper p-6 shadow-soft">
      <blockquote className="font-serif text-[1.05rem] leading-relaxed text-ink italic">
        <span className="mr-1 text-gold" aria-hidden>
          &ldquo;
        </span>
        {v.quote}
      </blockquote>
      <figcaption className="border-t border-line pt-4">
        <div className="text-[0.88rem] font-bold text-ink">{v.name}</div>
        <div className="text-[0.8rem] text-ink-soft">{v.role}</div>
        <div className="mono-label mt-1.5 text-gold-deep">{v.camp}</div>
      </figcaption>
    </figure>
  );
}

export function CampVoices({ limit }: { limit?: number }) {
  const list = limit ? CAMP_VOICES.slice(0, limit) : CAMP_VOICES;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {list.map((v) => (
        <VoiceCard key={v.name + v.camp} v={v} />
      ))}
    </div>
  );
}
