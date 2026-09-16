import { useEffect, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type CarouselOptions = { selector: string; mobile: number; tablet: number; desktop: number; interval?: number };

type LegacyCampPageProps = {
  className: string;
  html: string;
  css: string;
  applyUrl: string;
  carousels?: CarouselOptions[];
};

function normalizeStudentLinks(root: HTMLElement, applyUrl: string) {
  root.querySelectorAll<HTMLAnchorElement>("a").forEach((anchor) => {
    const label = anchor.textContent?.trim().toLowerCase() ?? "";
    if (label.includes("register as student") || label === "apply now") {
      anchor.href = applyUrl;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  });
}

function useNativeInteractions(rootRef: React.RefObject<HTMLDivElement | null>, applyUrl: string, carousels: CarouselOptions[]) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    normalizeStudentLinks(root, applyUrl);

    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLButtonElement>("[data-bs-target]").forEach((button) => {
      const targetSelector = button.dataset.bsTarget;
      if (!targetSelector?.startsWith("#")) return;
      const target = root.querySelector<HTMLElement>(targetSelector);
      if (!target) return;
      const click = () => {
        const parent = button.closest(".accordion");
        parent?.querySelectorAll<HTMLElement>(".accordion-collapse.show").forEach((open) => {
          if (open !== target) open.classList.remove("show");
        });
        target.classList.toggle("show");
        button.classList.toggle("collapsed", !target.classList.contains("show"));
        button.setAttribute("aria-expanded", String(target.classList.contains("show")));
      };
      button.addEventListener("click", click);
      cleanups.push(() => button.removeEventListener("click", click));
    });

    const navButton = root.querySelector<HTMLButtonElement>(".navbar-toggler");
    const navTarget = root.querySelector<HTMLElement>(".navbar-collapse");
    if (navButton && navTarget) {
      const toggle = () => navTarget.classList.toggle("show");
      navButton.addEventListener("click", toggle);
      cleanups.push(() => navButton.removeEventListener("click", toggle));
    }

    carousels.forEach((config) => {
      const host = root.querySelector<HTMLElement>(config.selector);
      if (!host) return;
      host.classList.remove("owl-carousel", "owl-theme");
      host.classList.add("lwl-native-carousel");
      host.style.setProperty("--mobile-items", String(config.mobile));
      host.style.setProperty("--tablet-items", String(config.tablet));
      host.style.setProperty("--desktop-items", String(config.desktop));
      let timer: number | undefined;
      if (config.interval && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        timer = window.setInterval(() => {
          const step = host.clientWidth / (window.innerWidth >= 1000 ? config.desktop : window.innerWidth >= 600 ? config.tablet : config.mobile);
          const atEnd = host.scrollLeft + host.clientWidth >= host.scrollWidth - 8;
          host.scrollTo({ left: atEnd ? 0 : host.scrollLeft + step, behavior: "smooth" });
        }, config.interval);
      }
      cleanups.push(() => window.clearInterval(timer));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [applyUrl, carousels, rootRef]);
}

export function LegacyCampPage({ className, html, css, applyUrl, carousels = [] }: LegacyCampPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stableCarousels = useMemo(() => carousels, [JSON.stringify(carousels)]);
  useNativeInteractions(rootRef, applyUrl, stableCarousels);

  return (
    <div className={`${className} legacy-camp-page`} ref={rootRef}>
      <style>{`${css}\n
        .legacy-camp-page { display:block; width:100%; overflow-x:clip; }
        .legacy-camp-page *, .legacy-camp-page *::before, .legacy-camp-page *::after { box-sizing:border-box; }
        .legacy-camp-page .lwl-native-carousel { display:flex !important; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; }
        .legacy-camp-page .lwl-native-carousel::-webkit-scrollbar { display:none; }
        .legacy-camp-page .lwl-native-carousel > * { flex:0 0 calc((100% - (var(--mobile-items) - 1) * 16px) / var(--mobile-items)); scroll-snap-align:start; }
        @media (min-width:600px) { .legacy-camp-page .lwl-native-carousel > * { flex-basis:calc((100% - (var(--tablet-items) - 1) * 16px) / var(--tablet-items)); } }
        @media (min-width:1000px) { .legacy-camp-page .lwl-native-carousel > * { flex-basis:calc((100% - (var(--desktop-items) - 1) * 16px) / var(--desktop-items)); } }
        @media (prefers-reduced-motion:reduce) { .legacy-camp-page *, .legacy-camp-page *::before, .legacy-camp-page *::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; } }
      `}</style>
      <Button asChild variant="secondary" size="sm" className="fixed left-4 top-4 z-[1200] shadow-lg">
        <Link to="/camps"><ArrowLeft className="size-4" /> All camps</Link>
      </Button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
