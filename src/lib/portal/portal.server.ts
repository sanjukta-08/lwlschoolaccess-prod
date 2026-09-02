/**
 * Server-only data layer for the replicated Application Portal.
 *
 * Everything the portal reads and writes lives in the shared project's
 * `lwl_site` schema. This module is the ONLY place that opens a privileged
 * client, and every caller must pass through `requireAdmin`.
 *
 * `public.*` (all_programs, all_partners, all_cohorts, all_mentors) is read
 * only — never written from here.
 */
import { createClient } from "@supabase/supabase-js";

/** Loose client type: these clients are bound to non-generated schemas. */
type AnyClient = ReturnType<typeof createClient<any, any, any>>;

export const ADMIN_ROLES = [
  "super_admin",
  "admin",
  "manager",
  "lwl_admin",
  "coordinator",
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminProfile = {
  userId: string;
  email: string | null;
  fullName: string | null;
  role: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
};

const env = (...names: string[]) => {
  for (const n of names) {
    const v = process.env[n];
    if (v) return v;
  }
  return undefined;
};

const isOpaqueKey = (key: string) =>
  key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");

const keyedFetch = (key: string): typeof fetch => (input, init) => {
  const headers = new Headers(
    typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
  );
  if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
  if (isOpaqueKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
    headers.delete("Authorization");
  }
  headers.set("apikey", key);
  return fetch(input, { ...init, headers });
};

const auth = { storage: undefined, persistSession: false, autoRefreshToken: false } as const;

let _site: AnyClient | undefined;
let _shared: AnyClient | undefined;

/** Privileged client bound to our own `lwl_site` schema. */
export function siteDb(): AnyClient {
  if (_site) return _site;
  const url = env("SUPABASE_URL", "VITE_SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Portal data layer: missing Supabase server credentials.");
  _site = createClient<any, any, any>(url, key, {
    auth,
    db: { schema: "lwl_site" },
    global: { fetch: keyedFetch(key) },
  });
  return _site;
}

/** Privileged client on the shared `public` schema — READ ONLY by convention. */
export function sharedDb(): AnyClient {
  if (_shared) return _shared;
  const url = env("SUPABASE_URL", "VITE_SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Portal data layer: missing Supabase server credentials.");
  _shared = createClient<any, any, any>(url, key, { auth, global: { fetch: keyedFetch(key) } });
  return _shared;
}

/* ------------------------------------------------------------------ */
/* admin identity                                                     */
/* ------------------------------------------------------------------ */

export async function loadAdminProfile(userId: string): Promise<AdminProfile> {
  const { data } = await siteDb()
    .from("user_profiles")
    .select("user_id,email,full_name,first_name,last_name,role")
    .eq("user_id", userId)
    .maybeSingle();

  const row = data as
    | {
        email: string | null;
        full_name: string | null;
        first_name: string | null;
        last_name: string | null;
        role: string | null;
      }
    | null;

  const role = row?.role ?? null;
  const fullName =
    row?.full_name ??
    [row?.first_name, row?.last_name].filter(Boolean).join(" ").trim() ??
    null;

  return {
    userId,
    email: row?.email ?? null,
    fullName: fullName || null,
    role,
    isAdmin: !!role && (ADMIN_ROLES as readonly string[]).includes(role),
    isSuperAdmin: role === "super_admin",
  };
}

/** Throws unless the caller holds an admin role in `lwl_site.user_profiles`. */
export async function requireAdmin(userId: string): Promise<AdminProfile> {
  const profile = await loadAdminProfile(userId);
  if (!profile.isAdmin) throw new Error("Forbidden: admin access required");
  return profile;
}

/** Throws unless the caller is a super admin. */
export async function requireSuperAdmin(userId: string): Promise<AdminProfile> {
  const profile = await requireAdmin(userId);
  if (!profile.isSuperAdmin) throw new Error("Forbidden: super admin access required");
  return profile;
}

/* ------------------------------------------------------------------ */
/* dormancy switch                                                    */
/* ------------------------------------------------------------------ */

export const DORMANCY_KEY = "replica_write_mode";

export type WriteMode = "dormant" | "live";

export class DormantError extends Error {
  constructor(action: string) {
    super(
      `This console is a dormant replica — "${action}" was not carried out. The live Application Portal still owns this action.`,
    );
    this.name = "DormantError";
  }
}

/**
 * Reads the replica's write mode. Defaults to `dormant`, so a missing row can
 * never accidentally make this replica act on the world.
 */
export async function writeMode(): Promise<WriteMode> {
  const { data } = await siteDb()
    .from("app_settings")
    .select("value")
    .eq("key", DORMANCY_KEY)
    .maybeSingle();
  const value = (data as { value?: unknown } | null)?.value;
  const mode =
    typeof value === "string"
      ? value
      : typeof value === "object" && value !== null
        ? (value as { mode?: string }).mode
        : undefined;
  return mode === "live" ? "live" : "dormant";
}

/** Guard placed at the top of every mutating handler. */
export async function assertWritable(action: string): Promise<void> {
  if ((await writeMode()) !== "live") throw new DormantError(action);
}
