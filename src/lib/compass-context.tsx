import { askCompass, type CompassReply } from "@/lib/compass.functions";
import { getUtm } from "@/lib/utm";
import { useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
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
};

const WELCOME: CompassMessage = {
  id: "compass-welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hello, I’m Compass. I can help you find the right programme, masterclass, or camp across the Learn with Leaders group. What are you looking for?",
    },
  ],
};

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
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [sessionId, setSessionId] = useState<string>();
  const [messages, setMessages] = useState<CompassMessage[]>([WELCOME]);
  const [busy, setBusy] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

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
      const nextMessages = [...messages, userMessage];
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
    [busy, limitReached, messages, runCompass, sessionId, sourcePage],
  );

  const value = useMemo(
    () => ({ open, setOpen: changeOpen, messages, busy, limitReached, sendMessage }),
    [open, changeOpen, messages, busy, limitReached, sendMessage],
  );

  return (
    <CompassContext.Provider value={value}>
      {children}
      <Button
        type="button"
        onClick={() => changeOpen(true)}
        aria-label="Open Compass concierge"
        className="fixed right-4 bottom-4 z-40 h-12 gap-2 rounded-full border border-gold bg-crimson px-4 text-primary-foreground shadow-lift motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:right-6 sm:bottom-6"
      >
        <img src={birdAsset.url} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
        <span className="font-bold">Compass</span>
      </Button>
      {hasOpened ? (
        <Suspense fallback={null}>
          <LazyCompassPanel />
        </Suspense>
      ) : null}
    </CompassContext.Provider>
  );
}

export function useCompass() {
  const context = useContext(CompassContext);
  if (!context) throw new Error("useCompass must be used within CompassProvider");
  return context;
}