import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { adminWhoami, type AdminSession } from "@/lib/portal/admin.functions";

/** Browser-side session tracking for the admin console. */
export function useAdminAuth() {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setSessionReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setSession(next ?? null);
      setSessionReady(true);
      if (event === "SIGNED_OUT") queryClient.removeQueries({ queryKey: ["admin"] });
      else queryClient.invalidateQueries({ queryKey: ["admin"] });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [queryClient]);

  const profile = useQuery<AdminSession>({
    queryKey: ["admin", "whoami", session?.user?.id ?? null],
    queryFn: () => adminWhoami(),
    enabled: !!session,
    staleTime: 60_000,
    retry: false,
  });

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await queryClient.invalidateQueries({ queryKey: ["admin"] });
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  };

  return {
    session,
    user: session?.user ?? null,
    profile: profile.data ?? null,
    role: profile.data?.role ?? null,
    fullName: profile.data?.fullName ?? null,
    writeMode: profile.data?.writeMode ?? "dormant",
    isAdmin: profile.data?.isAdmin ?? false,
    isSuperAdmin: profile.data?.isSuperAdmin ?? false,
    loading: !sessionReady || (!!session && profile.isLoading),
    error: profile.error as Error | null,
    signIn,
    signOut,
  };
}
