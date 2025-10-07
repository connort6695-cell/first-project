"use client";
/**
 * Auth redirect page
 * Purpose: Handle magic link authentication and redirect to dashboard
 * Location: src/app/redirect/page.tsx
 */
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function RedirectPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<string>("Processing magic link...");

  useEffect(() => {
    const code = params.get("code");
    if (!code) {
      setStatus("No code found, redirecting to home...");
      router.replace("/");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Error: Supabase not configured");
      return;
    }

    (async () => {
      try {
        setStatus("Exchanging code for session...");
        
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        if (error) {
          setStatus(`Error: ${error.message}`);
          setTimeout(() => router.replace("/"), 3000);
        } else {
          setStatus("Success! Redirecting to dashboard...");
          router.replace("/dashboard");
        }
      } catch (err) {
        setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setTimeout(() => router.replace("/"), 3000);
      }
    })();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title justify-center">Authentication</h2>
          <p>{status}</p>
          <div className="card-actions justify-center">
            <div className="loading loading-spinner loading-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
