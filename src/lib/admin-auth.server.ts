import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type AdminSession = { admin?: boolean };

function sessionConfig() {
  const password = process.env["LWL_ADMIN_SESSION_SECRET"];
  if (!password || password.length < 32) throw new Error("Admin session secret missing");
  return {
    password,
    name: "lwl-admin",
    maxAge: 60 * 60 * 8, // 8 hours
    cookie: { httpOnly: true, secure: true, sameSite: "strict" as const, path: "/" },
  };
}

export function getAdminSession() {
  return useSession<AdminSession>(sessionConfig());
}

export function passwordMatches(input: string): boolean {
  const expected = process.env["LWL_ADMIN_PANEL_PASSWORD"];
  console.log(
    "[admin-login] submitted length:",
    input.length,
    "expected length:",
    expected ? expected.length : 0
  );
  if (!expected) return false; // no password set → nobody gets in
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const s = await getAdminSession();
  return s.data.admin === true;
}

/** Every admin data server function must call this first. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Response("Unauthorized", { status: 401 });
}
