import { createServerFn } from "@tanstack/react-start";

export type PublicMasterclass = {
  id: string;
  title: string;
  description: string | null;
  series: string | null;
  session_number: number | null;
  audience: string | null;
  scheduled_at: string | null;
  duration_minutes: number | null;
  display_timezone: string | null;
  partner_name: string | null;
  partner_logo_url: string | null;
  program_name: string | null;
  cohort_label: string | null;
  host_name: string | null;
  host_university: string | null;
  host_image_url: string | null;
  learning_outcomes: string[];
  apply_url: string | null;
  recording_url: string | null;
  status: string | null;
};

const COLS =
  "id,title,description,series,session_number,audience,scheduled_at,duration_minutes,display_timezone,partner_name,partner_logo_url,program_name,cohort_label,host_name,host_university,host_image_url,learning_outcomes,apply_url,recording_url,status";

/** Public listing of every upcoming masterclass across all LWL partner platforms. */
export const listPublicMasterclasses = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicMasterclass[]> => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
    const key =
      process.env["SUPABASE_PUBLISHABLE_KEY"] ??
      process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return [];

    const supabase = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from("all_masterclasses_public")
      .select(COLS)
      .neq("status", "cancelled")
      .gte("scheduled_at", new Date(Date.now() - 60 * 60 * 1000).toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(200);

    if (error) throw new Error(error.message);

    return ((data ?? []) as unknown[]).map((r) => {
      const row = r as Record<string, unknown>;
      const outcomes = Array.isArray(row["learning_outcomes"])
        ? (row["learning_outcomes"] as unknown[]).filter(
            (x): x is string => typeof x === "string",
          )
        : [];
      return { ...(row as object), learning_outcomes: outcomes } as PublicMasterclass;
    });
  },
);
