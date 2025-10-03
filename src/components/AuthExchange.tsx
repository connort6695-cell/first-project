"use client";
/**
 * AuthExchange component
 * Purpose: If a magic-link code lands on an arbitrary page (e.g., "/?code=..."),
 *          exchange it for a session and redirect to /dashboard.
 * Location: src/components/AuthExchange.tsx
 */
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthExchange() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    (async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (!error) {
        router.replace("/dashboard");
      }
    })();
  }, [params, router]);

  return null;
}


