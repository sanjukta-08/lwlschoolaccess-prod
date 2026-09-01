import clip1 from "@/assets/geneva-clip-1.webm.asset.json";
import clip2 from "@/assets/geneva-clip-2.webm.asset.json";
import clip3 from "@/assets/geneva-clip-3.webm.asset.json";
import poster1 from "@/assets/geneva-clip-1-poster.webp.asset.json";
import poster2 from "@/assets/geneva-clip-2-poster.webp.asset.json";
import poster3 from "@/assets/geneva-clip-3-poster.webp.asset.json";

const CLIPS = [
  { src: clip1.url, poster: poster1.url, caption: "Geneva · SDG FabLab build day" },
  { src: clip2.url, poster: poster2.url, caption: "Geneva · inside the international quarter" },
  { src: clip3.url, poster: poster3.url, caption: "Geneva · final showcase" },
];

/** Real footage from a camp week - the most persuasive thing on the page. */
export function CampVideoWall() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CLIPS.map((c) => (
        <figure
          key={c.src}
          className="overflow-hidden rounded-sm border border-line bg-paper shadow-soft"
        >
          <video
            src={c.src}
            poster={c.poster}
            controls
            playsInline
            preload="none"
            className="aspect-[16/10] w-full bg-ink object-cover"
          />
          <figcaption className="mono-label border-t border-line px-4 py-3 text-ink-faint">
            {c.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
