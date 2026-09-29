import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SearchResult } from "./compass-search.server";

export type CompassReply = {
  sessionId: string;
  reply: string;
  results: SearchResult[];
  leadCaptured: boolean;
  limitReached: boolean;
  error?: { status: number; message: string };
};

const Input = z.object({
  sessionId: z.string().uuid().optional(),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .min(1)
    .max(60),
  sourcePage: z.string().max(500).optional(),
  utm: z
    .object({
      utm_source: z.string().max(200).optional(),
      utm_medium: z.string().max(200).optional(),
      utm_campaign: z.string().max(200).optional(),
    })
    .optional(),
});

/** POST: one Compass turn. Frontend sends the whole visible transcript each time. */
export const askCompass = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => Input.parse(raw))
  .handler(async ({ data }): Promise<CompassReply> => {
    const { runCompass } = await import("./compass.server");
    return runCompass(data);
  });
