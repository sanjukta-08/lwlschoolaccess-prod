/**
 * The controlled vocabulary behind the UTM convention.
 *
 *  - utm_medium (platform + person, e.g. npf-akbar) MUST exist in
 *    public.all_utm_mediums before anything is sent with it. This is the one
 *    field that is checked.
 *  - utm_source (the audience / dataset) is deliberately wide and evolving, so
 *    it is registered for reporting tidiness but never blocks a send.
 *  - utm_campaign (the initiative) is free-form per initiative.
 *
 * Read-only from this project: new mediums/sources are added in the Console.
 */
import { createServerFn } from "@tanstack/react-start";

export type UtmMedium = {
  medium_slug: string;
  display_name: string | null;
  platform: string | null;
  person: string | null;
};

/**
 * The vocabulary table lists staff names, so it is not exposed to anonymous
 * readers; these lookups run server-side only.
 */
async function registryClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Every sender/platform currently cleared to send. */
export const listUtmMediums = createServerFn({ method: "GET" }).handler(
  async (): Promise<UtmMedium[]> => {
    const supabase = await registryClient();
    const { data, error } = await supabase
      .from("all_utm_mediums")
      .select("medium_slug,display_name,platform,person")
      .eq("is_active", true)
      .order("medium_slug", { ascending: true })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []) as UtmMedium[];
  },
);

/**
 * Checks a utm_medium before it is used in a link. An unknown sender comes back
 * as `known: false` — register it in public.all_utm_mediums (platform-person,
 * e.g. instagram-nishanta) before sending anything with it.
 */
export const checkUtmMedium = createServerFn({ method: "GET" })
  .inputValidator((data: { medium: string }) => ({
    medium: String(data?.medium ?? "")
      .trim()
      .toLowerCase()
      .slice(0, 200),
  }))
  .handler(async ({ data }): Promise<{ medium: string; known: boolean }> => {
    if (!data.medium) return { medium: "", known: false };
    const supabase = await registryClient();
    const { data: rows, error } = await supabase
      .from("all_utm_mediums")
      .select("medium_slug")
      .eq("medium_slug", data.medium)
      .eq("is_active", true)
      .limit(1);
    if (error) throw new Error(error.message);
    return { medium: data.medium, known: (rows ?? []).length > 0 };
  });
