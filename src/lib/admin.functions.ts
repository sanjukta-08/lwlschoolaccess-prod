import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminSession, isAdmin, passwordMatches, requireAdmin } from "./admin-auth.server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data }) => {
    if (!passwordMatches(data.password)) return { ok: false as const };
    const s = await getAdminSession();
    await s.update({ admin: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const s = await getAdminSession();
  await s.clear();
  return { ok: true as const };
});

/** Used by the /admin route guard. Returns only a boolean. */
export const adminStatus = createServerFn({ method: "GET" }).handler(async () => ({
  authed: await isAdmin(),
}));

/** Example protected data fn — pattern for every future admin data fn. */
export const adminPing = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return { ok: true, at: new Date().toISOString() };
});
