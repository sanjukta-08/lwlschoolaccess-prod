import {
  Stethoscope,
  Scale,
  TrendingUp,
  Cpu,
  Rocket,
  Microscope,
  Mic,
  Globe2,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { TrackKey } from "@/lib/programmes";

/** One consistent icon set for tracks - no emoji, so nothing renders as a box. */
export const TRACK_ICON: Record<TrackKey, LucideIcon> = {
  med: Stethoscope,
  law: Scale,
  fin: TrendingUp,
  ai: Cpu,
  ent: Rocket,
  res: Microscope,
  deb: Mic,
  lead: Globe2,
  sat: PenLine,
};

export const ALL_TRACKS_ICON = Sparkles;

export function TrackIcon({
  track,
  className = "h-4 w-4",
  style,
}: {
  track: TrackKey;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = TRACK_ICON[track];
  return <Icon className={className} style={style} strokeWidth={1.75} aria-hidden />;
}
