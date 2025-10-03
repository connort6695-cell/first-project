"use client";
/**
 * AuthExchange component
 * Purpose: If a magic-link code lands on an arbitrary page (e.g., "/?code=..."),
 *          exchange it for a session and redirect to /dashboard.
 * Location: src/components/AuthExchange.tsx
 */
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthExchange() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;
    
    setStatus("Processing magic link...");
    
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Error: Supabase not configured. Check environment variables.");
      return;
    }
    
    (async () => {
      try {
        setStatus("Exchanging code for session...");
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) {
          setStatus(`Error: ${error.message}`);
        } else {
          setStatus("Success! Redirecting to dashboard...");
          router.replace("/dashboard");
        }
      } catch (err) {
        setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    })();
  }, [params, router]);

  // Show status if there's a code parameter
  const code = params.get("code");
  if (!code) return null;

  return (
    <div className="fixed top-4 right-4 bg-base-100 p-4 rounded-lg shadow-lg border z-50">
      <p className="text-sm">{status}</p>
    </div>
  );
}


