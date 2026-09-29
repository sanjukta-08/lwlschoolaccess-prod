import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCompass, type CompassResult } from "@/lib/compass-context";
import { withUtm } from "@/lib/utm";
import birdAsset from "@/assets/lwl-bird.webp.asset.json";
import { ArrowUpRight, CalendarDays, GraduationCap, MonitorSmartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const QUICK_REPLIES = [
  "Find a programme for my child",
  "Compare options in a subject",
  "What’s starting soonest?",
  "I have a budget in mind",
];

function formatDate(value: string | null) {
  if (!value) return "Dates to be confirmed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function ResultCard({ result }: { result: CompassResult }) {
  return (
    <article className="rounded-md border border-line bg-paper p-3.5 shadow-soft">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
        <span className="min-w-0 truncate text-[0.68rem] font-bold tracking-normal text-crimson uppercase">
          {result.platform}
        </span>
        <span className="shrink-0 rounded-full bg-gold-soft px-2 py-0.5 text-[0.65rem] font-semibold text-gold-deep capitalize">
          {result.type}
        </span>
      </div>
      <h3 className="mt-2 text-[0.95rem] leading-snug font-bold text-ink">{result.name}</h3>
      <dl className="mt-3 grid gap-1.5 text-[0.75rem] text-ink-soft">
        <div className="flex min-w-0 items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
          <dd className="min-w-0 truncate">{result.grades}</dd>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <MonitorSmartphone className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
          <dd className="min-w-0 truncate">{result.format}</dd>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
          <dd>
            {formatDate(result.next_date)} · {result.fee}
          </dd>
        </div>
      </dl>
      <div className="mt-3 flex items-center gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <a href={withUtm(result.view_url)}>View</a>
        </Button>
        {result.apply_url ? (
          <Button
            asChild
            size="sm"
            className="flex-1 bg-crimson text-primary-foreground hover:bg-crimson-deep"
          >
            <a href={withUtm(result.apply_url)} target="_blank" rel="noreferrer">
              Apply <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        ) : null}
      </div>
    </article>
  );
}

function CompassPanel() {
  const { open, setOpen, messages, busy, limitReached, sendMessage } = useCompass();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open || busy) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open, busy, messages.length]);

  const submit = async ({ text }: PromptInputMessage) => {
    if (!text.trim() || busy || limitReached) return;
    setInput("");
    await sendMessage(text);
  };

  const firstTurn = messages.length === 1;
  const status = busy ? "submitted" : "ready";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex h-dvh w-screen max-w-none flex-col gap-0 overflow-hidden border-gold-line bg-background p-0 sm:w-[430px] sm:max-w-[430px]"
      >
        <SheetHeader className="border-b border-gold-line bg-gold-soft px-4 py-3.5 pr-14 text-left">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold bg-crimson">
              <img
                src={birdAsset.url}
                alt=""
                aria-hidden="true"
                className="h-7 w-7 object-contain"
              />
            </div>
            <div className="min-w-0">
              <SheetTitle className="truncate text-base font-bold text-ink">Compass</SheetTitle>
              <SheetDescription className="truncate text-xs text-ink-soft">
                Your Learn with Leaders concierge
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <a
          href="https://calendly.com/learnwithleaders"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 items-center justify-center gap-1 border-b border-line bg-paper px-4 text-xs font-semibold text-crimson underline-offset-4 hover:underline"
        >
          Talk to a human advisor <ArrowUpRight className="h-3.5 w-3.5" />
        </a>

        <Conversation
          className="min-h-0 bg-background"
          aria-live="polite"
          aria-label="Compass conversation"
        >
          <ConversationContent className="gap-5 px-4 py-5">
            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent
                  className={
                    message.role === "user"
                      ? "bg-crimson text-primary-foreground"
                      : "leading-relaxed text-ink"
                  }
                >
                  {message.parts.map((part, index) => (
                    <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
                  ))}
                </MessageContent>
                {message.results?.length ? (
                  <div className="grid w-full gap-2.5">
                    {message.results.map((result) => (
                      <ResultCard key={`${message.id}-${result.id}`} result={result} />
                    ))}
                  </div>
                ) : null}
              </Message>
            ))}

            {firstTurn && !busy ? (
              <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
                {QUICK_REPLIES.map((reply) => (
                  <Button
                    key={reply}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-auto min-h-9 whitespace-normal border-gold-line bg-paper py-2 text-left text-xs text-ink hover:border-gold hover:bg-gold-soft"
                    onClick={() => void sendMessage(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            ) : null}

            {busy ? (
              <Message from="assistant">
                <MessageContent>
                  <Shimmer className="text-sm">Compass is looking through the catalogue…</Shimmer>
                </MessageContent>
              </Message>
            ) : null}
          </ConversationContent>
          <ConversationScrollButton aria-label="Scroll to latest message" />
        </Conversation>

        <div className="border-t border-line bg-paper p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <PromptInput onSubmit={submit} className="rounded-md bg-background">
            <PromptInputTextarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={limitReached ? "Conversation limit reached" : "Ask Compass…"}
              disabled={busy || limitReached}
              aria-label="Message Compass"
              className="min-h-20 max-h-36 placeholder:text-muted-foreground"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                status={status}
                disabled={!input.trim() || busy || limitReached}
                aria-label="Send message"
                className="bg-crimson text-primary-foreground hover:bg-crimson-deep"
              />
            </PromptInputFooter>
          </PromptInput>
          {limitReached ? (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              This conversation has reached its message limit.
            </p>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CompassPanel;
