import { askCompass, type CompassReply } from "@/lib/compass.functions";
import { resolveSaved, useShortlist } from "@/lib/shortlist";
import { getUtm } from "@/lib/utm";
import { useMatches, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import birdAsset from "@/assets/lwl-bird.webp.asset.json";

export type CompassResult = CompassReply["results"][number];

export type CompassMessage = {
  id: string;
  role: "user" | "assistant";
  parts: [{ type: "text"; text: string }];
  results?: CompassResult[];
  compareIds?: string[] | undefined;
};

const GENERIC_WELCOME =
  "Hello, I’m Compass. I can help you find the right programme, masterclass, or camp across the Learn with Leaders group. What are you looking for?";

const welcomeMessage = (text: string): CompassMessage => ({
  id: "compass-welcome",
  role: "assistant",
  parts: [{ type: "text", text }],
});

const WELCOME = welcomeMessage(GENERIC_WELCOME);

/**
 * Greeting for a family that has already saved programmes via the site's
 * "Save for later" list — reuses the same shortlist data the Save buttons use.
 */
function savedWelcome(pageName: string | null, saved: string[]): string {
  const list =
    saved.length === 1
      ? saved[0]!
      : `${saved[0]}, ${saved[1]}${saved.length > 2 ? ` and ${saved.length - 2} more` : ""}`;
  // On a detail page, mention what's on screen too — unless it's already among
  // the saved names (then the saved framing covers it; don't say it twice).
  if (pageName && !saved.includes(pageName)) {
    const pronoun = saved.length === 1 ? "it compares" : "they compare";
    return `Looking at ${pageName}? I’m Compass — I also see you’ve already saved ${list}. Want me to check how ${pronoun} with what’s on this page, or is there something else you’re weighing?`;
  }
  return saved.length === 1
    ? `Hello, I’m Compass. I see you’ve already saved ${saved[0]} — want help comparing it with similar options, or is there something else you’re weighing?`
    : `Hello, I’m Compass. I see you’ve saved a few options already (${list}) — want help comparing them, or looking at something new?`;
}

/** Per-tab conversation store: survives navigation and reloads, cleared when the tab closes. */
const STORAGE_KEY = "compass:session:v1";
type StoredConversation = {
  sessionId?: string | undefined;
  messages: CompassMessage[];
  limitReached: boolean;
};

/** Name of the programme/camp/conference the current detail page already loaded, if any. */
function pageItemName(loaderData: unknown): string | null {
  if (!loaderData || typeof loaderData !== "object") return null;
  const d = loaderData as Record<string, unknown>;
  const pick = (v: unknown) =>
    v && typeof v === "object" && typeof (v as { name?: unknown }).name === "string"
      ? ((v as { name: string }).name)
      : null;
  if (typeof d["name"] === "string") return d["name"];
  return pick(d["camp"]) ?? pick(d["conference"]) ?? pick(d["programme"]) ?? pick(d["program"]) ?? null;
}

type CompassContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  messages: CompassMessage[];
  busy: boolean;
  limitReached: boolean;
  sendMessage: (text: string) => Promise<void>;
};

const CompassContext = createContext<CompassContextValue | null>(null);
const LazyCompassPanel = lazy(() => import("@/components/CompassPanel"));

function messageId(role: CompassMessage["role"]) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${role}-${crypto.randomUUID()}`;
  }
  return `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function CompassProvider({ children }: { children: ReactNode }) {
  const runCompass = useServerFn(askCompass);
  const sourcePage = useRouterState({
    select: (state) => `${state.location.pathname}${state.location.searchStr || ""}`,
  });
  const pageName = useMatches({
    select: (matches) => pageItemName(matches[matches.length - 1]?.loaderData),
  });
  const [open, setOpen] = useState(false);
  // The admin area is an internal tool — never show the customer-facing launcher there.
  const isAdminRoute = useRouterState({
    select: (state) => state.location.pathname.startsWith("/admin"),
  });
  const [hasOpened, setHasOpened] = useState(false);
  const [sessionId, setSessionId] = useState<string>();
  const [messages, setMessages] = useState<CompassMessage[]>([WELCOME]);
  const [busy, setBusy] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [restored, setRestored] = useState(false);
  // What the family has already "Saved" on the site (same store the Save buttons use).
  const { ready: shortlistReady, items: savedItems } = useShortlist();
  const savedNames = useMemo(
    () =>
      shortlistReady
        ? [...new Set(resolveSaved(savedItems).map(({ p }) => p.name))]
        : [],
    [shortlistReady, savedItems],
  );

  // Rehydrate this tab's conversation after hydration (never during render, to avoid SSR mismatch).
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<StoredConversation>;
        if (Array.isArray(saved.messages) && saved.messages.length > 0) {
          setMessages(saved.messages);
          if (typeof saved.sessionId === "string") setSessionId(saved.sessionId);
          setLimitReached(saved.limitReached === true);
        }
      }
    } catch {
      /* unreadable storage: start fresh */
    }
    setRestored(true);
  }, []);

  // Persist only once a real conversation exists; the bare welcome stays page-aware.
  useEffect(() => {
    if (!restored) return;
    try {
      if (messages.length === 1 && messages[0]!.id === WELCOME.id) {
        window.sessionStorage.removeItem(STORAGE_KEY);
        return;
      }
      const data: StoredConversation = { sessionId, messages, limitReached };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* quota or privacy mode: keep in memory only */
    }
  }, [restored, messages, sessionId, limitReached]);

  // Until the first user turn, the greeting follows the page the visitor is on
  // — and reflects anything they've already saved, so Compass knows the loop.
  const shownMessages = useMemo(
    () =>
      messages.length === 1 && messages[0]!.id === WELCOME.id
        ? [
            welcomeMessage(
              savedNames.length > 0
                ? savedWelcome(pageName, savedNames)
                : pageName
                  ? `Looking at ${pageName}? I’m Compass — want me to check if it fits your child, or compare it with similar options across the Learn with Leaders group?`
                  : GENERIC_WELCOME,
            ),
          ]
        : messages,
    [messages, pageName, savedNames],
  );

  // Pages with their own fixed bottom action bar mark it with data-compass-offset;
  // the launcher sits just above whichever one is visible so neither covers the other.
  const [liftPx, setLiftPx] = useState(0);
  useEffect(() => {
    const measure = () => {
      let h = 0;
      document.querySelectorAll<HTMLElement>("[data-compass-offset]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && getComputedStyle(el).display !== "none") h = Math.max(h, window.innerHeight - r.top);
      });
      setLiftPx(h > 0 ? Math.ceil(h) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    document.querySelectorAll("[data-compass-offset]").forEach((el) => ro.observe(el));
    const mo = new MutationObserver(() => {
      ro.disconnect();
      document.querySelectorAll("[data-compass-offset]").forEach((el) => ro.observe(el));
      measure();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [sourcePage]);

  const changeOpen = useCallback((next: boolean) => {
    setOpen(next);
    if (next) setHasOpened(true);
  }, []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy || limitReached) return;

      const userMessage: CompassMessage = {
        id: messageId("user"),
        role: "user",
        parts: [{ type: "text", text }],
      };
      const nextMessages = [...shownMessages, userMessage];
      setMessages(nextMessages);
      setBusy(true);

      try {
        const response = await runCompass({
          data: {
            sessionId,
            messages: nextMessages.map((message) => ({
              role: message.role,
              content: message.parts.map((part) => part.text).join(""),
            })),
            sourcePage,
            utm: getUtm(),
          },
        });
        setSessionId(response.sessionId);
        setLimitReached(response.limitReached);
        setMessages((current) => [
          ...current,
          {
            id: messageId("assistant"),
            role: "assistant",
            parts: [{ type: "text", text: response.reply }],
            results: response.results,
            compareIds: response.compareIds,
          },
        ]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            id: messageId("assistant"),
            role: "assistant",
            parts: [
              {
                type: "text",
                text: "I’m sorry, I can’t search the catalogue right now. Please try again or talk to a human advisor.",
              },
            ],
          },
        ]);
      } finally {
        setBusy(false);
      }
    },
    [busy, limitReached, shownMessages, runCompass, sessionId, sourcePage],
  );

  const value = useMemo(
    () => ({ open, setOpen: changeOpen, messages: shownMessages, busy, limitReached, sendMessage }),
    [open, changeOpen, shownMessages, busy, limitReached, sendMessage],
  );

  return (
    <CompassContext.Provider value={value}>
      {children}
      {isAdminRoute ? null : (
        <>
          <Button
            type="button"
            onClick={() => changeOpen(true)}
            aria-label="Open Compass concierge"
            data-compass-launcher
            style={liftPx ? { bottom: liftPx + 12 } : undefined}
            className={`${open ? "hidden " : ""}fixed right-4 bottom-4 z-[70] h-12 gap-2 rounded-full border border-gold bg-crimson px-4 text-primary-foreground shadow-lift motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:right-6 sm:bottom-6`}
          >
            <img src={birdAsset.url} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
            <span className="font-bold">Compass</span>
          </Button>
          {hasOpened ? (
            <Suspense fallback={null}>
              <LazyCompassPanel />
            </Suspense>
          ) : null}
        </>
      )}
    </CompassContext.Provider>
  );
}

export function useCompass() {
  const context = useContext(CompassContext);
  if (!context) throw new Error("useCompass must be used within CompassProvider");
  return context;
}
