"use client";
/**
 * Auth callback page
 * Purpose: Handle Supabase magic link exchange and redirect to dashboard
 * Location: src/app/auth/callback/page.tsx
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Completing sign-in...");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Unable to initialize auth. Redirecting to login...");
      const id = setTimeout(() => router.replace("/login"), 800);
      return () => clearTimeout(id);
    }

    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        router.replace("/dashboard");
      } else {
        setMessage("No session found. Redirecting to login...");
        setTimeout(() => router.replace("/login"), 1200);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="alert alert-info">{message}</div>
    </div>
  );
}





