import { useState, useEffect, useRef } from "react";
const gallery1 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/2dc784e3-da37-4aa6-b30a-61beed922036/gallery-1.jpg";
const gallery3 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/c3d70322-aa80-42aa-9803-935209274551/gallery-3.jpg";
const gallery8 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/51591cb6-d428-42c2-a634-cf55d0ab91d7/gallery-8.jpg";
const gallery5 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/569a8982-544e-44e5-8bd1-2361873b382a/gallery-5.jpg";
const gallery6 =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/97d2b70e-10d8-4b05-a24b-38858b12ab6c/gallery-6.jpg";

export const ACCENT = "#c23b22";
export const BG = "#cbcc02";

export const STATS = [
  { value: 20, suffix: "+", label: "Countries Represented" },
  { value: 40, suffix: "+", label: "Schools Worldwide" },
  { value: 1000, suffix: "s", label: "Stories & Friendships" },
];

export const IMAGES = { gallery1, gallery3, gallery8, gallery5, gallery6 };

export const HEADLINE = {
  eyebrow: "— A Global Cohort",
  line1: "Join students",
  line2: "from around the",
  line3: "world at Cambridge.",
};

export const useCountUp = (target: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
};

export const AnimatedStat = ({
  value,
  suffix,
  className,
  style,
}: {
  value: number;
  suffix: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className={className} style={style}>
      {count}
      <span style={{ fontSize: "0.6em" }}>{suffix}</span>
    </div>
  );
};
