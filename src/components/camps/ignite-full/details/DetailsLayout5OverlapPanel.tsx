const bg = "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/3e86e792-10d5-4de0-84b4-dd31e87b0470/judge-business-school.jpg";
import { DetailsGrid, FeeBlock, IncludesBlock } from "./detailsBlocks";

/** Layout 5: Image as banner, content panel overlaps upward */
const DetailsLayout5OverlapPanel = () => (
  <div className="relative">
    <div className="relative h-[380px] md:h-[460px] rounded-lg overflow-hidden">
      <img src={bg} alt="King's College Cambridge" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-cambridge-rust/30 via-transparent to-black/50" />
    </div>
    <div className="relative -mt-20 mx-4 md:mx-12 bg-white rounded-sm shadow-2xl p-8 md:p-12 grid lg:grid-cols-[1fr_320px] gap-10">
      <div className="space-y-8">
        <DetailsGrid cols={2} />
        <div className="border-t border-foreground/10 pt-6">
          <IncludesBlock />
        </div>
      </div>
      <FeeBlock tone="rust" />
    </div>
  </div>
);

export default DetailsLayout5OverlapPanel;
